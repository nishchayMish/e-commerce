"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
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

const cardClass =
  "rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";

export default function EmptyCart() {
  return (
    <section className="min-h-dvh bg-[#fafafa] pt-16 pb-16 lg:pb-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="flex items-center justify-between gap-4 py-5 sm:py-6">
            <div className="min-w-0 flex items-baseline gap-2.5">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Cart
              </h1>
              <span className="text-[13px] text-gray-500 tabular-nums">0 items</span>
            </div>
            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 transition hover:decoration-gray-900"
            >
              <span className="hidden sm:inline">Browse shop</span>
              <span className="sm:hidden">Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.06}>
          <div className={`${cardClass} overflow-hidden`}>
            <div className="flex flex-col items-center text-center px-6 sm:px-10 py-14 sm:py-16">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-[#fafafa] text-gray-400">
                <ShoppingBag size={20} strokeWidth={1.75} />
              </div>

              <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                Ready when you are
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight leading-tight max-w-md">
                Your cart is empty
              </h2>
              <p className="mt-2 text-[13px] text-gray-500 leading-relaxed max-w-md">
                Looks like you haven&apos;t added anything yet. Explore our
                curated picks and find something you love.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full max-w-xs sm:max-w-none sm:w-auto">
                <Link
                  href="/shop"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
                >
                  Start shopping
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 text-[13px] font-medium text-gray-900 transition hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99]"
                >
                  Browse categories
                </Link>
              </div>

              {/* Quick category shortcuts */}
              <div className="mt-10 w-full max-w-xl border-t border-gray-200 pt-6">
                <p className="mb-3 text-xs text-gray-400">
                  Popular places to start
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {quickLinks.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.12} className="mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {perks.map(({ icon: Icon, label, hint }) => (
              <div
                key={label}
                className="flex sm:flex-col items-center gap-3 sm:gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3.5 sm:py-4 text-left sm:text-center"
              >
                <Icon size={14} className="shrink-0 text-gray-400" strokeWidth={1.75} />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-900">{label}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{hint}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
