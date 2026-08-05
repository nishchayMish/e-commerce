import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ShopHeader() {
  return (
    <section className="border-b border-gray-200 bg-white pt-24 pb-8 sm:pt-28 sm:pb-10">
      <div className="container-page">
        <AnimatedSection direction="up">
          <span className="eyebrow block">Premium Collection</span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Shop All
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-500 leading-relaxed">
            Explore curated essentials across fashion, tech, beauty, and living —
            designed for everyday luxury.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
