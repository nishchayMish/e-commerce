"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import ShopPagination from "@/components/shop/ShopPagination";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import type { Product } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import ShopFiltersDrawer from "@/components/shop/ShopFiltersDrawer";
import { Search, X } from "lucide-react";

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // homepage se aaye to URL me category already hogi
  const categoryFromUrl = searchParams.get("category");
  const priceRangeFromUrl = searchParams.get("price_range");
  const ratingFromUrl = searchParams.get("rating");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });

  // existing query params preserve karke sirf diya hua key update/remove karo
  const updateSearchParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  };

  // category change hone pe URL update karo
  const handleCategoryChange = (slug: string | null) => {
    setPage(1);
    updateSearchParam("category", slug);
  };

  const handlePriceRangeChange = (value: string | null) => {
    setPage(1);
    updateSearchParam("price_range", value);
  };
  const handleRatingChange = (value: string | null) => {
    setPage(1);
    updateSearchParam("rating", value);
  };

  const clearAllFilters = () => {
    router.push("/shop")
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await http.get(
          endpoints.product.allProducts(limit, page, categoryFromUrl, priceRangeFromUrl, ratingFromUrl, sort)
        );
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } catch (error) {
        toast.error("Error fetching products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, categoryFromUrl, priceRangeFromUrl, ratingFromUrl, sort]);

  return (
    <div className="bg-white min-h-screen">
      <ShopHeader />
      
      {/* input box for search */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 -mt-6 sm:-mt-8 mb-8">
        <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search products, brands, categories…"
          aria-label="Search products"
          className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-11 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5"
        />

          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
            <div className="hidden lg:block">
              <ShopFilters
                selectedCategory={categoryFromUrl}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRangeFromUrl}
                rating={ratingFromUrl}
                handlePriceRangeChange={handlePriceRangeChange}
                handleRatingChange={handleRatingChange}
                clearAllFilters={clearAllFilters}
              />
            </div>

            <div>
              <ShopToolbar 
              limit={limit} 
              setLimit={setLimit} 
              setSort={setSort}
              onOpenFilters={() => setFiltersOpen(true)}
              />

              {loading ? (
                <ProductGridSkeleton count={limit > 9 ? 9 : limit} />
              ) : (
                <>
                  <ProductGrid products={products} />
                  <ShopPagination pagination={pagination} setPage={setPage} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <ShopFiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        selectedCategory={categoryFromUrl}
        onCategoryChange={handleCategoryChange}
        priceRange={priceRangeFromUrl}
        rating={ratingFromUrl}
        handlePriceRangeChange={handlePriceRangeChange}
        handleRatingChange={handleRatingChange}
        clearAllFilters={clearAllFilters}
      />
    </div>
  );
}
