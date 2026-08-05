import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ShopPaginationProps {
  setPage: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pagination: any;
}

const navButtonClass =
  "inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-[13px] font-medium text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40";

export default function ShopPagination({ pagination, setPage }: ShopPaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => setPage(pagination.currentPage - 1)}
        type="button"
        className={navButtonClass}
        disabled={pagination.currentPage === 1}
      >
       
        <ChevronLeftIcon className="h-3.5 w-3.5"/>
        Previous
      </button>

      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-gray-900 px-3 text-[13px] font-medium tabular-nums text-white">{pagination.currentPage}</span>

      <button
        onClick={() => setPage(pagination.currentPage + 1)}
        type="button"
        className={navButtonClass}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        Next
        <ChevronRightIcon className="h-3.5 w-3.5"/>
      </button>
    </div>
  );
}
