import Skeleton from "@/components/ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      {/* Thumbnail — matches ProductCard image */}
      <Skeleton className="aspect-square !rounded-none" />

      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <Skeleton className="h-2.5 w-[28%] mb-3" />

        {/* Title — two lines like real card */}
        <Skeleton className="h-3.5 w-[92%] mb-2" />
        <Skeleton className="h-3.5 w-[62%] mb-3.5" />

        {/* Rating stars row */}
        <div className="flex items-center gap-1.5 mb-3">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-2.5 w-6" />
        </div>

        {/* Price */}
        <Skeleton className="h-5 w-[30%] mb-3 mt-auto" />

        {/* Add to cart button */}
        <Skeleton className="h-10 w-full !rounded-xl" />
      </div>
    </div>
  );
}
