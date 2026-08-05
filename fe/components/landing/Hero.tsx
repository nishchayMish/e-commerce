"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Star, TrendingUp } from "lucide-react";

const floatingCards = [
  {
    id: 1,
    name: "Chrono Prestige",
    price: "$1,299",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&q=80",
    rating: 4.9,
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Pure Santal Eau",
    price: "$185",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=120&q=80",
    rating: 4.8,
    tag: "New",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "120+", label: "Premium Brands" },
];

export default function Hero() {
  return (
    <section className="relative bg-white pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-16 py-16 sm:py-20 lg:py-24">

          {/* ─── Left: Copy ─────────────────────────────────── */}
          <div>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              New Collection 2026 · Now Available
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-4xl sm:text-5xl lg:text-[56px] font-semibold text-gray-900 leading-[1.05] tracking-[-0.03em]"
            >
              Discover
              <br />
              Your{" "}
              <span className="text-gray-400">Signature</span>
              <br />
              Style
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="mt-5 max-w-md text-sm sm:text-[15px] text-gray-500 leading-relaxed"
            >
              Curated luxury essentials for those who demand the very best.
              Explore our handpicked collection of premium products.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              <motion.button
                whileTap={{ scale: 0.99 }}
                className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800"
              >
                <ShoppingBag size={14} />
                Shop Now
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.99 }}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 text-[13px] font-medium text-gray-900 transition hover:bg-gray-50 hover:border-gray-300"
              >
                Explore Collection
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-12 flex items-center gap-0"
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col ${i > 0 ? "pl-5 sm:pl-7 ml-5 sm:ml-7 border-l border-gray-200" : ""}`}
                >
                  <span className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight tabular-nums">{value}</span>
                  <span className="mt-0.5 text-xs text-gray-400">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Visual ──────────────────────────────── */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-105 aspect-4/5 overflow-hidden rounded-xl border border-gray-200 bg-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=960&q=85"
                alt="Premium fashion editorial"
                fill
                className="object-cover"
                priority
                sizes="480px"
              />
            </motion.div>

            {/* Floating card – top left */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="absolute -left-6 xl:-left-12 top-12 flex w-52 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#fafafa] border border-gray-100">
                <Image src={floatingCards[0].image} alt={floatingCards[0].name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">{floatingCards[0].tag}</span>
                <p className="truncate text-[13px] font-medium leading-snug text-gray-900">{floatingCards[0].name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                    <Star size={10} className="fill-gray-900 text-gray-900" />
                    {floatingCards[0].rating}
                  </span>
                  <span className="text-[13px] font-semibold text-gray-900 tabular-nums">{floatingCards[0].price}</span>
                </div>
              </div>
            </motion.div>

            {/* Floating card – bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="absolute -right-6 xl:-right-12 bottom-20 flex w-52 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#fafafa] border border-gray-100">
                <Image src={floatingCards[1].image} alt={floatingCards[1].name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">{floatingCards[1].tag}</span>
                <p className="truncate text-[13px] font-medium leading-snug text-gray-900">{floatingCards[1].name}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                    <Star size={10} className="fill-gray-900 text-gray-900" />
                    {floatingCards[1].rating}
                  </span>
                  <span className="text-[13px] font-semibold text-gray-900 tabular-nums">{floatingCards[1].price}</span>
                </div>
              </div>
            </motion.div>

            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="absolute -right-4 xl:-right-10 top-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-1 flex items-center gap-1.5">
                <TrendingUp size={12} className="text-gray-400" />
                <span className="text-[11px] font-medium text-gray-400">New Arrivals</span>
              </div>
              <p className="text-[15px] font-semibold text-gray-900 tabular-nums">240+ Items</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-gray-200"
        />
      </motion.div>
    </section>
  );
}
