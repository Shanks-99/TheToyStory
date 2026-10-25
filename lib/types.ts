export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category: string;
  target_audience?: string[] | null;
  available_colors?: string[] | null;
  category_images?: Record<string, string> | null;
  image_urls: string[] | null;
  stock: number;
  age_range: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  user_id: string;
  created_at: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  category: string;
  target_audience: string[]; // e.g. ['babies', 'boys', 'girls']
  available_colors?: string[]; // e.g. ['Sky Blue', 'Pastel Pink']
  category_images?: Record<string, string>; // e.g. { boys: 'url...', girls: 'url...' }
  image_urls: string[];
  stock: number;
  age_range: string;
  is_active: boolean;
}
