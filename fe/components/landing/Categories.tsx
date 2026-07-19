"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Categories() {
  // Let's create an asymmetrical or premium layout
  // 5 items:
  // Item 0 (Electronics) & Item 1 (Fashion) can be larger or arranged beautifully
  // We can structure them with a clean grid.
  return (
    <section id="categories" className="py-24 sm:py-32 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <AnimatedSection direction="up" className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-[42px] lg:text-[48px] font-bold text-gray-900 leading-[1.1] tracking-tight">
              Featured Categories
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1} className="mt-4 md:mt-0">
            <Link
              href="/categories"
              className="group flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Browse All Collections
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Categories Grid (Asymmetric Premium Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8">
          {categories.map((category, index) => {
            // Determine sizes based on layout
            // Let's make index 0 (Electronics) md:col-span-3, index 1 (Fashion) md:col-span-3
            // index 2, 3, 4 md:col-span-2 each
            const colSpan = index < 2 ? "md:col-span-3" : "md:col-span-2";
            const height = index < 2 ? "h-[380px] sm:h-[480px]" : "h-[300px] sm:h-[380px]";

            return (
              <AnimatedSection
                key={category.id}
                direction="up"
                delay={index * 0.08}
                className={`${colSpan}`}
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group relative block w-full h-full rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.05)] border border-gray-100 bg-white"
                >
                  {/* Image Container */}
                  <div className={`relative w-full ${height} overflow-hidden`}>
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent transition-opacity duration-300 group-hover:from-gray-900/70" />
                  </div>

                  {/* Text overlay */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-indigo-300 mb-1">
                      {category.productCount.toLocaleString()} products
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold leading-none mb-1 group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1.5">
                      {category.name}
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200/90 font-medium leading-relaxed max-w-xs">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
