"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
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

const cardClass =
  "rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";

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
    <section className="min-h-dvh bg-[#fafafa] pt-16 pb-24 lg:pb-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Compact page title — sits under navbar, no second hero */}
        <AnimatedSection direction="up">
          <div className="flex items-center justify-between gap-4 py-5 sm:py-6">
            <div className="min-w-0 flex items-baseline gap-2.5">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Cart
              </h1>
              <span className="text-[13px] text-gray-500 tabular-nums">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            </div>
            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 transition hover:decoration-gray-900"
            >
              <span className="hidden sm:inline">Continue shopping</span>
              <span className="sm:hidden">Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6 items-start">
          {/* ─── Items column ──────────────────────────────── */}
          <div className="lg:col-span-3 min-w-0">
            {/* Unified list panel */}
            <AnimatedSection direction="up" delay={0.04}>
              <div className={`${cardClass} overflow-hidden`}>
                {/* Free shipping nudge */}
                <div className="border-b border-gray-200 bg-[#fafafa] px-5 py-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <Truck
                      size={16}
                      strokeWidth={1.75}
                      className="mt-0.5 sm:mt-0 shrink-0 text-gray-400"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-500 leading-snug">
                        {subtotal >= freeShippingThreshold ? (
                          <>
                            You&apos;ve unlocked{" "}
                            <span className="font-medium text-gray-900">
                              free shipping
                            </span>
                          </>
                        ) : (
                          <>
                            Add{" "}
                            <span className="font-medium text-gray-900">
                              {formatPrice(freeShippingThreshold - subtotal)}
                            </span>{" "}
                            more for free shipping
                          </>
                        )}
                      </p>
                      <div className="mt-2 h-1 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gray-900 transition-all duration-500"
                          style={{ width: `${shippingProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="group relative px-5 py-4 transition-colors duration-200 hover:bg-[#fafafa]"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        <Link
                          href={`/shop/${item.id}`}
                          className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 bg-[#fafafa]"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 80px, 96px"
                          />
                        </Link>

                        {/* Main content */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">
                                {item.category}
                              </span>
                              <Link href={`/shop/${item.id}`}>
                                <h3 className="mt-0.5 text-sm font-medium text-gray-900 leading-snug line-clamp-2 transition-colors hover:text-gray-500">
                                  {item.name}
                                </h3>
                              </Link>
                            </div>

                            <button
                              onClick={()=>deleteFromCart(item.product_id)}
                              type="button"
                              aria-label="Remove item"
                              className="-mt-1 -mr-1 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 transition-colors hover:text-red-600 hover:bg-gray-50"
                            >
                              <Trash2 size={15} strokeWidth={1.75} />
                            </button>
                          </div>

                          {/* Unit price — desktop inline under variant */}
                          <p className="hidden sm:block mt-1 text-[13px] text-gray-500">
                            {formatPrice(item.price)}
                            {item.old_price != null && (
                              <span className="ml-2 text-gray-400 line-through">
                                {formatPrice(item.old_price)}
                              </span>
                            )}
                            <span className="text-gray-400"> each</span>
                          </p>

                          {/* Qty + line total */}
                          <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                            <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
                              <button
                                onClick={()=>updateQuantity(item.product_id, "decrement", item.quantity)}
                                type="button"
                                aria-label="Decrease quantity"
                                className="w-9 h-9 flex items-center justify-center rounded-l-lg text-gray-500 transition-colors hover:text-gray-900 hover:bg-gray-50"
                              >
                                <Minus size={14} strokeWidth={2} />
                              </button>
                              <span className="w-8 text-center text-[13px] font-medium text-gray-900 tabular-nums select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={()=>updateQuantity(item.product_id, "increment", item.quantity)}
                                type="button"
                                aria-label="Increase quantity"
                                className="w-9 h-9 flex items-center justify-center rounded-r-lg text-gray-500 transition-colors hover:text-gray-900 hover:bg-gray-50"
                              >
                                <Plus size={14} strokeWidth={2} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-[15px] font-semibold text-gray-900 tabular-nums leading-none">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              {item.old_price != null && (
                                <p className="mt-1 text-xs text-gray-400 line-through tabular-nums sm:hidden">
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
            <AnimatedSection direction="up" delay={0.1} className="lg:hidden mt-3">
              <div className="grid grid-cols-3 gap-2">
                {perks.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-3 text-center"
                  >
                    <Icon size={14} className="text-gray-400" strokeWidth={1.75} />
                    <span className="text-xs font-medium text-gray-600 leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* ─── Summary column (sticky on lg+) ────────────── */}
          <div className="lg:col-span-2 min-w-0 lg:sticky lg:top-24 lg:self-start">
            <AnimatedSection direction="up" delay={0.08}>
              <aside className="space-y-3">
                <div className={`${cardClass} overflow-hidden`}>
                  <div className="px-5 pt-5">
                    <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                      Order summary
                    </h2>
                    <p className="mt-1 text-[13px] text-gray-500">
                      Shipping & taxes calculated at checkout.
                    </p>
                  </div>

                  {/* Breakdown */}
                  <dl className="mx-5 mt-5 space-y-2.5 border-t border-gray-200 pt-4 text-[13px]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Subtotal</dt>
                      <dd className="font-medium text-gray-900 tabular-nums">
                        {formatPrice(subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Discount</dt>
                      <dd className="font-medium text-gray-900 tabular-nums">
                        −{formatPrice(discount)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500 flex items-center gap-1.5">
                        <Truck size={13} className="text-gray-400" />
                        Shipping
                      </dt>
                      <dd className="font-medium text-gray-900">Free</dd>
                    </div>
                  </dl>

                  <div className="mx-5 mt-4 flex items-end justify-between gap-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-[13px] font-medium text-gray-900">Total</p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Incl. all discounts
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-gray-900 tracking-tight tabular-nums leading-none">
                      {formatPrice(total)}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-gray-200 bg-[#fafafa] px-5 py-4">
                    <Link
                      href="/shipping-details"
                      className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
                    >
                      Continue to shipping details
                      <ArrowRight size={14} />
                    </Link>

                    <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                      <Lock size={12} className="shrink-0" />
                      <span>Secure payment · Free returns within 30 days</span>
                    </div>
                  </div>
                </div>

                {/* Perks — desktop under summary */}
                <div className="hidden lg:grid grid-cols-3 gap-2">
                  {perks.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-3 text-center"
                    >
                      <Icon size={14} className="text-gray-400" strokeWidth={1.75} />
                      <span className="text-xs font-medium text-gray-600">
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
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 leading-none mb-1">Total</p>
            <p className="text-base font-semibold text-gray-900 tabular-nums leading-none">
              {formatPrice(total)}
            </p>
          </div>
          <Link
            href="/shipping-details"
            className="shrink-0 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Continue
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
