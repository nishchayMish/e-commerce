"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  fetchUserAddress,
  formatPrice,
  type PaymentMethod,
  type ShippingDetails,
} from "@/lib/checkout";
import toast from "react-hot-toast";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

const paymentMethods = [
  {
    id: "CARD" as const,
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "UPI" as const,
    label: "UPI",
    desc: "Google Pay, PhonePe, Paytm",
    icon: ShieldCheck,
  },
  {
    id: "COD" as const,
    label: "Cash on Delivery",
    desc: "Pay when you receive",
    icon: Truck,
  },
];

const perks = [
  { icon: Truck, label: "Free delivery" },
  { icon: RefreshCw, label: "30-day returns" },
  { icon: ShieldCheck, label: "Secure pay" },
];

const cardClass =
  "rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";

const inputClass =
  "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5";

const labelClass = "mb-1.5 block text-[13px] font-medium text-gray-600";

export default function CheckoutContent() {
  const router = useRouter();
  const { cartItems, loading } = useCart();

  const [shipping, setShipping] = useState<ShippingDetails | null>(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 500;
  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    if (!loading && cartItems.length <= 0) {
      router.replace("/shop");
    }
  }, [loading, cartItems.length, router]);

  const orderId = localStorage.getItem("order_id")

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const address = await fetchUserAddress();
        if (cancelled) return;
        if (!address) {
          router.replace("/shipping-details");
          return;
        }
        setShipping(address);
      } catch {
        if (!cancelled) router.replace("/shipping-details");
      } finally {
        if (!cancelled) setAddressLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const checkout = async() => {
    if(!orderId){
      toast.error("order_id is missing");
      return;
    }
    if(!paymentMethod){
      toast.error("paymentMethod is missing");
      return;
    }
    try {
      const payload = {
        paymentMethod,
        orderId
      }
      const res = await http.post(endpoints.orders.checkout, payload);
      const order = res.data.order;

      if (paymentMethod === "COD") {
        toast.success("Order placed successfully");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Number(order.total_amount) * 100,
        currency: "INR",
        name: "Auram",
        description: "Order Payment",
        order_id: order.razorpay_order_id,

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: false,
          emi: false,
          paylater: false,
        },
        
        handler: async function(response: any){
          console.log("Payment success: ", response)
          toast.success("Payment Sucessful");
        },

        prefill: {
          name: order.contact_name,
          contact: order.contact_phone
        },

        theme: {
          color: "#3399c"
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("checkout failed")
      console.log(error)
    }
  }

  if (loading || addressLoading || !shipping || cartItems.length <= 0) {
    return (
      <section className="min-h-dvh flex items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Preparing checkout…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-dvh bg-[#fafafa] pb-24 lg:pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-2.5 py-5 sm:py-6">
          <Link
            href="/shipping-details?edit=1"
            className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-gray-400 border border-transparent transition hover:text-gray-900 hover:border-gray-200 hover:bg-white"
            aria-label="Back to shipping details"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="min-w-0">
            <h1 className="text-[15px] font-semibold text-gray-900 tracking-tight">Checkout</h1>
            <p className="text-[13px] text-gray-500">Choose how you&apos;d like to pay</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6 items-start">
          {/* ─── Payment column ─────────────────────────────── */}
          <div className="lg:col-span-3 min-w-0 space-y-5">
            {/* Deliver to */}
            <div className={`${cardClass} px-5 py-4 flex items-start gap-3`}>
              <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-gray-900">
                  {shipping.fullName} · {shipping.phone}
                </p>
                <p className="mt-0.5 text-[13px] text-gray-500 leading-relaxed">
                  {shipping.addressLine}, {shipping.city}, {shipping.state} — {shipping.pincode}
                </p>
              </div>
              <Link
                href="/shipping-details?edit=1"
                className="shrink-0 text-[13px] font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 transition hover:decoration-gray-900"
              >
                Change
              </Link>
            </div>

            {/* Payment methods */}
            <div className={`${cardClass} overflow-hidden`}>
              <div className="px-5 pt-5">
                <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                  Payment method
                </h2>
                <p className="mt-1 text-[13px] text-gray-500">
                  All transactions are secure and encrypted.
                </p>
              </div>

              <div className="p-5 space-y-2">
                {paymentMethods.map((method) => {
                  const selected = paymentMethod === method.id;
                  return (
                    <div key={method.id}>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                          selected
                            ? "border-gray-900 bg-gray-50/70"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <method.icon
                          size={16}
                          strokeWidth={1.75}
                          className={selected ? "text-gray-900" : "text-gray-400"}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-medium text-gray-900">{method.label}</p>
                          <p className="text-[13px] text-gray-500">{method.desc}</p>
                        </div>
                        <span
                          className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition ${
                            selected ? "border-gray-900 bg-gray-900" : "border-gray-300 bg-white"
                          }`}
                        >
                          {selected && <Check size={11} strokeWidth={3} className="text-white" />}
                        </span>
                      </button>

                      {selected && method.id === "CARD" && (
                        <div className="mt-2 grid grid-cols-2 gap-3 rounded-lg border border-gray-200 bg-[#fafafa] p-4">
                          <div className="col-span-2">
                            <label className={labelClass}>Card number</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="1234 5678 9012 3456"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Expiry</label>
                            <input type="text" placeholder="MM / YY" className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>CVV</label>
                            <input
                              type="password"
                              inputMode="numeric"
                              maxLength={4}
                              placeholder="•••"
                              className={inputClass}
                            />
                          </div>
                        </div>
                      )}

                      {selected && method.id === "UPI" && (
                        <div className="mt-2 rounded-lg border border-gray-200 bg-[#fafafa] p-4">
                          <label className={labelClass}>UPI ID</label>
                          <input type="text" placeholder="yourname@upi" className={inputClass} />
                        </div>
                      )}

                      {selected && method.id === "COD" && (
                        <p className="mt-2 rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-3 text-[13px] text-gray-500 leading-relaxed">
                          Keep the exact amount ready. Our delivery partner also accepts UPI at
                          your doorstep.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Summary column ─────────────────────────────── */}
          <aside className="lg:col-span-2 min-w-0 lg:sticky lg:top-6 lg:self-start space-y-3">
            <div className={`${cardClass} overflow-hidden`}>
              <div className="px-5 pt-5">
                <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                  Order summary
                </h2>
              </div>

              {/* Promo */}
              <div className="px-5 pt-4 flex gap-2">
                <div className="relative flex-1 min-w-0">
                  <Tag
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input type="text" placeholder="Promo code" className={`${inputClass} pl-9`} />
                </div>
                <button
                  type="button"
                  className="h-10 shrink-0 rounded-lg border border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-900 transition hover:bg-gray-50"
                >
                  Apply
                </button>
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
                  <dt className="text-gray-500">Shipping</dt>
                  <dd className="font-medium text-gray-900">Free</dd>
                </div>
              </dl>

              <div className="mx-5 mt-4 flex items-center justify-between gap-4 border-t border-gray-200 pt-4">
                <span className="text-[13px] font-medium text-gray-900">Total</span>
                <span className="text-xl font-semibold text-gray-900 tracking-tight tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="mt-5 border-t border-gray-200 bg-[#fafafa] px-5 py-4">
                <button
                  onClick={checkout}
                  type="button"
                  className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Lock size={13} />
                    Place order · {formatPrice(total)}
                </button>
                <p className="mt-2.5 text-center text-xs text-gray-400">
                  By placing this order you agree to our Terms &amp; Conditions
                </p>
              </div>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-2">
              {perks.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-3 text-center"
                >
                  <Icon size={14} className="text-gray-400" strokeWidth={1.75} />
                  <span className="text-xs font-medium text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky place-order bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 leading-none mb-1">Total</p>
            <p className="text-base font-semibold text-gray-900 tabular-nums leading-none">
              {formatPrice(total)}
            </p>
          </div>
          <button
            onClick={checkout}
            type="button"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            <Lock size={13} />
            Place order
          </button>
        </div>
      </div>
    </section>
  );
}
