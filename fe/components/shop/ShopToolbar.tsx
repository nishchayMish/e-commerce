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
  onOpenFilters: () => void;
}

export default function ShopToolbar({ limit, setLimit, setSort, onOpenFilters }: ShopToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-[13px] text-gray-500">
        <span>Showing</span>

        <div className="relative">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="h-9 appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 text-[13px] font-medium text-gray-900 tabular-nums outline-none transition cursor-pointer hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <span>products</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile filter trigger */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="lg:hidden inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-[13px] font-medium text-gray-900 transition hover:bg-gray-50 hover:border-gray-300"
        >
          <SlidersHorizontal size={13} />
          Filters
        </button>

        <label className="flex items-center gap-2 text-[13px] text-gray-500">
          <span className="hidden sm:inline">Sort by</span>
          <div className="relative">
            <select
              onChange={(e)=>setSort(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-gray-200 bg-white pl-3 pr-8 text-[13px] font-medium text-gray-900 outline-none transition cursor-pointer hover:border-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} 
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </label>
      </div>
    </div>
  );
}
