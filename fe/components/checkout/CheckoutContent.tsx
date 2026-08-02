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
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useEffect, useState } from "react";
import http from "@/lib/http";
import { redirect, useRouter } from "next/navigation";

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

const steps = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
];

export default function CheckoutContent() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);

  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 500;
  const shipping = subtotal >= 500 ? 0 : 99;
  const total = subtotal - discount + shipping;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await http.get("/cart");
        setCartItems(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isShippingValid =
    shippingForm.fullName &&
    shippingForm.email &&
    shippingForm.phone &&
    shippingForm.address &&
    shippingForm.city &&
    shippingForm.state &&
    shippingForm.pincode;

  if (loading) {
    return (
      <section className="relative pt-20 sm:pt-24 lg:pt-[5.5rem] pb-24 sm:pb-28 lg:pb-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading checkout…</p>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length <= 0) {
    redirect("/shop")
  }

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-[5.5rem] pb-24 sm:pb-28 lg:pb-32">
      <div className="absolute inset-0 bg-slate-50/70 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <AnimatedSection direction="up">
          <div className="flex items-center justify-between gap-4 py-5 sm:py-6 mb-1 sm:mb-2">
            <div className="min-w-0 flex items-center gap-3">
              <Link
                href="/cart"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 transition-all"
              >
                <ArrowLeft size={18} />
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Checkout
              </h1>
            </div>
          </div>
        </AnimatedSection>

        {/* Steps indicator */}
        <AnimatedSection direction="up" delay={0.03}>
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-0">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => {
                      if (step.id < currentStep) setCurrentStep(step.id);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      step.id === currentStep
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : step.id < currentStep
                        ? "bg-emerald-50 text-emerald-700 cursor-pointer hover:bg-emerald-100"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.id < currentStep
                          ? "bg-emerald-500 text-white"
                          : step.id === currentStep
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step.id < currentStep ? <Check size={13} strokeWidth={3} /> : step.id}
                    </span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-8 sm:w-16 h-[2px] mx-1 sm:mx-2 rounded-full transition-colors ${
                        step.id < currentStep ? "bg-emerald-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* Left — Form area */}
          <div className="lg:col-span-7 xl:col-span-8 min-w-0">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <AnimatedSection direction="up" delay={0.05}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
                  <div className="px-5 sm:px-7 pt-6 pb-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <MapPin size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Shipping address</h2>
                      <p className="text-xs text-gray-400">Where should we deliver your order?</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Full name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingForm.fullName}
                        onChange={handleShippingChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingForm.email}
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingForm.phone}
                        onChange={handleShippingChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingForm.address}
                        onChange={handleShippingChange}
                        placeholder="123, MG Road, Sector 5"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingForm.city}
                        onChange={handleShippingChange}
                        placeholder="New Delhi"
                        className="w-full bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">State</label>
                      <div className="relative">
                        <select
                          name="state"
                          value={shippingForm.state}
                          onChange={handleShippingChange}
                          className="w-full appearance-none bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors"
                        >
                          <option value="">Select state</option>
                          {["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={shippingForm.pincode}
                        onChange={handleShippingChange}
                        placeholder="110001"
                        maxLength={6}
                        className="w-full bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="px-5 sm:px-7 pb-6 pt-2">
                    <button
                      onClick={() => isShippingValid && setCurrentStep(2)}
                      disabled={!isShippingValid}
                      className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_8px_24px_rgba(79,70,229,0.28)] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Continue to payment
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <AnimatedSection direction="up" delay={0.05}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
                  <div className="px-5 sm:px-7 pt-6 pb-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <CreditCard size={18} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Payment method</h2>
                      <p className="text-xs text-gray-400">Choose how you&apos;d like to pay</p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7 pt-5 space-y-3">
                    {([
                      { id: "card" as const, label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
                      { id: "upi" as const, label: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: ShieldCheck },
                      { id: "cod" as const, label: "Cash on Delivery", desc: "Pay when you receive", icon: Truck },
                    ]).map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          paymentMethod === method.id
                            ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                            : "border-gray-100 bg-slate-50/50 hover:border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            paymentMethod === method.id
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
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            paymentMethod === method.id
                              ? "border-indigo-500 bg-indigo-500"
                              : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === method.id && (
                            <Check size={12} strokeWidth={3} className="text-white" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-5 sm:px-7 pb-6 pt-2">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_8px_24px_rgba(79,70,229,0.28)] transition-all duration-200"
                    >
                      Review order
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <AnimatedSection direction="up" delay={0.05}>
                <div className="space-y-5">
                  {/* Shipping summary */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] p-5 sm:p-7">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <MapPin size={15} className="text-indigo-600" />
                        Delivering to
                      </h3>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        Change
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{shippingForm.fullName}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {shippingForm.address}, {shippingForm.city}, {shippingForm.state} — {shippingForm.pincode}
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">{shippingForm.phone} · {shippingForm.email}</p>
                  </div>

                  {/* Payment summary */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] p-5 sm:p-7">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <CreditCard size={15} className="text-indigo-600" />
                        Payment
                      </h3>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        Change
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 font-medium capitalize">
                      {paymentMethod === "card" ? "Credit / Debit Card" : paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
                    <div className="px-5 sm:px-7 pt-5 pb-3">
                      <h3 className="text-sm font-bold text-gray-900">
                        Items ({cartItems.length})
                      </h3>
                    </div>
                    <ul className="divide-y divide-gray-100">
                      {cartItems.map((item) => (
                        <li key={item.id} className="px-5 sm:px-7 py-4 flex items-center gap-4">
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 ring-1 ring-black/[0.04]">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 tabular-nums shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Place order button */}
                  <button
                    onClick={() => {
                      router.push("/shop");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-[0_8px_24px_rgba(79,70,229,0.28)] transition-all duration-200"
                  >
                    <Lock size={15} />
                    Place order · {formatPrice(total)}
                  </button>
                  <p className="text-center text-[11px] text-gray-400">
                    By placing this order you agree to our Terms & Conditions
                  </p>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Right — Order summary (sticky) */}
          <div className="lg:col-span-5 xl:col-span-4 min-w-0 lg:sticky lg:top-24 xl:top-28 lg:self-start">
            <AnimatedSection direction="up" delay={0.08}>
              <aside>
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_16px_48px_rgba(15,23,42,0.06)]">
                  <div className="pointer-events-none absolute -top-24 -right-16 w-56 h-56 rounded-full bg-indigo-50 blur-3xl opacity-80" />

                  <div className="relative p-5 sm:p-6 lg:p-7">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      Order summary
                    </h2>

                    {/* Compact item list */}
                    <div className="mt-5 space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-50 shrink-0 ring-1 ring-black/[0.04]">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="44px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400">×{item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 tabular-nums shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <dl className="mt-5 space-y-3 text-sm border-t border-gray-100 pt-5">
                      <div className="flex justify-between gap-4">
                        <dt className="text-gray-500">Subtotal</dt>
                        <dd className="font-medium text-gray-900 tabular-nums">{formatPrice(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-gray-500">Discount</dt>
                        <dd className="font-medium text-emerald-600 tabular-nums">−{formatPrice(discount)}</dd>
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

                    <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                      <Lock size={12} className="shrink-0" />
                      <span>Secure checkout · Free returns within 30 days</span>
                    </div>
                  </div>
                </div>
              </aside>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
