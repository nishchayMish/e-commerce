"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const price = Number(product.price);
  const oldPrice =
    product.old_price != null ? Number(product.old_price) : null;
  const showOldPrice = oldPrice != null && oldPrice > price;
  const isBestSeller = Boolean(product.bestSeller ?? product.bestseller);
  const badgeLabel = isBestSeller ? "Best Seller" : product.trending ? "Trending" : null;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.04),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1),0_28px_56px_rgba(0,0,0,0.12)] transition-shadow duration-400 flex flex-col"
    >
      {/* ─── Image ────────────────────────────────────────── */}
      <div className={`relative overflow-hidden bg-gray-50 ${compact ? "aspect-[4/3]" : "aspect-square"}`}>
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {badgeLabel && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-white/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium tracking-wide text-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
            {badgeLabel}
          </span>
        )}

        {/* Action buttons */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setWishlisted((w) => !w)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border transition-colors ${wishlisted
                ? "bg-rose-500 text-white border-rose-500"
                : "bg-white/90 text-gray-600 border-white/60 hover:text-rose-500"
              }`}
            aria-label="Add to wishlist"
          >
            <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>

      {/* ─── Content ──────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-600 mb-1.5">
          {product.category}
        </span>

        <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 mb-0.5">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(Number(product.rating))
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">
            {product.rating}
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {showOldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 ${added
              ? "bg-emerald-500 text-white"
              : "bg-gray-900 text-white hover:bg-indigo-600 active:scale-[0.98]"
            }`}
        >
          <ShoppingBag size={14} />
          {added ? "Added ✓" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}
