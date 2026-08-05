import { Search, X } from "lucide-react";

interface ShopSearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
}

const ShopSearchBar = ({ searchInput, setSearchInput }: ShopSearchBarProps) => {
  return (
    <div className="relative">
    <Search
      size={15}
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      type="text"
      placeholder="Search products, categories…"
      aria-label="Search products"
      className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
    />

    {searchInput && (
      <button
        onClick={()=>setSearchInput("")}
        type="button"
        aria-label="Clear search"
        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
      >
        <X size={14} />
      </button>
    )}
    </div>
  )
}

export default ShopSearchBar
