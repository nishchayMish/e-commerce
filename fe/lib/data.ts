import type { Product, Category, Testimonial, Brand, InstagramPost } from "./types";

/* ─── Products ──────────────────────────────────────────── */
export const products: Product[] = [
  {
    id: "1",
    name: "Acoustic Pro Wireless",
    brand: "Soleil Audio",
    category: "Electronics",
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.8,
    reviewCount: 2847,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    badge: "Hot",
  },
  {
    id: "2",
    name: "Chrono Prestige",
    brand: "Atelier Temps",
    category: "Fashion",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.9,
    reviewCount: 1204,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    badge: "Limited",
  },
  {
    id: "3",
    name: "Forma Leather Tote",
    brand: "Forma Studio",
    category: "Fashion",
    price: 285,
    rating: 4.7,
    reviewCount: 891,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    badge: "New",
  },
  {
    id: "4",
    name: "Velour Sunglasses",
    brand: "Maison Optique",
    category: "Fashion",
    price: 195,
    originalPrice: 245,
    discount: 20,
    rating: 4.6,
    reviewCount: 563,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
  },
  {
    id: "5",
    name: "Pure Santal Eau de Parfum",
    brand: "Luxe Parfum",
    category: "Beauty",
    price: 185,
    rating: 4.9,
    reviewCount: 3201,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&q=80",
    badge: "Hot",
  },
  {
    id: "6",
    name: "Reflex Runner Pro",
    brand: "Kinetic Sport",
    category: "Sports & Fitness",
    price: 165,
    originalPrice: 210,
    discount: 21,
    rating: 4.7,
    reviewCount: 4129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    badge: "Sale",
  },
  {
    id: "7",
    name: "Mirrorless Pro X",
    brand: "Apex Imaging",
    category: "Electronics",
    price: 2499,
    originalPrice: 2799,
    discount: 11,
    rating: 4.8,
    reviewCount: 734,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
  },
  {
    id: "8",
    name: "Cloud Stride Elite",
    brand: "Kinetic Sport",
    category: "Sports & Fitness",
    price: 220,
    rating: 4.6,
    reviewCount: 2156,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
    badge: "New",
  },
];

/* ─── Best Sellers (extends products with 4 more) ────────── */
export const bestSellers: Product[] = [
  ...products.slice(0, 4),
  {
    id: "9",
    name: "Noir Ceramic Mug Set",
    brand: "Forma Studio",
    category: "Home & Kitchen",
    price: 95,
    originalPrice: 120,
    discount: 21,
    rating: 4.8,
    reviewCount: 1672,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    isBestSeller: true,
  },
  {
    id: "10",
    name: "Velvet Cashmere Scarf",
    brand: "Nordic Thread",
    category: "Fashion",
    price: 145,
    rating: 4.9,
    reviewCount: 892,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
    isBestSeller: true,
  },
  {
    id: "11",
    name: "Obsidian Desk Lamp",
    brand: "Forma Studio",
    category: "Home & Kitchen",
    price: 240,
    rating: 4.7,
    reviewCount: 445,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    badge: "New",
    isBestSeller: true,
  },
  {
    id: "12",
    name: "Quartz Face Roller",
    brand: "Luxe Parfum",
    category: "Beauty",
    price: 68,
    originalPrice: 85,
    discount: 20,
    rating: 4.6,
    reviewCount: 3410,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    isBestSeller: true,
  },
];

/* ─── Categories ────────────────────────────────────────── */
export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Cutting-edge technology",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700&q=80",
    productCount: 1240,
    slug: "electronics",
  },
  {
    id: "2",
    name: "Fashion",
    description: "Curated editorial style",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=700&q=80",
    productCount: 3840,
    slug: "fashion",
  },
  {
    id: "3",
    name: "Home & Kitchen",
    description: "Refined living spaces",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80",
    productCount: 2156,
    slug: "home-kitchen",
  },
  {
    id: "4",
    name: "Beauty",
    description: "Luxury skincare & more",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=80",
    productCount: 1890,
    slug: "beauty",
  },
  {
    id: "5",
    name: "Sports & Fitness",
    description: "Performance redefined",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80",
    productCount: 987,
    slug: "sports-fitness",
  },
];

/* ─── Flash Sale Product ────────────────────────────────── */
export const flashSaleProduct: Product = {
  id: "fs1",
  name: "Chrono Prestige Obsidian Edition",
  brand: "Atelier Temps",
  category: "Fashion",
  price: 899,
  originalPrice: 1599,
  discount: 44,
  rating: 4.9,
  reviewCount: 891,
  image:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80",
  badge: "Limited",
};

/* ─── Testimonials ──────────────────────────────────────── */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sofia Andersen",
    role: "Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    rating: 5,
    review:
      "AURUM has completely elevated my shopping experience. The curation is impeccable — every product feels intentional and premium. I've been a loyal customer for over a year now.",
    location: "Copenhagen, Denmark",
    verified: true,
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Architect",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    rating: 5,
    review:
      "The attention to detail is extraordinary. Not just in the products, but the entire experience — from browsing to delivery. This is what luxury e-commerce should feel like.",
    location: "Singapore",
    verified: true,
  },
  {
    id: "3",
    name: "Isabelle Laurent",
    role: "Fashion Editor",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
    rating: 5,
    review:
      "I've shopped at all major luxury retailers and AURUM stands above them all. The interface is beautiful, shipping is always on time, and quality is always guaranteed.",
    location: "Paris, France",
    verified: true,
  },
];

/* ─── Brands ────────────────────────────────────────────── */
export const brands: Brand[] = [
  { id: "1", name: "MAISON" },
  { id: "2", name: "FORMA" },
  { id: "3", name: "ATELIER" },
  { id: "4", name: "SOLEIL" },
  { id: "5", name: "VERITE" },
  { id: "6", name: "LUXE CO." },
  { id: "7", name: "APEXIS" },
  { id: "8", name: "NORDIC" },
];

/* ─── Instagram Posts ───────────────────────────────────── */
export const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
    likes: 4821,
    link: "#",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80",
    likes: 3267,
    link: "#",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80",
    likes: 5930,
    link: "#",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    likes: 2198,
    link: "#",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    likes: 6740,
    link: "#",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
    likes: 3871,
    link: "#",
  },
];
