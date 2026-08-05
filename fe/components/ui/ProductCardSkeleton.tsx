import Skeleton from "@/components/ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      {/* Thumbnail — matches ProductCard image */}
      <div className="border-b border-gray-100">
        <Skeleton className="aspect-square rounded-none!" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Category + rating row */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <Skeleton className="h-2.5 w-[30%]" />
          <Skeleton className="h-2.5 w-7" />
        </div>

        {/* Title — two lines like real card */}
        <Skeleton className="h-3 w-[90%] mb-1.5" />
        <Skeleton className="h-3 w-[60%]" />

        {/* Price */}
        <Skeleton className="h-4 w-[32%] mt-3 mb-3" />

        {/* Add to cart button */}
        <Skeleton className="h-9 w-full mt-auto rounded-lg!" />
      </div>
    </div>
  );
}
