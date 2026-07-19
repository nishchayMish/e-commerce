export default function ShopPagination() {
  const pages = [1, 2, 3];

  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <button
        type="button"
        className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed"
        disabled
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${
            page === 1
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
