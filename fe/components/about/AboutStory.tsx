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
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <AnimatedSection direction="up">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-[#fafafa] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=960&q=85"
                alt="AURUM boutique interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1}>
            <span className="block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
              Who We Are
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
              Less noise. More intention.
            </h2>
            <div className="mt-4 space-y-3 text-sm text-gray-500 leading-relaxed">
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

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {milestones.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-3"
                >
                  <p className="text-base font-semibold tracking-tight text-gray-900 tabular-nums">
                    {value}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
