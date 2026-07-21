"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import ShopFilters from "@/components/shop/ShopFilters";

interface ShopFiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  priceRange: string | null;
  rating: string | null;
  handlePriceRangeChange: (value: string | null) => void;
  handleRatingChange: (value: string | null) => void;
  clearAllFilters: () => void;
}

export default function ShopFiltersDrawer({
  open,
  onClose,
  selectedCategory,
  onCategoryChange,
  priceRange,
  rating,
  handlePriceRangeChange,
  handleRatingChange,
  clearAllFilters,
}: ShopFiltersDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" aria-hidden={!open}>
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
        className="relative flex h-full w-[min(100%,300px)] flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-900">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <ShopFilters
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            priceRange={priceRange}
            rating={rating}
            handlePriceRangeChange={handlePriceRangeChange}
            handleRatingChange={handleRatingChange}
            clearAllFilters={clearAllFilters}
          />
        </div>
      </div>
    </div>
  );
}
