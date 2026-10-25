"use server";

import { createClient } from "@/lib/supabase-server";
import { getAdminUser } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";
import { revalidatePath } from "next/cache";
import type { ProductFormData } from "@/lib/types";

export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Sign in admin user and ensure they exist in public.admin_users
 */
export async function signInAdminAction(
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError || !authData.user) {
    return {
      success: false,
      error: authError?.message || "Invalid email or password.",
    };
  }

  // Strictly verify that the user exists in public.admin_users
  const { data: adminRecord, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", authData.user.id)
    .maybeSingle();

  if (adminError || !adminRecord) {
    // Revoke session immediately for non-admin
    await supabase.auth.signOut();
    return {
      success: false,
      error:
        "Access denied. This account does not have administrator privileges.",
    };
  }

  return { success: true };
}

/**
 * Sign out current admin user
 */
export async function signOutAdminAction(): Promise<ActionResult> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  return { success: true };
}

/**
 * Helper to ensure a unique slug for a product
 */
async function resolveUniqueSlug(
  baseSlug: string,
  excludeId?: string
): Promise<string> {
  const supabase = await createClient();
  let candidate = baseSlug || "toy-product";
  let count = 0;

  while (true) {
    let query = supabase.from("products").select("id").eq("slug", candidate);
    if (excludeId) {
      query = query.neq("id", excludeId);
    }
    const { data } = await query.maybeSingle();
    if (!data) {
      return candidate;
    }
    count += 1;
    candidate = `${baseSlug}-${count}`;
  }
}

/**
 * Create a new product in Supabase
 */
