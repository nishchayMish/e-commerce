"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Category } from "@/lib/types";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {categories.map((category, index) => (
        <AnimatedSection
          key={category.id}
          direction="up"
          delay={index * 0.08}
        >
          <Link
            href={`/shop?category=${category.slug}`}
            className="group relative block rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.05)]"
          >
            <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/65 via-gray-900/20 to-transparent group-hover:from-gray-900/75 transition-opacity duration-300" />
            </div>

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-indigo-300 mb-1.5">
                {category.productCount.toLocaleString()} products
              </span>
              <h2 className="text-xl sm:text-2xl font-bold leading-none mb-2 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
                {category.name}
                <ArrowUpRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </h2>
              <p className="text-sm text-gray-200/90 font-medium leading-relaxed max-w-xs">
                {category.description}
              </p>
            </div>
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}
