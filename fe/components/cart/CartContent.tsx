"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CartSkeleton from "@/components/cart/CartSkeleton";
import EmptyCart from "@/components/cart/EmptyCart";
import { useEffect } from "react";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import { useCart } from "@/context/CartContext";

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const perks = [
  { icon: Truck, label: "Free delivery" },
  { icon: RefreshCw, label: "30-day returns" },
  { icon: ShieldCheck, label: "Secure pay" },
];

export default function CartContent() {
  const { cartItems, loading, fetchCart } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 500;
  const total = subtotal - discount;
  const freeShippingThreshold = 500;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const deleteFromCart = async (pId: string) => {
    try {
      await http.delete(endpoints.cart.deleteFromCart(pId));
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (pId: string, action: string, quantity: number) => {
    if (action === "decrement" && quantity === 1) {
      return;
    }
    try {
      await http.patch(endpoints.cart.updateCart(pId), {
        action,
      });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) {
    return <CartSkeleton />;
  }

  if (cartItems.length <= 0) {
    return <EmptyCart />;
  }

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-[5.5rem] pb-24 sm:pb-28 lg:pb-32">
      <div className="absolute inset-0 bg-slate-50/70 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Compact page title — sits under navbar, no second hero */}
        <AnimatedSection direction="up">
          <div className="flex items-center justify-between gap-4 py-5 sm:py-6 mb-1 sm:mb-2">
            <div className="min-w-0 flex items-baseline gap-2.5 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Cart
              </h1>
              <span className="text-sm text-gray-400 tabular-nums">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors shrink-0"
            >
              <span className="hidden sm:inline">Continue shopping</span>
              <span className="sm:hidden">Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* ─── Items column ──────────────────────────────── */}
          <div className="lg:col-span-7 xl:col-span-8 min-w-0">
            {/* Unified list panel */}
            <AnimatedSection direction="up" delay={0.04}>
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
                {/* Free shipping nudge */}
                <div className="px-4 sm:px-6 lg:px-7 pt-5 sm:pt-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50/60 via-white to-white">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                      <Truck size={16} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-700 leading-snug">
                        {subtotal >= freeShippingThreshold ? (
                          <>
                            You&apos;ve unlocked{" "}
                            <span className="font-semibold text-indigo-600">
                              free shipping
                            </span>
                          </>
                        ) : (
                          <>
                            Add{" "}
                            <span className="font-semibold text-gray-900">
                              {formatPrice(freeShippingThreshold - subtotal)}
                            </span>{" "}
                            more for free shipping
                          </>
                        )}
                      </p>
                      <div className="mt-2.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                          style={{ width: `${shippingProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="group relative p-4 sm:p-5 lg:p-6 hover:bg-slate-50/50 transition-colors duration-200"
                    >
                      <div className="flex gap-3.5 sm:gap-5">
                        {/* Image */}
                        <Link
                          href={`/shop/${item.id}`}
                          className="relative shrink-0 w-[88px] h-[88px] sm:w-28 sm:h-28 lg:w-[120px] lg:h-[120px] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 ring-1 ring-black/[0.04]"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 88px, 120px"
                          />
                        </Link>

                        {/* Main content */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-start justify-between gap-2 sm:gap-4">
                            <div className="min-w-0">
                              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600">
                                {item.category}
                              </span>
                              <Link href={`/shop/${item.id}`}>
                                <h3 className="text-[15px] sm:text-base lg:text-lg font-semibold text-gray-900 leading-snug mt-0.5 line-clamp-2 hover:text-indigo-600 transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                            </div>

                            <button
                              onClick={()=>deleteFromCart(item.product_id)}
                              type="button"
                              aria-label="Remove item"
                              className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors -mt-0.5 -mr-1"
                            >
                              <Trash2 size={15} strokeWidth={1.75} />
                            </button>
                          </div>

                          {/* Unit price — desktop inline under variant */}
                          <p className="hidden sm:block mt-1.5 text-sm text-gray-500">
                            {formatPrice(item.price)}
                            {item.old_price != null && (
                              <span className="ml-2 text-gray-300 line-through">
                                {formatPrice(item.old_price)}
                              </span>
                            )}
                            <span className="text-gray-300"> each</span>
                          </p>

                          {/* Qty + line total */}
                          <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between gap-3">
                            <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white shadow-sm">
                              <button
                                onClick={()=>updateQuantity(item.product_id, "decrement", item.quantity)}
                                type="button"
                                aria-label="Decrease quantity"
                                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 active:bg-gray-50 rounded-l-xl transition-colors"
                              >
                                <Minus size={14} strokeWidth={2.25} />
                              </button>
                              <span className="w-8 sm:w-9 text-center text-sm font-semibold text-gray-900 tabular-nums select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={()=>updateQuantity(item.product_id, "increment", item.quantity)}
                                type="button"
                                aria-label="Increase quantity"
                                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 active:bg-gray-50 rounded-r-xl transition-colors"
                              >
                                <Plus size={14} strokeWidth={2.25} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-base sm:text-lg font-bold text-gray-900 tabular-nums leading-none">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              {item.old_price != null && (
                                <p className="mt-1 text-xs text-gray-300 line-through tabular-nums sm:hidden">
                                  {formatPrice(item.old_price * item.quantity)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Perks — mobile / tablet under items */}
            <AnimatedSection direction="up" delay={0.1} className="lg:hidden mt-5">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {perks.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 rounded-2xl bg-white border border-gray-100 px-2 py-3.5 text-center shadow-sm"
                  >
                    <Icon size={16} className="text-indigo-600" strokeWidth={1.75} />
                    <span className="text-[10px] sm:text-xs font-medium text-gray-600 leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* ─── Summary column (sticky on lg+) ────────────── */}
          <div className="lg:col-span-5 xl:col-span-4 min-w-0 lg:sticky lg:top-24 xl:top-28 lg:self-start">
            <AnimatedSection direction="up" delay={0.08}>
              <aside>
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_16px_48px_rgba(15,23,42,0.06)]">
                  {/* Accent wash */}
                  <div className="pointer-events-none absolute -top-24 -right-16 w-56 h-56 rounded-full bg-indigo-50 blur-3xl opacity-80" />

                  <div className="relative p-5 sm:p-6 lg:p-7">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      Order summary
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Shipping & taxes calculated at checkout.
                    </p>

                    {/* Promo */}
                    <div className="mt-5 sm:mt-6 flex gap-2">
                      <div className="relative flex-1 min-w-0">
                        <Tag
                          size={14}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                          type="text"
                          placeholder="Promo code"
                          readOnly
                          className="w-full bg-slate-50 border border-gray-200 hover:border-gray-300 focus:border-indigo-500 focus:bg-white rounded-xl pl-9 pr-3 py-2.5 sm:py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400"
                        />
                      </div>
                      <button
                        type="button"
                        className="shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-indigo-600 active:scale-[0.98] transition-all"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Breakdown */}
                    <dl className="mt-6 space-y-3 text-sm border-t border-gray-100 pt-5">
                      <div className="flex justify-between gap-4">
                        <dt className="text-gray-500">Subtotal</dt>
                        <dd className="font-medium text-gray-900 tabular-nums">
                          {formatPrice(subtotal)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-gray-500">Discount</dt>
                        <dd className="font-medium text-emerald-600 tabular-nums">
                          −{formatPrice(discount)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-gray-500 flex items-center gap-1.5">
                          <Truck size={13} className="text-gray-400" />
                          Shipping
                        </dt>
                        <dd className="font-medium text-emerald-600">Free</dd>
                      </div>
                    </dl>

                    <div className="mt-5 pt-5 border-t border-gray-100 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Incl. all discounts
                        </p>
                      </div>
                      <p className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight tabular-nums leading-none">
                        {formatPrice(total)}
                      </p>
                    </div>

                    <Link
                      href="/order-details"
                      className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_8px_24px_rgba(79,70,229,0.28)] transition-all duration-200"
                    >
                      Continue to order details
                      <ArrowRight size={16} />
                    </Link>

                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400">
                      <Lock size={12} className="shrink-0" />
                      <span>Secure payment · Free returns within 30 days</span>
                    </div>
                  </div>
                </div>

                {/* Perks — desktop under summary */}
                <div className="hidden lg:grid grid-cols-3 gap-2.5 mt-4">
                  {perks.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/80 border border-gray-100 px-2 py-3.5 text-center"
                    >
                      <Icon size={15} className="text-indigo-600" strokeWidth={1.75} />
                      <span className="text-[11px] font-medium text-gray-600">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200/80 bg-white/90 backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1440px] mx-auto flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-gray-400 leading-none mb-1">Total</p>
            <p className="text-lg font-bold text-gray-900 tabular-nums leading-none">
              {formatPrice(total)}
            </p>
          </div>
          <Link
            href="/order-details"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_6px_20px_rgba(79,70,229,0.3)] transition-all"
          >
            Continue
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
