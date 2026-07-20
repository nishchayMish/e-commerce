"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection direction="up">
          <div className="relative rounded-[2rem] overflow-hidden bg-gray-950 px-8 py-14 sm:px-14 sm:py-20 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 left-1/4 w-72 h-72 bg-indigo-600/30 rounded-full blur-[90px]" />
              <div className="absolute -bottom-24 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-2xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300 mb-4 block">
                Explore
              </span>
              <h2 className="text-3xl sm:text-[42px] font-bold text-white leading-[1.1] tracking-tight mb-4">
                Ready to find your signature?
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-9 max-w-md mx-auto">
                Browse our latest arrivals and discover pieces curated for the
                way you live.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-indigo-50 px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors duration-300"
                  >
                    Shop Collection
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors duration-300"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
