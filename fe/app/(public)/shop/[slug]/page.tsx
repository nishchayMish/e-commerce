"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";
import type { Product } from "@/lib/types";
import ProductDetail from "@/components/shop/ProductDetail";
import ProductDetailSkeleton from "@/components/shop/ProductDetailSkeleton";

export default function ShopDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await http.get(endpoints.product.singleProduct(slug));
        setProduct(res.data.data);
      } catch (error) {
        toast.error("Failed to load product");
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-dvh bg-white pt-24 sm:pt-28 pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-md flex-col items-center rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Product not found
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              This product may have been removed or is unavailable.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-4 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99]"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
