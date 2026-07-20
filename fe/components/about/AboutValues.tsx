import { Compass, Heart, Leaf, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const values = [
  {
    icon: Compass,
    title: "Curated, not cluttered",
    description:
      "We edit ruthlessly. Only pieces that earn their place make it into the AURUM collection.",
  },
  {
    icon: Sparkles,
    title: "Quality without compromise",
    description:
      "From materials to finish, every item is evaluated for longevity, authenticity, and feel.",
  },
  {
    icon: Heart,
    title: "Human-first service",
    description:
      "Real support, thoughtful packaging, and returns that respect your time — always.",
  },
  {
    icon: Leaf,
    title: "Mindful by design",
    description:
      "We partner with brands that care about craft, people, and a lighter footprint.",
  },
];

export default function AboutValues() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <AnimatedSection direction="up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              What Guides Us
            </span>
            <h2 className="text-3xl sm:text-[42px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              Our principles
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg">
              These beliefs shape every collection we launch and every
              interaction we have with you.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <AnimatedSection
                key={value.title}
                direction="up"
                delay={idx * 0.06}
                className="group bg-white rounded-2xl p-7 sm:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-colors duration-300 mb-5">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2.5 leading-snug">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
