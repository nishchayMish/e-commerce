import type { Metadata } from "next";
import OrderDetailsContent from "@/components/order-details/OrderDetailsContent";

export const metadata: Metadata = {
  title: "Order details — AURUM",
  description: "Confirm your delivery and payment details before placing your order.",
};

export default function OrderDetailsPage() {
  return <OrderDetailsContent />;
}
