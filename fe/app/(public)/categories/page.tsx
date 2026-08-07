import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import CategoriesHeader from "@/components/categories/CategoriesHeader";
import CategoryGrid from "@/components/categories/CategoryGrid";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CategoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      <CategoriesHeader />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <CategoryGrid categories={categories} />

          {/* Soft CTA toward shop */}
          <AnimatedSection direction="up" delay={0.15} className="mt-12 sm:mt-16">
            <div className="rounded-xl bg-[#fafafa] border border-gray-200 px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                  Prefer to browse everything?
                </h2>
                <p className="mt-1.5 text-sm text-gray-500 max-w-md">
                  Jump straight into the full catalogue and filter by what you love.
                </p>
              </div>
              <Link
                href="/shop"
                className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-4 text-[13px] font-medium text-white transition hover:bg-gray-800 shrink-0"
              >
                View All Products
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
