"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Lock, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useCart } from "@/context/CartContext";
import {
  emptyShippingDetails,
  indianStates,
  isShippingDetailsComplete,
  readShippingDetails,
  saveShippingDetails,
  type ShippingDetails,
} from "@/lib/checkout";

const inputClass =
  "w-full bg-slate-50/80 border border-gray-200/90 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300";

const labelClass = "block text-xs font-medium text-gray-500 mb-1.5";

export default function ShippingDetailsContent() {
  const router = useRouter();
  const { cartItems, loading } = useCart();
  // Cart context is still loading on the first paint, so the form is never
  // rendered before hydration and reading storage here stays mismatch-free.
  const [form, setForm] = useState<ShippingDetails>(() =>
    typeof window === "undefined"
      ? emptyShippingDetails
      : readShippingDetails() ?? emptyShippingDetails
  );

  useEffect(() => {
    if (!loading && cartItems.length <= 0) {
      router.replace("/shop");
    }
  }, [loading, cartItems.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const next = name === "phone" || name === "pincode" ? value.replace(/\D/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: next }));
  };

  const isValid = isShippingDetailsComplete(form);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    saveShippingDetails(form);
    router.push("/checkout");
  };

  if (loading || cartItems.length <= 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50/70">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading shipping details…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen pt-10 sm:pt-12 lg:pt-14 pb-28 sm:pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-white pointer-events-none" />
      <div className="absolute top-16 right-0 w-[420px] h-[420px] bg-indigo-50/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-24 left-0 w-[320px] h-[320px] bg-slate-100/80 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
        <AnimatedSection direction="up">
          <div className="flex items-center gap-3 py-5 sm:py-6">
            <Link
              href="/cart"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 transition-all"
              aria-label="Back to cart"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Shipping details
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Where should we deliver your order?
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.06}>
          <form
            onSubmit={handleSubmit}
            className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_16px_48px_rgba(15,23,42,0.05)] overflow-hidden"
          >
            <div className="px-5 sm:px-8 pt-6 sm:pt-7 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <MapPin size={18} strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Delivery address</h2>
                <p className="text-xs text-gray-400">We&apos;ll send order updates on this number</p>
              </div>
            </div>

            <div className="p-5 sm:p-8 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelClass}>
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="addressLine" className={labelClass}>
                  Address
                </label>
                <input
                  id="addressLine"
                  type="text"
                  name="addressLine"
                  value={form.addressLine}
                  onChange={handleChange}
                  placeholder="123, MG Road, Sector 5"
                  autoComplete="street-address"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="New Delhi"
                  autoComplete="address-level2"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="state" className={labelClass}>
                  State
                </label>
                <div className="relative">
                  <select
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none pr-10 ${
                      form.state ? "" : "text-gray-400"
                    }`}
                  >
                    <option value="">Select state</option>
                    {indianStates.map((s) => (
                      <option key={s} value={s} className="text-gray-900">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="pincode" className={labelClass}>
                  Pincode
                </label>
                <input
                  id="pincode"
                  type="text"
                  inputMode="numeric"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="110001"
                  maxLength={6}
                  autoComplete="postal-code"
                  className={`${inputClass} sm:max-w-[220px]`}
                />
              </div>
            </div>

            <div className="px-5 sm:px-8 pb-6 sm:pb-8">
              <button
                type="submit"
                disabled={!isValid}
                className="hidden sm:flex w-full items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_8px_24px_rgba(79,70,229,0.28)] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none"
              >
                Proceed to checkout
                <ArrowRight size={16} />
              </button>

              <div className="mt-4 hidden sm:flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <Lock size={12} className="shrink-0" />
                <span>Your details are encrypted and never shared</span>
              </div>
            </div>
          </form>
        </AnimatedSection>
      </div>

      {/* Mobile sticky action bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200/80 bg-white/90 backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          Proceed to checkout
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
