import { createClient } from "./supabase-browser";

export const BUCKET_NAME = "product-images";
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Validates and uploads a product image file to Supabase Storage.
 * Generates a unique, collision-resistant filename.
 */
export async function uploadProductImage(file: File): Promise<UploadResult> {
  // 1. Validate file type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file format "${file.type}". Allowed: JPG, PNG, WEBP, GIF, SVG.`
    );
  }

  // 2. Validate file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `File "${file.name}" exceeds 5MB size limit (${(
        file.size /
        (1024 * 1024)
      ).toFixed(2)} MB).`
    );
  }

  // 3. Generate unique filename
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const uniqueName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}.${extension}`;
  const filePath = `products/${uniqueName}`;

  const supabase = createClient();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    if (uploadError.message.includes("Bucket not found")) {
      throw new Error(
        'Storage bucket "product-images" is not created yet in Supabase. Please execute the migration script in supabase/migrations/01_storage_setup.sql.'
      );
    }
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  // 4. Retrieve public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    path: filePath,
  };
}

/**
 * Removes an image from Supabase Storage by its public URL or path.
 */
export async function deleteProductImage(urlOrPath: string): Promise<boolean> {
  try {
    const supabase = createClient();
    let filePath = urlOrPath;

    if (urlOrPath.includes(BUCKET_NAME)) {
      const parts = urlOrPath.split(`${BUCKET_NAME}/`);
      if (parts[1]) {
        filePath = decodeURIComponent(parts[1].split("?")[0]);
      }
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.warn("Could not delete file from storage:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Storage delete error:", err);
    return false;
  }
}
