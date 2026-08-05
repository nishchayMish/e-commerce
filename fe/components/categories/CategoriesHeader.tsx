import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CategoriesHeader() {
  return (
    <section className="border-b border-gray-200 pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <span className="block text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
            Browse by World
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Categories
          </h1>
          <p className="mt-3 max-w-lg text-sm text-gray-500 leading-relaxed">
            Find your next favourite piece by exploring our carefully curated
            collections.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
