"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useHomeProducts } from "@/context/HomeProductsContext";

export default function TrendingProducts() {
  const { data } = useHomeProducts();
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const filterTabs = data?.categories ?? [];
  const activeTab = selectedTab ?? filterTabs[0] ?? "";
  const trendingProducts = data?.trendingProducts ?? {};
  const filteredProducts = trendingProducts[activeTab] ?? [];

  return (
    <section id="trending" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <AnimatedSection direction="up" className="max-w-xl">
            <span className="eyebrow mb-2 block">
              Trending Now
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
              Most Popular Items
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.06}>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-900 transition-colors hover:text-gray-500"
            >
              Shop All Products
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Filter Tabs */}
        <AnimatedSection direction="up" delay={0.06} className="mb-8 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex border-b border-gray-200 gap-5 sm:gap-7 pb-3 min-w-max">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`relative py-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
                  activeTab === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="trendingActiveIndicator"
                    className="absolute bottom-[-13px] left-0 right-0 h-px bg-gray-900"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
