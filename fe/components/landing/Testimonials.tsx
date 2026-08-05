"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

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
      x: dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 24 : -24,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Header Left */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <AnimatedSection direction="up">
              <span className="eyebrow mb-2 block">
                Customer Voices
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
                Loved By Discerning Individuals
              </h2>
              <p className="text-[13px] sm:text-sm text-gray-500 mb-6 max-w-md leading-relaxed">
                Read firsthand accounts of how AURUM curates experiences that transcend ordinary commerce.
              </p>

              {/* Slide controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    slide(-1);
                    resetTimer();
                  }}
                  className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 transition hover:text-gray-900 hover:border-gray-300 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  onClick={() => {
                    slide(1);
                    resetTimer();
                  }}
                  className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 transition hover:text-gray-900 hover:border-gray-300 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Testimonial Active Card Right */}
          <div className="lg:col-span-7 relative flex items-center">
            <AnimatedSection direction="up" delay={0.08} className="w-full">
              <div className="relative min-h-[320px] sm:min-h-[280px] rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col justify-between">

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-gray-100 pointer-events-none">
                  <Quote size={40} className="rotate-180" />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex flex-col flex-1"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-5 text-gray-900">
                      {Array.from({ length: active.rating }).map((_, i) => (
                        <Star key={i} size={13} className="fill-gray-900" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-sm sm:text-base text-gray-900 leading-relaxed mb-6 flex-1">
                      &ldquo;{active.review}&rdquo;
                    </p>

                    {/* User profile row */}
                    <div className="flex items-center gap-3 pt-5 border-t border-gray-200">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                        <Image
                          src={active.avatar}
                          alt={active.name}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-[13px] font-medium text-gray-900 truncate">
                            {active.name}
                          </h4>
                          {active.verified && (
                            <CheckCircle size={13} className="text-gray-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
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
