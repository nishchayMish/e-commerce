"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="rounded-xl border border-gray-200 bg-[#fafafa] px-6 py-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:px-12 sm:py-14">
            <div className="mx-auto max-w-xl">
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                Explore
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                Ready to find your signature?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 leading-relaxed">
                Browse our latest arrivals and discover pieces curated for the
                way you live.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                <motion.div whileTap={{ scale: 0.99 }}>
                  <Link
                    href="/shop"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800"
                  >
                    Shop Collection
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.99 }}>
                  <Link
                    href="/contact"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 text-[13px] font-medium text-gray-900 transition hover:bg-gray-50 hover:border-gray-300"
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
