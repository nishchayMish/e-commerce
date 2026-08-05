"use client";

import { brands } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Brands() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-200 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-10">
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
            Collaborating With Leading Creators
          </span>
        </AnimatedSection>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative flex overflow-x-hidden w-full pointer-events-none">
        <div className="flex gap-16 sm:gap-24 py-2 animate-marquee whitespace-nowrap min-w-full items-center">
          {brands.map((brand) => (
            <span
              key={brand.id}
              className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-[0.18em] text-gray-300 transition-colors duration-300 hover:text-gray-900 select-none"
            >
              {brand.name}
            </span>
          ))}
        </div>

        {/* Mirror copy to make loop continuous */}
        <div className="flex gap-16 sm:gap-24 py-2 animate-marquee whitespace-nowrap min-w-full items-center" aria-hidden="true">
          {brands.map((brand) => (
            <span
              key={`mirror-${brand.id}`}
              className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-[0.18em] text-gray-300 transition-colors duration-300 hover:text-gray-900 select-none"
            >
              {brand.name}
            </span>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-linear-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-linear-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
