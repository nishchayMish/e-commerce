export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "New" | "Sale" | "Hot" | "Limited";
  isBestSeller?: boolean;
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
