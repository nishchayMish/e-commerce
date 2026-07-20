import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ShopPaginationProps {
  setPage: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pagination: any;
}

export default function ShopPagination({ pagination, setPage }: ShopPaginationProps) {
  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <button
        onClick={() => setPage(pagination.currentPage - 1)}
        type="button"
        className="flex items-center gap-1 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        disabled={pagination.currentPage === 1}
      >
       
        <ChevronLeftIcon className="w-4 h-4"/>
        Previous
      </button>

      <span className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100">{pagination.currentPage}</span>

      <button
        onClick={() => setPage(pagination.currentPage + 1)}
        type="button"
        className="flex items-center gap-1 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        disabled={pagination.currentPage === pagination.totalPages}
      >
        Next
        <ChevronRightIcon className="w-4 h-4"/>
      </button>
    </div>
  );
}
