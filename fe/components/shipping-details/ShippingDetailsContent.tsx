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
  "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5";

const labelClass = "mb-1.5 block text-[13px] font-medium text-gray-600";

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
      <section className="min-h-dvh flex items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading shipping details…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection direction="up">
          <div className="flex items-center gap-3 py-5 sm:py-6">
            <Link
              href="/cart"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 transition"
              aria-label="Back to cart"
            >
              <ArrowLeft size={17} />
            </Link>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Shipping details
              </h1>
              <p className="text-[13px] text-gray-500 mt-0.5">
                Where should we deliver your order?
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.06}>
          <form
            onSubmit={handleSubmit}
            className="mt-3 bg-white rounded-xl border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            <div className="px-5 sm:px-8 pt-6 sm:pt-7 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-gray-200 bg-[#fafafa] flex items-center justify-center text-gray-500">
                <MapPin size={16} strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 tracking-tight">Delivery address</h2>
                <p className="text-[13px] text-gray-500">We&apos;ll send order updates on this number</p>
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
                    className={`${inputClass} appearance-none pr-9 ${
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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

            <div className="hidden sm:flex items-center justify-between gap-4 border-t border-gray-200 bg-[#fafafa] px-5 sm:px-8 py-4">
              <p className="flex items-center gap-1.5 text-[13px] text-gray-500">
                <Lock size={13} className="shrink-0" />
                Your details are encrypted and never shared
              </p>
              <button
                type="submit"
                disabled={!isValid}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-4 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
              >
                Proceed to checkout
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </AnimatedSection>
      </div>

      {/* Mobile sticky action bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
        >
          Proceed to checkout
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}
