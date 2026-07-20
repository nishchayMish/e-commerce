import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

const milestones = [
  { value: "2019", label: "Founded" },
  { value: "120+", label: "Premium Brands" },
  { value: "50K+", label: "Customers" },
  { value: "4.9★", label: "Avg. Rating" },
];

export default function AboutStory() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection direction="up">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-[2rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=960&q=85"
                alt="AURUM boutique interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-[40px] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5">
              Less noise. More intention.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-500 leading-relaxed mb-10">
              <p>
                We started AURUM with a simple belief: luxury should feel calm,
                considered, and reachable — not loud or overwhelming.
              </p>
              <p>
                Every product in our catalog is hand-selected for craftsmanship,
                materials, and the quiet confidence it brings into your daily
                ritual. From fashion to living essentials, we edit so you
                don&apos;t have to.
              </p>
              <p>
                Today, AURUM serves a global community of people who value
                design with purpose — and shopping experiences that feel as
                refined as the products themselves.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {milestones.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    {value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
