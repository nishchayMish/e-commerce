"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/app/lib/data";
import AnimatedSection from "./ui/AnimatedSection";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slide = useCallback((newDir: number) => {
    setDirection(newDir);
    setActiveIdx((prev) => {
      const next = prev + newDir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      slide(1);
    }, 7000);
  }, [slide]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const active = testimonials[activeIdx];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Header Left */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <AnimatedSection direction="up">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
                Customer Voices
              </span>
              <h2 className="text-3xl sm:text-[42px] lg:text-[48px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-5">
                Loved By Discerning Individuals
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-md leading-relaxed">
                Read firsthand accounts of how AURUM curates experiences that transcend ordinary commerce.
              </p>

              {/* Slide controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    slide(-1);
                    resetTimer();
                  }}
                  className="w-11 h-11 rounded-xl border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shadow-sm bg-white"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => {
                    slide(1);
                    resetTimer();
                  }}
                  className="w-11 h-11 rounded-xl border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shadow-sm bg-white"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Testimonial Active Card Right */}
          <div className="lg:col-span-7 relative flex items-center">
            {/* Background design elements */}
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-indigo-50 rounded-full blur-[60px] opacity-40" />
            </div>

            <AnimatedSection direction="up" delay={0.15} className="w-full">
              <div className="relative min-h-[380px] sm:min-h-[320px] bg-gray-50 border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-gray-200/80 pointer-events-none">
                  <Quote size={52} className="rotate-180" />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col flex-1"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-6 text-amber-400">
                      {Array.from({ length: active.rating }).map((_, i) => (
                        <Star key={i} size={15} className="fill-amber-400" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 leading-relaxed italic mb-8 flex-1">
                      &ldquo;{active.review}&rdquo;
                    </p>

                    {/* User profile row */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-200/60">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 shrink-0">
                        <Image
                          src={active.avatar}
                          alt={active.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-gray-900 truncate">
                            {active.name}
                          </h4>
                          {active.verified && (
                            <CheckCircle size={14} className="text-indigo-600 fill-indigo-50/50 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          {active.role} &middot; {active.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
