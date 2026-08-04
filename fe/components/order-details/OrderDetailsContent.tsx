"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  CreditCard,
  MapPin,
  ChevronDown,
  Lock,
  Check,
  User,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useEffect, useState } from "react";
import http from "@/lib/http";
import { useRouter } from "next/navigation";
import { endpoints } from "@/lib/endpoints";

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  name: string;
  category: string;
  price: number;
  old_price: number;
  description: string;
  image: string;
}

const paymentMethods = [
  {
    id: "card" as const,
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "upi" as const,
    label: "UPI",
    desc: "Google Pay, PhonePe, Paytm",
    icon: ShieldCheck,
  },
  {
    id: "cod" as const,
    label: "Cash on Delivery",
    desc: "Pay when you receive",
    icon: Truck,
  },
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const inputClass =
  "w-full bg-slate-50/80 border border-gray-200/90 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300";

export default function OrderDetailsContent() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("upi");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 500;
  const shipping = subtotal >= 500 ? 0 : 99;
  const total = subtotal - discount + shipping;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await http.get(endpoints.orders.cartItems);
        setCartItems(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (!loading && cartItems.length <= 0) {
      router.replace("/shop");
    }
  }, [loading, cartItems.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.fullName &&
    form.email &&
    form.phone &&
    form.address &&
    form.city &&
    form.state &&
    form.pincode;

  const handlePlaceOrder = () => {
    if (!isFormValid) return;
    router.push("/shop");
  };

  if (loading || cartItems.length <= 0) {
    return (
      <section className="relative pt-20 sm:pt-24 lg:pt-[5.5rem] pb-24 sm:pb-28 lg:pb-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading order details…</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-10 sm:pt-12 lg:pt-14 pb-28 sm:pb-32 lg:pb-36">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-white pointer-events-none" />
      <div className="absolute top-20 right-0 w-[420px] h-[420px] bg-indigo-50/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-[320px] h-[320px] bg-slate-100/80 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection direction="up">
          <div className="flex items-center gap-3 py-5 sm:py-6 mb-2 sm:mb-4">
            <Link
              href="/cart"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 transition-all"
              aria-label="Back to cart"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Order details
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Confirm delivery & payment before placing your order
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* Left — all details on one page */}
          <div className="lg:col-span-7 xl:col-span-8 min-w-0 space-y-5 sm:space-y-6">
            {/* Contact */}
            <AnimatedSection direction="up" delay={0.04}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 sm:px-7 pt-6 pb-1 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <User size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Contact</h2>
                    <p className="text-xs text-gray-400">Order updates go here</p>
                  </div>
                </div>

                <div className="p-5 sm:p-7 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Shipping */}
            <AnimatedSection direction="up" delay={0.07}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 sm:px-7 pt-6 pb-1 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <MapPin size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Shipping address
                    </h2>
                    <p className="text-xs text-gray-400">Where should we deliver?</p>
                  </div>
                </div>

                <div className="p-5 sm:p-7 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123, MG Road, Sector 5"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">City</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New Delhi"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">State</label>
                    <div className="relative">
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select state</option>
                        {states.map((s) => (
                          <option key={s} value={s}>
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
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="110001"
                      maxLength={6}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Payment */}
            <AnimatedSection direction="up" delay={0.1}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="px-5 sm:px-7 pt-6 pb-1 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <CreditCard size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Payment method
                    </h2>
                    <p className="text-xs text-gray-400">How would you like to pay?</p>
                  </div>
                </div>

                <div className="p-5 sm:p-7 pt-4 space-y-2.5">
                  {paymentMethods.map((method) => {
                    const selected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-3.5 sm:p-4 rounded-xl border-2 transition-all text-left ${
                          selected
                            ? "border-indigo-500 bg-indigo-50/40 shadow-sm"
                            : "border-gray-100 bg-slate-50/40 hover:border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            selected
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <method.icon size={18} strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900">{method.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{method.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            selected ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                          }`}
                        >
                          {selected && <Check size={12} strokeWidth={3} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — Order summary */}
          <div className="lg:col-span-5 xl:col-span-4 min-w-0 lg:sticky lg:top-24 xl:top-28 lg:self-start">
            <AnimatedSection direction="up" delay={0.08}>
              <aside>
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_16px_48px_rgba(15,23,42,0.06)]">
                  <div className="pointer-events-none absolute -top-24 -right-16 w-56 h-56 rounded-full bg-indigo-50 blur-3xl opacity-80" />

                  <div className="relative p-5 sm:p-6 lg:p-7">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      Order summary
                    </h2>

                    <div className="mt-5 space-y-3 max-h-52 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-50 shrink-0 ring-1 ring-black/[0.04]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">{formatPrice(item.price)}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 tabular-nums shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <dl className="mt-5 space-y-3 text-sm border-t border-gray-100 pt-5">
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
                        <dd className="font-medium text-emerald-600">
                          {shipping === 0 ? "Free" : formatPrice(shipping)}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 pt-5 border-t border-gray-100 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Incl. all discounts</p>
                      </div>
                      <p className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight tabular-nums leading-none">
                        {formatPrice(total)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={!isFormValid}
                      className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_8px_24px_rgba(79,70,229,0.28)] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none"
                    >
                      <Lock size={15} />
                      Place order · {formatPrice(total)}
                    </button>

                    <p className="mt-3 text-center text-[11px] text-gray-400 leading-relaxed">
                      By placing this order you agree to our Terms & Conditions
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                      <Lock size={12} className="shrink-0" />
                      <span>Secure payment · Free returns within 30 days</span>
                    </div>
                  </div>
                </div>
              </aside>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Mobile sticky place-order bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-100 bg-white/95 backdrop-blur-md px-5 py-3 safe-area-pb">
        <div className="flex items-center gap-4 max-w-[1440px] mx-auto">
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400">Total</p>
            <p className="text-lg font-bold text-gray-900 tabular-nums leading-tight">
              {formatPrice(total)}
            </p>
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={!isFormValid}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            <Lock size={14} />
            Place order
          </button>
        </div>
      </div>
    </section>
  );
}