export async function createProductAction(
  input: ProductFormData
): Promise<ActionResult<{ id: string }>> {
  const { isAdmin } = await getAdminUser();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized. Admin privileges required." };
  }

  // Server-side validation
  if (!input.name || input.name.trim().length === 0) {
    return { success: false, error: "Product name is required." };
  }
  if (!input.category || input.category.trim().length === 0) {
    return { success: false, error: "Product category is required." };
  }
  if (typeof input.price !== "number" || isNaN(input.price) || input.price < 0) {
    return { success: false, error: "Price must be a non-negative number." };
  }
  if (
    input.compare_at_price !== null &&
    input.compare_at_price !== undefined &&
    (isNaN(input.compare_at_price) || input.compare_at_price < 0)
  ) {
    return {
      success: false,
      error: "Compare-at price must be a non-negative number.",
    };
  }
  if (
    typeof input.stock !== "number" ||
    isNaN(input.stock) ||
    input.stock < 0 ||
    !Number.isInteger(input.stock)
  ) {
    return { success: false, error: "Stock must be a non-negative whole integer." };
  }

  const baseSlug = slugify(input.slug?.trim() || input.name);
  const finalSlug = await resolveUniqueSlug(baseSlug);

  const audiences =
    Array.isArray(input.target_audience) && input.target_audience.length > 0
      ? input.target_audience
      : ["babies", "boys", "girls"];

  const insertPayload: Record<string, unknown> = {
    name: input.name.trim(),
    slug: finalSlug,
    description: input.description?.trim() || null,
    price: input.price,
    compare_at_price:
      input.compare_at_price !== null && input.compare_at_price !== undefined
        ? input.compare_at_price
        : null,
    category: input.category.trim(),
    target_audience: audiences,
    available_colors: Array.isArray(input.available_colors) ? input.available_colors : [],
    category_images: input.category_images && typeof input.category_images === "object" ? input.category_images : {},
    image_urls: Array.isArray(input.image_urls) ? input.image_urls : [],
    stock: input.stock,
    age_range: input.age_range?.trim() || null,
    is_active: Boolean(input.is_active),
  };

  const supabase = await createClient();
  let { data, error } = await supabase
    .from("products")
    .insert([insertPayload])
    .select("id")
    .single();

  // If column does not exist yet in Supabase (42703), retry without newly added columns
  if (error && error.code === "42703") {
    const fallbackPayload = { ...insertPayload };
    delete fallbackPayload.available_colors;
    delete fallbackPayload.category_images;
    delete fallbackPayload.target_audience;
    const retry = await supabase
      .from("products")
      .insert([fallbackPayload])
      .select("id")
      .single();
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error("Error inserting product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  revalidatePath("/");
  revalidatePath("/babies");
  revalidatePath("/boys");
  revalidatePath("/girls");

  return { success: true, data: { id: data?.id } };
}

/**
 * Update an existing product
 */
export async function updateProductAction(
  id: string,
  input: ProductFormData
): Promise<ActionResult> {
  const { isAdmin } = await getAdminUser();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized. Admin privileges required." };
  }

  if (!id) {
    return { success: false, error: "Product ID is missing." };
  }

  // Server-side validation
  if (!input.name || input.name.trim().length === 0) {
    return { success: false, error: "Product name is required." };
  }
  if (!input.category || input.category.trim().length === 0) {
    return { success: false, error: "Product category is required." };
  }
  if (typeof input.price !== "number" || isNaN(input.price) || input.price < 0) {
    return { success: false, error: "Price must be a non-negative number." };
  }
  if (
    input.compare_at_price !== null &&
    input.compare_at_price !== undefined &&
    (isNaN(input.compare_at_price) || input.compare_at_price < 0)
  ) {
    return {
      success: false,
      error: "Compare-at price must be a non-negative number.",
    };
  }
  if (
    typeof input.stock !== "number" ||
    isNaN(input.stock) ||
    input.stock < 0 ||
    !Number.isInteger(input.stock)
  ) {
    return { success: false, error: "Stock must be a non-negative whole integer." };
  }

  const baseSlug = slugify(input.slug?.trim() || input.name);
  const finalSlug = await resolveUniqueSlug(baseSlug, id);

  const audiences =
    Array.isArray(input.target_audience) && input.target_audience.length > 0
      ? input.target_audience
      : ["babies", "boys", "girls"];

  const updatePayload: Record<string, unknown> = {
    name: input.name.trim(),
    slug: finalSlug,
    description: input.description?.trim() || null,
    price: input.price,
    compare_at_price:
      input.compare_at_price !== null && input.compare_at_price !== undefined
        ? input.compare_at_price
        : null,
    category: input.category.trim(),
    target_audience: audiences,
    available_colors: Array.isArray(input.available_colors) ? input.available_colors : [],
    category_images: input.category_images && typeof input.category_images === "object" ? input.category_images : {},
    image_urls: Array.isArray(input.image_urls) ? input.image_urls : [],
    stock: input.stock,
    age_range: input.age_range?.trim() || null,
    is_active: Boolean(input.is_active),
    updated_at: new Date().toISOString(),
  };

  const supabase = await createClient();
  let { error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", id);

  // If column does not exist yet in Supabase (42703), retry without newly added columns
  if (error && error.code === "42703") {
    const fallbackPayload = { ...updatePayload };
    delete fallbackPayload.available_colors;
    delete fallbackPayload.category_images;
    delete fallbackPayload.target_audience;
    const retry = await supabase
      .from("products")
      .update(fallbackPayload)
      .eq("id", id);
    error = retry.error;
  }

  if (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  revalidatePath("/");
  revalidatePath("/babies");
  revalidatePath("/boys");
  revalidatePath("/girls");

  return { success: true };
}

/**
 * Toggle product active status
 */
export async function toggleProductActiveAction(
  id: string,
  is_active: boolean
): Promise<ActionResult> {
  const { isAdmin } = await getAdminUser();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized. Admin privileges required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/");

  return { success: true };
}

/**
 * Delete a product
 */
export async function deleteProductAction(id: string): Promise<ActionResult> {
  const { isAdmin } = await getAdminUser();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized. Admin privileges required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  revalidatePath("/");

  return { success: true };
}
