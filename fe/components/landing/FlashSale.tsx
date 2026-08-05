"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { flashSaleProduct } from "@/lib/data";
import CountdownTimer from "@/components/ui/CountdownTimer";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FlashSale() {
  return (
    <section className="py-16 sm:py-20 bg-[#fafafa] border-y border-gray-200 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Copy / Counter Left */}
              <div className="flex flex-col items-start">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                  <Sparkles size={12} className="text-gray-400" />
                  Limited Offer · Flash Sale
                </div>

                <h2 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
                  Exclusive Obsidian Edition
                </h2>

                <p className="mt-3 max-w-md text-[13px] sm:text-sm text-gray-500 leading-relaxed">
                  Experience true precision. Handcrafted in Geneva, the Chrono Prestige Obsidian Edition features our bespoke black ceramic construct. Save 44% for a limited time.
                </p>

                {/* Countdown Wrapper */}
                <div className="mt-8">
                  <span className="block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                    Offer expires in
                  </span>
                  <div className="mt-3">
                    <CountdownTimer targetHours={18} />
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Special Price</span>
                    <div className="mt-0.5 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 tabular-nums">
                        ${flashSaleProduct.price}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.99 }}
                    className="group inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800"
                  >
                    Claim Exclusive Offer
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex w-full items-center gap-3 border-t border-gray-200 pt-6 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-gray-400" />
                    <span>Free Lifetime Warranty</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>Insured Express Shipping</span>
                </div>
              </div>

              {/* Product Visual Right */}
              <div className="relative flex justify-center items-center">
                <div className="relative w-full aspect-4/3 sm:aspect-square md:max-w-105 overflow-hidden rounded-xl border border-gray-200 bg-[#fafafa]">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={flashSaleProduct.image}
                      alt={flashSaleProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                  </motion.div>

                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
