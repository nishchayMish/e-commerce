import Skeleton from "@/components/ui/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3 !rounded-full" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-3 !rounded-full" />
          <Skeleton className="h-3 w-40" />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image panel */}
          <Skeleton className="aspect-square !rounded-xl" />

          {/* Info panel — mirrors ProductDetail layout */}
          <div className="flex flex-col">
            <Skeleton className="h-2.5 w-20 mb-3" />

            <Skeleton className="h-7 w-[88%] mb-2" />
            <Skeleton className="h-7 w-[55%]" />

            {/* Rating + stock */}
            <div className="mt-3 flex items-center gap-2">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-3.5 w-7" />
              <Skeleton className="h-3.5 w-16" />
            </div>

            {/* Price */}
            <div className="mt-5 flex items-center gap-2.5">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Description lines */}
            <div className="mt-4 max-w-lg space-y-2.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[92%]" />
              <Skeleton className="h-3 w-[70%]" />
            </div>

            {/* Qty + CTA + wishlist */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Skeleton className="h-10 w-30 !rounded-lg shrink-0" />
              <Skeleton className="h-10 flex-1 !rounded-lg" />
              <Skeleton className="h-10 w-10 !rounded-lg shrink-0" />
            </div>

            {/* Trust row */}
            <div className="mt-auto grid grid-cols-1 gap-2 border-t border-gray-200 pt-6 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-11 w-full !rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
