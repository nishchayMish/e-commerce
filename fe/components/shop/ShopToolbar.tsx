import { ChevronDown, SlidersHorizontal } from "lucide-react";

const SORT_OPTIONS = [
  "Featured",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Top Rated",
];

interface ShopToolbarProps {
  productCount: number;
}

export default function ShopToolbar({ productCount }: ShopToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900">{productCount}</span>{" "}
        products
      </p>

      <div className="flex items-center gap-3">
        {/* Mobile filter trigger — UI only */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>

        <label className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">Sort by</span>
          <div className="relative">
            <select
              defaultValue="Featured"
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-900 hover:border-gray-900 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </label>
      </div>
    </div>
  );
}
