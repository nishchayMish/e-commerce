"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/app/lib/data";
import ProductCard from "./ui/ProductCard";
import AnimatedSection from "./ui/AnimatedSection";

const filterTabs = ["All", "Fashion", "Electronics", "Beauty", "Sports & Fitness"];

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="trending" className="py-24 sm:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <AnimatedSection direction="up" className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Trending Now
            </span>
            <h2 className="text-3xl sm:text-[42px] lg:text-[48px] font-bold text-gray-900 leading-[1.1] tracking-tight">
              Most Popular Items
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1} className="mt-4 md:mt-0">
            <Link
              href="/shop"
              className="group flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Shop All Products
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Premium Filter Tabs */}
        <AnimatedSection direction="up" delay={0.1} className="mb-10 overflow-x-auto hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="flex border-b border-gray-100 gap-6 sm:gap-8 pb-3 min-w-max">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="trendingActiveIndicator"
                    className="absolute bottom-[-13px] left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
