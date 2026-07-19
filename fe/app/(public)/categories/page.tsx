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

      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <CategoryGrid categories={categories} />

          {/* Soft CTA toward shop */}
          <AnimatedSection direction="up" delay={0.15} className="mt-16 sm:mt-20">
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-8 py-10 sm:px-12 sm:py-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Prefer to browse everything?
                </h2>
                <p className="mt-2 text-gray-500 text-base max-w-md">
                  Jump straight into the full catalogue and filter by what you love.
                </p>
              </div>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors shrink-0"
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
