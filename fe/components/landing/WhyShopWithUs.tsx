"use client";

import { Truck, ShieldCheck, RefreshCw, Headphones, Award, Zap } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const features = [
  {
    id: "1",
    icon: Truck,
    title: "Complimentary Delivery",
    description: "Enjoy complimentary premium shipping on all orders over $150, worldwide.",
  },
  {
    id: "2",
    icon: ShieldCheck,
    title: "Secure Verification",
    description: "Fully encrypted banking transactions and verified merchant credentials.",
  },
  {
    id: "3",
    icon: RefreshCw,
    title: "Simplicity In Returns",
    description: "Should your choice not suit, enjoy a complimentary 30-day effortless return window.",
  },
  {
    id: "4",
    icon: Headphones,
    title: "Conscious Support",
    description: "Our dedicated support curators are at your service 24 hours a day, 7 days a week.",
  },
  {
    id: "5",
    icon: Award,
    title: "Premium Integrity",
    description: "Each item in our catalog undergoes rigorous evaluation for authenticity and quality.",
  },
  {
    id: "6",
    icon: Zap,
    title: "Priority Fulfillment",
    description: "Fast-tracked orders dispatch same-day, arriving securely wrapped on your doorstep.",
  },
];

export default function WhyShopWithUs() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-8 sm:mb-10">
          <AnimatedSection direction="up">
            <span className="eyebrow mb-2 block">
              Our Values
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
              Why Shop With Us
            </h2>
            <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed">
              We redefine modern luxury retail. Driven by a commitment to perfection, each order is handled with discrete care.
            </p>
          </AnimatedSection>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection
                key={feature.id}
                direction="up"
                delay={idx * 0.04}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <div>
                  {/* Icon wrapper */}
                  <div className="w-9 h-9 rounded-lg bg-[#fafafa] border border-gray-200 flex items-center justify-center text-gray-500 transition-colors duration-200 group-hover:text-gray-900 mb-4">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1.5">
                    {feature.title}
                  </h3>

                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
