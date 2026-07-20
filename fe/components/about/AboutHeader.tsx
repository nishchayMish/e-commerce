import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutHeader() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-indigo-50 rounded-full opacity-70 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-gray-100 rounded-full opacity-60 blur-[60px]" />
        <div className="grid-bg absolute inset-0 opacity-30" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection direction="up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-gray-900 tracking-tight leading-[1.1] max-w-3xl">
            Crafting modern luxury for everyday life
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-gray-500 leading-relaxed">
            AURUM is a curated lifestyle house — where design, quality, and
            intention meet. We exist to make premium feel personal.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
