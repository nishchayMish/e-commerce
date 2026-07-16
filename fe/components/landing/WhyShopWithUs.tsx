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
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <AnimatedSection direction="up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-[42px] lg:text-[48px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              Why Shop With Us
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed">
              We redefine modern luxury retail. Driven by a commitment to perfection, each order is handled with discrete care.
            </p>
          </AnimatedSection>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection
                key={feature.id}
                direction="up"
                delay={idx * 0.06}
                className="group relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-350 flex flex-col justify-between hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
              >
                <div>
                  {/* Icon wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-gray-800 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm mb-6">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2.5">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
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
