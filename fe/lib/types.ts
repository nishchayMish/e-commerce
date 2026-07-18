
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  rating: number;
  quantity?: number;
  in_stock?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface HomeProductsResponse {
  categories: string[];
  trendingProducts: Record<string, Product[]>;
  bestsellerProducts: Record<string, Product[]>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  location: string;
  verified: boolean;
}

export interface Brand {
  id: string;
  name: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  link: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}
