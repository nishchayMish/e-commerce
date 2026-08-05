import type { Metadata } from "next";
import ShippingDetailsContent from "@/components/shipping-details/ShippingDetailsContent";

export const metadata: Metadata = {
  title: "Shipping details — AURUM",
  description: "Tell us where you'd like your order delivered.",
};

export default function ShippingDetailsPage() {
  return <ShippingDetailsContent />;
}
