"use client";

import { brands } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Brands() {
  // Let's create a dual marquee layout for premium continuous motion
  return (
    <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection direction="up" className="text-center mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            Collaborating With Leading Creators
          </span>
        </AnimatedSection>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative flex overflow-x-hidden w-full pointer-events-none">
        <div className="flex gap-20 sm:gap-28 py-2 animate-marquee whitespace-nowrap min-w-full items-center">
          {brands.map((brand) => (
            <span
              key={brand.id}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.25em] text-gray-300/80 hover:text-gray-900 transition-colors duration-300 select-none"
            >
              {brand.name}
            </span>
          ))}
        </div>

        {/* Mirror copy to make loop continuous */}
        <div className="flex gap-20 sm:gap-28 py-2 animate-marquee whitespace-nowrap min-w-full items-center" aria-hidden="true">
          {brands.map((brand) => (
            <span
              key={`mirror-${brand.id}`}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.25em] text-gray-300/80 hover:text-gray-900 transition-colors duration-300 select-none"
            >
              {brand.name}
            </span>
          ))}
        </div>

        {/* Gradient overlays to blur edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
