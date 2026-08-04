"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { categories } from "@/lib/data";

const perks = [
  { icon: Truck, label: "Free delivery", hint: "On orders over ₹500" },
  { icon: RefreshCw, label: "Easy returns", hint: "Within 30 days" },
  { icon: ShieldCheck, label: "Secure pay", hint: "Encrypted checkout" },
];

const quickLinks = categories.slice(0, 4);

export default function EmptyCart() {
  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-[5.5rem] pb-24 sm:pb-28 lg:pb-32 min-h-[70vh]">
      <div className="absolute inset-0 bg-slate-50/70 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection direction="up">
          <div className="flex items-center justify-between gap-4 py-5 sm:py-6 mb-1 sm:mb-2">
            <div className="min-w-0 flex items-baseline gap-2.5 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Cart
              </h1>
              <span className="text-sm text-gray-400 tabular-nums">0 items</span>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors shrink-0"
            >
              <span className="hidden sm:inline">Browse shop</span>
              <span className="sm:hidden">Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.06}>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100/90 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)]">
            <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-indigo-50/80 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-slate-100/80 blur-3xl" />

            <div className="relative flex flex-col items-center text-center px-6 sm:px-10 py-14 sm:py-16 lg:py-20">
              {/* Animated bag illustration */}
              <div className="relative mb-8 sm:mb-9">
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-indigo-100/60"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.div
                  className="relative w-[4.75rem] h-[4.75rem] sm:w-[5.25rem] sm:h-[5.25rem] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100/80 shadow-[0_8px_28px_rgba(79,70,229,0.12)] flex items-center justify-center text-indigo-600"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ShoppingBag size={30} strokeWidth={1.6} />
                  </motion.div>
                  <motion.span
                    className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 320 }}
                  >
                    0
                  </motion.span>
                </motion.div>
              </div>

              <p className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 mb-3">
                <Sparkles size={12} strokeWidth={2} />
                Ready when you are
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-gray-900 tracking-tight leading-tight max-w-md">
                Your cart is empty
              </h2>
              <p className="mt-3 sm:mt-3.5 text-sm sm:text-[15px] text-gray-500 leading-relaxed max-w-md">
                Looks like you haven&apos;t added anything yet. Explore our
                curated picks and find something you love.
              </p>

              <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-sm sm:max-w-none sm:w-auto">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_8px_24px_rgba(79,70,229,0.28)] transition-all duration-200"
                >
                  Start shopping
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-800 bg-white border border-gray-200 hover:border-gray-300 hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
                >
                  Browse categories
                </Link>
              </div>

              {/* Quick category shortcuts */}
              <div className="mt-10 sm:mt-12 w-full max-w-xl">
                <p className="text-xs font-medium text-gray-400 mb-3">
                  Popular places to start
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {quickLinks.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-slate-50/80 px-3.5 py-2 text-xs sm:text-[13px] font-medium text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/70 hover:text-indigo-700 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.12} className="mt-5 sm:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {perks.map(({ icon: Icon, label, hint }) => (
              <div
                key={label}
                className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 rounded-2xl bg-white border border-gray-100 px-4 py-3.5 sm:py-5 text-left sm:text-center shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{hint}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
