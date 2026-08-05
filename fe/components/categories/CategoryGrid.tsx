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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {categories.map((category, index) => (
        <AnimatedSection
          key={category.id}
          direction="up"
          delay={index * 0.06}
        >
          <Link
            href={`/shop?category=${category.slug}`}
            className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-gray-100 bg-[#fafafa]">
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            </div>

            <div className="p-5">
              <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400 tabular-nums">
                {category.productCount.toLocaleString()} products
              </span>
              <h2 className="mt-1.5 flex items-center gap-1 text-sm font-medium tracking-tight text-gray-900">
                {category.name}
                <ArrowUpRight
                  size={14}
                  className="text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </h2>
              <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed">
                {category.description}
              </p>
            </div>
          </Link>
        </AnimatedSection>
      ))}
    </div>
  );
}
