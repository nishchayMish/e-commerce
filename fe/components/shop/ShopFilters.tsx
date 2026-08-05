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

const sectionTitleClass =
  "mb-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400";

const optionClass = (active: boolean) =>
  `w-full rounded-lg border px-2.5 py-2 text-left text-[13px] transition ${
    active
      ? "border-gray-900 bg-gray-50 font-medium text-gray-900"
      : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
  }`;

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
    <aside className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Categories */}
      <div className="p-4">
        <h3 className={sectionTitleClass}>
          Category
        </h3>
        <ul className="space-y-0.5">
          {CATEGORY_OPTIONS.map(({ label, slug }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => onCategoryChange(slug)}
                className={optionClass(isSelectedCategory(slug))}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="p-4">
        <h3 className={sectionTitleClass}>
          Price
        </h3>
        <ul className="space-y-0.5">
          {PRICE_OPTIONS.map(({label, value}, idx) => (
            <li key={idx}>
              <button
                onClick={() => handlePriceRangeChange(value)}
                type="button"
                className={optionClass(priceRange === value)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div className="p-4">
        <h3 className={sectionTitleClass}>
          Rating
        </h3>
        <ul className="space-y-0.5">
          {RATING_OPTIONS.map(({label, value}, idx) => (
            <li key={idx}>
              <button
                onClick={()=>handleRatingChange(value)}
                type="button"
                className={optionClass(rating === value)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4">
        <button
          onClick={clearAllFilters} 
          className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-900 transition hover:border-gray-300 hover:bg-gray-50">
          Clear all
        </button>
      </div>
    </aside>
  );
}
