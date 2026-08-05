"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Categories() {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-[#fafafa] border-y border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <AnimatedSection direction="up" className="max-w-xl">
            <span className="block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
              Curated Collections
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
              Featured Categories
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.05}>
            <Link
              href="/categories"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-900 transition-colors hover:text-gray-500"
            >
              Browse All Collections
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((category, index) => {
            const colSpan = index < 2 ? "md:col-span-3" : "md:col-span-2";
            const aspect = index < 2 ? "aspect-16/10" : "aspect-4/3";

            return (
              <AnimatedSection
                key={category.id}
                direction="up"
                delay={index * 0.05}
                className={`${colSpan}`}
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  {/* Image Container */}
                  <div className={`relative w-full ${aspect} overflow-hidden border-b border-gray-100 bg-[#fafafa]`}>
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.03 }}
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
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400 tabular-nums">
                      {category.productCount.toLocaleString()} products
                    </span>
                    <h3 className="mt-1.5 flex items-center gap-1.5 text-[15px] font-medium leading-snug text-gray-900">
                      {category.name}
                      <ArrowUpRight size={14} className="text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </h3>
                    <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-gray-500">
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
