"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { flashSaleProduct } from "@/lib/data";
import CountdownTimer from "@/components/ui/CountdownTimer";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FlashSale() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection direction="up">
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-950 via-gray-900 to-black px-6 py-16 sm:px-12 sm:py-20 lg:p-24 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">

            {/* Background design elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500 rounded-full blur-[90px]" />
              <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-600 rounded-full blur-[100px]" />
              <div className="grid-bg absolute inset-0 opacity-10" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Copy / Counter Left */}
              <div className="flex flex-col items-start text-white">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
                  <Sparkles size={12} className="text-indigo-400" />
                  Limited Offer · Flash Sale
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
                  Exclusive Obsidian Edition
                </h2>

                <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-md leading-relaxed">
                  Experience true precision. Handcrafted in Geneva, the Chrono Prestige Obsidian Edition features our bespoke black ceramic construct. Save 44% for a limited time.
                </p>

                {/* Countdown Wrapper */}
                <div className="mb-10">
                  <span className="text-[10px] sm:text-xs text-indigo-300 font-bold uppercase tracking-[0.2em] mb-3.5 block">
                    Offer expires in
                  </span>
                  <CountdownTimer targetHours={18} />
                </div>

                {/* Pricing & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 w-full sm:w-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">Special Price</span>
                    <div className="flex items-baseline gap-2.5 mt-1">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        ${flashSaleProduct.price}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2.5 bg-white text-gray-900 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.15)] group shrink-0"
                  >
                    Claim Exclusive Offer
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10 w-full text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-indigo-400" />
                    <span>Free Lifetime Warranty</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span>Insured Express Shipping</span>
                </div>
              </div>

              {/* Product Visual Right */}
              <div className="relative flex justify-center items-center">
                <div className="relative w-full aspect-[4/3] sm:aspect-square md:max-w-[420px] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.3)] bg-gray-950">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
