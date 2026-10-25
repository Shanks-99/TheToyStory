-- ==============================================================================
-- THE TOY STORY - COMPLETE SUPABASE SETUP SCRIPT (FIXED)
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. ADD target_audience COLUMN (for Babies, Boys, Girls category checkboxes)
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS target_audience text[] DEFAULT ARRAY['babies', 'boys', 'girls']::text[];

COMMENT ON COLUMN public.products.target_audience IS 'Category collections to display product in: babies, boys, girls';


-- 2. CREATE 'product-images' STORAGE BUCKET FOR PRODUCT PHOTOGRAPHY
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']::text[];


-- 3. STORAGE POLICY: PUBLIC READ ACCESS
-- Allows visitors to see product photos on the storefront
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');


-- 4. STORAGE POLICY: ADMIN INSERT ACCESS
-- Only verified admins listed in public.admin_users can upload product photos
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.user_id = auth.uid()
  )
);


-- 5. STORAGE POLICY: ADMIN UPDATE ACCESS
-- Only verified admins can replace existing photos
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.user_id = auth.uid()
  )
)
WITH CHECK (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.user_id = auth.uid()
  )
);


-- 6. STORAGE POLICY: ADMIN DELETE ACCESS
-- Only verified admins can delete photos
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE public.admin_users.user_id = auth.uid()
  )
);

-- 7. PRODUCT AVAILABLE COLORS AND CATEGORY COVER PHOTOS
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS available_colors text[] DEFAULT ARRAY[]::text[];

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category_images jsonb DEFAULT '{}'::jsonb;

