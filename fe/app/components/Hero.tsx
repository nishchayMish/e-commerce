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
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* ─── Background blobs ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-50 rounded-full opacity-70 blur-[80px]" />
        <div className="absolute bottom-0 -left-20 w-[320px] h-[320px] bg-gray-100 rounded-full opacity-60 blur-[60px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full py-28 lg:py-0">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-16 min-h-screen lg:min-h-0 lg:py-28">

          {/* ─── Left: Copy ─────────────────────────────────── */}
          <div>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-7 border border-indigo-100"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              New Collection 2026 · Now Available
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[52px] sm:text-[64px] lg:text-[76px] xl:text-[88px] font-bold text-gray-900 leading-[1.0] tracking-[-0.035em] mb-7"
            >
              Discover
              <br />
              Your{" "}
              <span className="relative inline-block text-indigo-600">
                Signature
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6 C60 2, 160 9, 298 4"
                    stroke="#c7d2fe"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Style
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-500 leading-[1.75] mb-9 max-w-md"
            >
              Curated luxury essentials for those who demand the very best.
              Explore our handpicked collection of premium products.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 bg-gray-900 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-indigo-600 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
              >
                <ShoppingBag size={16} />
                Shop Now
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 border border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-gray-800 hover:text-gray-900 transition-all duration-300 bg-white"
              >
                Explore Collection
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-0"
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col ${i > 0 ? "pl-6 sm:pl-8 ml-6 sm:ml-8 border-l border-gray-200" : ""}`}
                >
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
                  <span className="text-xs sm:text-sm text-gray-500 mt-0.5">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right: Visual ──────────────────────────────── */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[420px] xl:w-[480px] h-[540px] xl:h-[600px] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.18)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=960&q=85"
                alt="Premium fashion editorial"
                fill
                className="object-cover"
                priority
                sizes="480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>

            {/* Floating card – top left */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: 0.8 }}
              className="absolute -left-14 xl:-left-20 top-16 bg-white rounded-2xl p-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-gray-100/80 flex items-center gap-3 w-52 xl:w-56"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image src={floatingCards[0].image} alt={floatingCards[0].name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide">{floatingCards[0].tag}</span>
                <p className="text-xs font-semibold text-gray-900 leading-snug truncate">{floatingCards[0].name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[11px] text-gray-500 font-medium">{floatingCards[0].rating}</span>
                </div>
                <p className="text-sm font-bold text-indigo-600 mt-0.5">{floatingCards[0].price}</p>
              </div>
            </motion.div>

            {/* Floating card – bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: 1.0 }}
              className="absolute -right-14 xl:-right-20 bottom-28 bg-white rounded-2xl p-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-gray-100/80 flex items-center gap-3 w-52 xl:w-56"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image src={floatingCards[1].image} alt={floatingCards[1].name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide">{floatingCards[1].tag}</span>
                <p className="text-xs font-semibold text-gray-900 leading-snug truncate">{floatingCards[1].name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[11px] text-gray-500 font-medium">{floatingCards[1].rating}</span>
                </div>
                <p className="text-sm font-bold text-indigo-600 mt-0.5">{floatingCards[1].price}</p>
              </div>
            </motion.div>

            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -right-8 xl:-right-14 top-6 bg-indigo-600 text-white rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(79,70,229,0.4)]"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <TrendingUp size={13} className="opacity-80" />
                <span className="text-[11px] font-medium opacity-80">New Arrivals</span>
              </div>
              <p className="text-xl font-bold">240+ Items</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 font-medium tracking-[0.15em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
