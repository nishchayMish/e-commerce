"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/lib/types";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const price = Number(product.price);
  const oldPrice =
    product.old_price != null ? Number(product.old_price) : null;
  const showOldPrice = oldPrice != null && oldPrice > price;

  const isBestSeller = Boolean(product.bestSeller ?? product.bestseller);
  const inStock = product.in_stock ?? (product.quantity ?? 0) > 0;
  const rating = Number(product.rating) || 0;

  const handleAddToCart = async(pId: string) => {
    try {
      await http.post(endpoints.cart.addToCart, {
        pId
      })
      toast.success("Item added to cart")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-indigo-50 rounded-full opacity-60 blur-[80px]" />
        <div className="grid-bg absolute inset-0 opacity-25" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24 sm:pb-32">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/shop" className="hover:text-gray-900 transition-colors">
            Shop
          </Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ─── Image ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06)]"
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}

            {(isBestSeller || product.trending) && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isBestSeller && (
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gray-800 shadow-sm ring-1 ring-black/5">
                    Best Seller
                  </span>
                )}
                {product.trending && !isBestSeller && (
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gray-800 shadow-sm ring-1 ring-black/5">
                    Trending
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* ─── Details ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 mb-3">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.15] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < Math.floor(rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">·</span>
              <span
                className={`text-sm font-medium ${
                  inStock ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {showOldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{oldPrice!.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-10 max-w-lg">
                {product.description.length > 280
                  ? `${product.description.slice(0, 280).trim()}…`
                  : product.description}
              </p>
            )}

            {/* Quantity + Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden shrink-0">
                <button
                  type="button"
                 
                  className="w-11 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-gray-900">
                  3
                </span>
                <button
                  type="button"
                  
                  className="w-11 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={()=>handleAddToCart(product.id)}
                className="flex items-center justify-center gap-2.5 h-12 rounded-xl hover:text-gray-100 hover:bg-gray-700  text-sm font-semibold text-white cursor-pointer bg-gray-800 w-full transition-all duration-250"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => setWishlisted((w) => !w)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                  wishlisted
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={17} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-gray-100">
              {[
                { icon: Truck, label: "Free shipping" },
                { icon: RotateCcw, label: "Easy returns" },
                { icon: ShieldCheck, label: "Secure checkout" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-gray-500"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 shrink-0">
                    <Icon size={15} />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full description block */}
        {product.description && product.description.length > 280 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-16 sm:mt-20 max-w-3xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4">
              About this product
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              {product.description}
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
}
