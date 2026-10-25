-- ==============================================================================
-- THE TOY STORY - ADD PRODUCT COLORS AND CATEGORY COVER PHOTOS
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. ADD available_colors (Array of color names e.g. ['Sky Blue', 'Pastel Pink'])
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS available_colors text[] DEFAULT ARRAY[]::text[];

COMMENT ON COLUMN public.products.available_colors IS 'List of available colors buyer can select on product page';

-- 2. ADD category_images (JSON object mapping category name to cover image URL e.g. {"boys": "url1", "girls": "url2", "babies": "url3"})
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category_images jsonb DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.products.category_images IS 'Category-specific cover photo URLs (e.g. boys, girls, babies)';
