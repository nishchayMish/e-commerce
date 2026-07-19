const CATEGORY_OPTIONS = [
  { label: "All", slug: null },
  { label: "Electronics", slug: "electronics" },
  { label: "Fashion", slug: "fashion" },
  { label: "Home & Kitchen", slug: "home-kitchen" },
  { label: "Beauty", slug: "beauty" },
  { label: "Sports & Fitness", slug: "sports-fitness" },
];

const PRICE_OPTIONS = [
  "Under ₹500",
  "₹500 – ₹1,000",
  "₹1,000 – ₹2,500",
  "Above ₹2,500",
];

const RATING_OPTIONS = ["4.5 & up", "4.0 & up", "3.5 & up"];

interface ShopFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export default function ShopFilters({
  selectedCategory,
  onCategoryChange,
}: ShopFiltersProps) {
  const isSelected = (slug: string | null) => {
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
                  isSelected(slug)
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
          {PRICE_OPTIONS.map((label) => (
            <li key={label}>
              <button
                type="button"
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
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
          {RATING_OPTIONS.map((label) => (
            <li key={label}>
              <button
                type="button"
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
