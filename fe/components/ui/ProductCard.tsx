"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const router = useRouter();
  const { fetchCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const price = Number(product.price);
  const oldPrice =
    product.old_price != null ? Number(product.old_price) : null;
  const showOldPrice = oldPrice != null && oldPrice > price;
  const isBestSeller = Boolean(product.bestSeller ?? product.bestseller);
  const badgeLabel = isBestSeller ? "Best Seller" : product.trending ? "Trending" : null;

  const handleAddToCart = async(pId: string) => {
    setAdded(true);
    try {
      await http.post(endpoints.cart.addToCart,{
        pId
      })
      await fetchCart();
    } catch (error) {
      toast.error("error adding product")
      console.log(error)
    }
    setTimeout(() => setAdded(false), 1000);
  };

  const onClickHandler = () => {
    router.push(`/shop/${product.id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    >
      {/* ─── Image ────────────────────────────────────────── */}
      <div className={`relative overflow-hidden bg-[#fafafa] border-b border-gray-100 ${compact ? "aspect-[4/3]" : "aspect-square"}`}>
        <motion.div
          onClick={onClickHandler}
          className="w-full h-full cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>

        {badgeLabel && (
          <span className="absolute top-3 left-3 z-10 rounded-md border border-gray-200 bg-white/90 backdrop-blur px-2 py-0.5 text-[11px] font-medium text-gray-600">
            {badgeLabel}
          </span>
        )}

        {/* Action buttons */}
        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setWishlisted((w) => !w)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition ${wishlisted
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white/90 backdrop-blur text-gray-500 border-gray-200 hover:text-gray-900"
              }`}
            aria-label="Add to wishlist"
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>

      {/* ─── Content ──────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400 truncate">
            {product.category}
          </span>
          <span className="flex items-center gap-1 shrink-0 text-[11px] font-medium text-gray-500">
            <Star size={10} className="fill-gray-900 text-gray-900" />
            {product.rating}
          </span>
        </div>

        <h3 onClick={onClickHandler} className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 cursor-pointer transition-colors hover:text-gray-500">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-3 mb-3">
          <span className="text-[15px] font-semibold text-gray-900 tabular-nums">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {showOldPrice && (
            <span className="text-[13px] text-gray-400 line-through tabular-nums">
              ₹{oldPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          disabled={added}
          whileTap={{ scale: 0.99 }}
          onClick={()=>handleAddToCart(product.id)}
          className={`mt-auto inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg text-[13px] font-medium transition ${added
              ? "bg-gray-100 text-gray-900 border border-gray-200"
              : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
        >
          <ShoppingBag size={13} />
          {added ? "Added" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}
