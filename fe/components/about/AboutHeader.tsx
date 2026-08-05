import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutHeader() {
  return (
    <section className="border-b border-gray-200 pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <span className="block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
            Our Story
          </span>
          <h1 className="mt-3 max-w-2xl text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Crafting modern luxury for everyday life
          </h1>
          <p className="mt-3 max-w-xl text-sm text-gray-500 leading-relaxed">
            AURUM is a curated lifestyle house — where design, quality, and
            intention meet. We exist to make premium feel personal.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
