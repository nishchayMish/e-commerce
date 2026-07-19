import { bestSellers } from "@/lib/data";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopPagination from "@/components/shop/ShopPagination";

export default function ShopPage() {
  const products = bestSellers;

  return (
    <div className="bg-white min-h-screen">
      <ShopHeader />

      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
            {/* Sidebar filters — UI only for now */}
            <div className="hidden lg:block">
              <ShopFilters />
            </div>

            {/* Products */}
            <div>
              <ShopToolbar productCount={products.length} />
              <ProductGrid products={products} />
              <ShopPagination />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
