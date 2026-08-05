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
    <section className="border-y border-gray-200 bg-[#fafafa] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <AnimatedSection direction="up">
            <span className="block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
              What Guides Us
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
              Our principles
            </h2>
            <p className="mt-3 max-w-lg text-sm text-gray-500 leading-relaxed">
              These beliefs shape every collection we launch and every
              interaction we have with you.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <AnimatedSection
                key={value.title}
                direction="up"
                delay={idx * 0.06}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-[#fafafa] text-gray-500 transition-colors duration-200 group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white">
                  <Icon size={16} strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-medium leading-snug text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
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
