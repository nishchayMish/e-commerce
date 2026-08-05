"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useHomeProducts } from "@/context/HomeProductsContext";

export default function BestSellers() {
  const { data } = useHomeProducts();
  const bestsellerProducts = data?.bestsellerProducts ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#fafafa] border-y border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <AnimatedSection direction="up" className="max-w-xl">
            <span className="eyebrow mb-2 block">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
              Best Sellers
            </h2>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.06} className="flex items-center gap-3">
            <Link
              href="/shop?sort=best-seller"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-900 transition-colors hover:text-gray-500 mr-1"
            >
              Explore Collection
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Carousel Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 transition hover:text-gray-900 hover:border-gray-300 cursor-pointer"
                aria-label="Scroll left"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 transition hover:text-gray-900 hover:border-gray-300 cursor-pointer"
                aria-label="Scroll right"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth py-2 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {bestsellerProducts.map((product) => (
              <div
                key={product.id}
                className="w-[260px] sm:w-[290px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
