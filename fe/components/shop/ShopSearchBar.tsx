import { Search, X } from "lucide-react";

interface ShopSearchBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
}

const ShopSearchBar = ({ searchInput, setSearchInput }: ShopSearchBarProps) => {
  return (
    <div className="relative">
    <Search
      size={17}
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      type="text"
      placeholder="Search products, categories…"
      aria-label="Search products"
      className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-11 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5"
    />

    {searchInput && (
      <button
        onClick={()=>setSearchInput("")}
        type="button"
        aria-label="Clear search"
        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <X size={15} />
      </button>
    )}
    </div>
  )
}

export default ShopSearchBar