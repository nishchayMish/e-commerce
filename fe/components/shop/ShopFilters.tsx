const CATEGORY_OPTIONS = [
  { label: "All", slug: null },
  { label: "Electronics", slug: "electronics" },
  { label: "Fashion", slug: "fashion" },
  { label: "Home & Kitchen", slug: "home-kitchen" },
  { label: "Beauty", slug: "beauty" },
  { label: "Sports & Fitness", slug: "sports-fitness" },
];

const PRICE_OPTIONS = [
  { label: "Under ₹500", value: "lt-500" },
  { label: "₹500 – ₹1,000", value: "500-1000" },
  { label: "₹1,000 – ₹2,500", value: "1000-2500" },
  { label: "Above ₹2,500", value: "gt-2500" },
];

const RATING_OPTIONS = [
  { label: "4.5 & up", value: "4.5" },
  { label: "4.0 & up", value: "4.0" },
  { label: "3.5 & up", value: "3.5" },
];

interface ShopFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  priceRange: string | null;
  rating: string | null;
  handlePriceRangeChange: (value: string | null) => void;
  handleRatingChange: (value: string | null) => void;
  clearAllFilters: () => void;
}

export default function ShopFilters({selectedCategory, onCategoryChange, priceRange, rating, handlePriceRangeChange, handleRatingChange, clearAllFilters}: ShopFiltersProps) {
  const isSelectedCategory = (slug: string | null) => {
    // "All" tab: jab koi category selected na ho
    if (slug === null) {
      return !selectedCategory;
    }

    return slug === selectedCategory;
  };

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 mb-4">
          Category
        </h3>
        <ul className="space-y-1">
          {CATEGORY_OPTIONS.map(({ label, slug }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => onCategoryChange(slug)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isSelectedCategory(slug)
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 mb-4">
          Price
        </h3>
        <ul className="space-y-1">
          {PRICE_OPTIONS.map(({label, value}, idx) => (
            <li key={idx}>
              <button
                onClick={() => handlePriceRangeChange(value)}
                type="button"
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors
                ${priceRange === value 
                  ? "bg-black text-white" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 mb-4">
          Rating
        </h3>
        <ul className="space-y-1">
          {RATING_OPTIONS.map(({label, value}, idx) => (
            <li key={idx}>
              <button
                onClick={()=>handleRatingChange(value)}
                type="button"
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors
                ${rating === value 
                  ? "bg-black text-white" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full">
        <button
          onClick={clearAllFilters} 
          className="text-gray-600 font-thin cursor-pointer text-sm underline hover:text-gray-900">
          Clear all
        </button>
      </div>
    </aside>
  );
}
