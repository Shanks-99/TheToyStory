-- ==============================================================================
-- Migration: Add target_audience column to public.products
-- Run this in your Supabase Dashboard -> SQL Editor
-- ==============================================================================

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS target_audience text[] DEFAULT ARRAY['babies', 'boys', 'girls']::text[];

COMMENT ON COLUMN public.products.target_audience IS 'Target audience/category collections to display product in: babies, boys, girls';
