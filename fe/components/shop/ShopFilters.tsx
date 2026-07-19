const CATEGORY_OPTIONS = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports & Fitness",
];

const PRICE_OPTIONS = [
  "Under ₹500",
  "₹500 – ₹1,000",
  "₹1,000 – ₹2,500",
  "Above ₹2,500",
];

const RATING_OPTIONS = ["4.5 & up", "4.0 & up", "3.5 & up"];

export default function ShopFilters() {
  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 mb-4">
          Category
        </h3>
        <ul className="space-y-1">
          {CATEGORY_OPTIONS.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  index === 0
                    ? "bg-gray-900 text-white font-medium"
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
