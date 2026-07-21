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
          endpoints.product.allProducts(limit, page, categoryFromUrl, priceRangeFromUrl, ratingFromUrl)
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
  }, [page, limit, categoryFromUrl, priceRangeFromUrl, ratingFromUrl]);

  return (
    <div className="bg-white min-h-screen">
      <ShopHeader />

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
              <ShopToolbar limit={limit} setLimit={setLimit} />

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
    </div>
  );
}
