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
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Product not found
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          This product may have been removed or is unavailable.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
