import type { Metadata } from "next";
import { Suspense } from "react";
import ShippingDetailsContent from "@/components/shipping-details/ShippingDetailsContent";

export const metadata: Metadata = {
  title: "Shipping details — AURUM",
  description: "Tell us where you'd like your order delivered.",
};

export default function ShippingDetailsPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-dvh flex items-center justify-center bg-[#fafafa]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading shipping details…</p>
          </div>
        </section>
      }
    >
      <ShippingDetailsContent />
    </Suspense>
  );
}
