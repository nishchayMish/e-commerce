import type { Metadata } from "next";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "Cart — AURUM",
  description: "Review your AURUM shopping cart and proceed to checkout.",
};

export default function CartPage() {
  return <CartContent />;
}
