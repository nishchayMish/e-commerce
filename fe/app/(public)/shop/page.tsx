"use client"
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopPagination from "@/components/shop/ShopPagination";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export default function ShopPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const res = await http.get(endpoints.product.allProducts(limit, page));
        setProducts(res.data.products)
        setPagination(res.data.pagination)
      } catch (error) {
        toast.error("error fetching products")
        console.log(error)
      }
    }
    fetchProducts()
  },[page, limit])
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
              <ShopToolbar limit={limit} setLimit={setLimit} />
              <ProductGrid products={products} />
              <ShopPagination pagination={pagination} setPage={setPage}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
