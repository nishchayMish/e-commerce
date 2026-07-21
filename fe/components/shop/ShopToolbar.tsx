import { ChevronDown, SlidersHorizontal } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "top_rated" }
];

interface ShopToolbarProps {
  limit: number;
  setLimit: (limit: number) => void;
  setSort: (value: string) => void;
}

export default function ShopToolbar({ limit, setLimit, setSort }: ShopToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Showing</span>

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>

        <span>products</span>
      </div>

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
              onChange={(e)=>setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-900 hover:border-gray-900 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
