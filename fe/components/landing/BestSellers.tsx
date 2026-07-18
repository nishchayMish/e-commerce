"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { bestSellers } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getHomeProducts } from "@/services/home";
import toast from "react-hot-toast";
import { Product } from "@/lib/types";

export default function BestSellers() {
  const [bestsellerProducts, setBestsellerProducts] = useState<Record<string, Product[]>>({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getHomeProducts();
        setBestsellerProducts(data.bestsellerProducts)
        console.log(bestSellers)
      } catch {
        toast.error("error fetching products");
      }
    };
    fetchProducts();
  }, []);
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
    <section className="py-24 sm:py-32 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <AnimatedSection direction="up" className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Customer Favorites
            </span>
            <h2 className="text-3xl sm:text-[42px] lg:text-[48px] font-bold text-gray-900 leading-[1.1] tracking-tight">
              Best Sellers
            </h2>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1} className="flex items-center gap-4 mt-6 md:mt-0">
            <Link
              href="/shop?sort=best-seller"
              className="group flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors mr-2 sm:mr-4"
            >
              Explore Collection
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Carousel Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shadow-sm"
                aria-label="Scroll left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shadow-sm"
                aria-label="Scroll right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <div
            ref={scrollRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth py-4 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {bestsellerProducts.map((product) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start"
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
