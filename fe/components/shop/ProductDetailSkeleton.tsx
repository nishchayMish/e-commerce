import Skeleton from "@/components/ui/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24 sm:pb-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3 !rounded-full" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-3 !rounded-full" />
          <Skeleton className="h-3 w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image panel */}
          <Skeleton className="aspect-square !rounded-2xl" />

          {/* Info panel — mirrors ProductDetail layout */}
          <div className="flex flex-col">
            <Skeleton className="h-2.5 w-20 mb-4" />

            <Skeleton className="h-9 w-[88%] mb-2.5" />
            <Skeleton className="h-9 w-[55%] mb-6" />

            {/* Rating + stock */}
            <div className="flex items-center gap-2.5 mb-6">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3.5 w-8" />
              <Skeleton className="h-3.5 w-16" />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-5 w-20" />
            </div>

            {/* Description lines */}
            <div className="space-y-2.5 mb-10 max-w-lg">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[92%]" />
              <Skeleton className="h-3 w-[70%]" />
            </div>

            {/* Qty + CTA + wishlist */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Skeleton className="h-12 w-36 !rounded-xl shrink-0" />
              <Skeleton className="h-12 flex-1 !rounded-xl" />
              <Skeleton className="h-12 w-12 !rounded-xl shrink-0" />
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-gray-100 mt-auto">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Skeleton className="h-9 w-9 !rounded-xl shrink-0" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
