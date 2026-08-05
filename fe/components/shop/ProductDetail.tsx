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
import { useCart } from "@/context/CartContext";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const { fetchCart } = useCart();
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
      await fetchCart();
      toast.success("Item added to cart")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-[13px] text-gray-400">
          <Link href="/" className="transition-colors hover:text-gray-900">
            Home
          </Link>
          <ChevronRight size={13} className="text-gray-300" />
          <Link href="/shop" className="transition-colors hover:text-gray-900">
            Shop
          </Link>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="max-w-[200px] truncate font-medium text-gray-900 sm:max-w-none">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ─── Image ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
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
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {isBestSeller && (
                  <span className="rounded-md border border-gray-200 bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-600 backdrop-blur">
                    Best Seller
                  </span>
                )}
                {product.trending && !isBestSeller && (
                  <span className="rounded-md border border-gray-200 bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-600 backdrop-blur">
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
            <span className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < Math.floor(rating)
                        ? "fill-gray-900 text-gray-900"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="font-medium text-gray-900 tabular-nums">
                {rating.toFixed(1)}
              </span>
              <span className="text-gray-300">·</span>
              <span
                className={`inline-flex items-center gap-1.5 font-medium ${
                  inStock ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    inStock ? "bg-gray-900" : "bg-gray-300"
                  }`}
                />
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-2.5">
              <span className="text-2xl font-semibold tracking-tight text-gray-900 tabular-nums">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {showOldPrice && (
                <span className="text-sm text-gray-400 line-through tabular-nums">
                  ₹{oldPrice!.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-500">
                {product.description.length > 280
                  ? `${product.description.slice(0, 280).trim()}…`
                  : product.description}
              </p>
            )}

            {/* Quantity + Actions */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <div className="inline-flex h-10 shrink-0 items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                <button
                  type="button"
                 
                  className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-[13px] font-medium text-gray-900 tabular-nums">
                  3
                </span>
                <button
                  type="button"
                  
                  className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={()=>handleAddToCart(product.id)}
                className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => setWishlisted((w) => !w)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${
                  wishlisted
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-auto grid grid-cols-1 gap-2 border-t border-gray-200 pt-6 sm:grid-cols-3">
              {[
                { icon: Truck, label: "Free shipping" },
                { icon: RotateCcw, label: "Easy returns" },
                { icon: ShieldCheck, label: "Secure checkout" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[13px] font-medium text-gray-600"
                >
                  <Icon size={14} strokeWidth={1.75} className="shrink-0 text-gray-400" />
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
            className="mt-12 max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              About this product
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {product.description}
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
}
