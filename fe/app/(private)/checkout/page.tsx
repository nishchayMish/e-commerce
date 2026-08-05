import type { Metadata } from "next";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout — AURUM",
  description: "Choose a payment method and place your order.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
