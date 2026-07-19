import ProductCard from "@/components/ui/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product, index) => (
        <AnimatedSection
          key={product.id}
          direction="up"
          delay={Math.min(index * 0.05, 0.3)}
        >
          <ProductCard product={product} />
        </AnimatedSection>
      ))}
    </div>
  );
}
