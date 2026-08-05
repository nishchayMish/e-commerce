import Skeleton from "@/components/ui/Skeleton";

const cardClass =
  "rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";

export default function CartSkeleton() {
  return (
    <section className="min-h-dvh bg-[#fafafa] pt-16 pb-24 lg:pb-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-5 sm:py-6">
          <div className="flex items-baseline gap-2.5">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-3.5 w-14" />
          </div>
          <Skeleton className="h-3.5 w-28 hidden sm:block" />
        </div>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6 items-start">
          <div className="lg:col-span-3 min-w-0">
            <div className={`${cardClass} overflow-hidden`}>
              <div className="border-b border-gray-200 bg-[#fafafa] px-5 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-4 h-4 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-[70%] sm:w-[50%]" />
                    <Skeleton className="h-1 w-full rounded-full!" />
                  </div>
                </div>
              </div>

              <ul className="divide-y divide-gray-200">
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className="px-5 py-4">
                    <div className="flex gap-4">
                      <Skeleton className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg!" />
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-2.5 w-16" />
                            <Skeleton className="h-3.5 w-[80%]" />
                          </div>
                          <Skeleton className="w-8 h-8 rounded-lg! shrink-0" />
                        </div>
                        <Skeleton className="hidden sm:block mt-2 h-3.5 w-24" />
                        <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                          <Skeleton className="h-9 w-26 rounded-lg!" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 min-w-0">
            <div className={`${cardClass} overflow-hidden`}>
              <div className="px-5 pt-5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-2 h-3.5 w-[80%]" />
              </div>

              <div className="mx-5 mt-5 space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <Skeleton className="h-3.5 w-16" />
                  <Skeleton className="h-3.5 w-14" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3.5 w-16" />
                  <Skeleton className="h-3.5 w-14" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3.5 w-16" />
                  <Skeleton className="h-3.5 w-10" />
                </div>
              </div>

              <div className="mx-5 mt-4 flex items-end justify-between border-t border-gray-200 pt-4">
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>

              <div className="mt-5 border-t border-gray-200 bg-[#fafafa] px-5 py-4">
                <Skeleton className="h-10 w-full rounded-lg!" />
                <Skeleton className="mt-2.5 h-3 w-[70%] mx-auto" />
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-2 mt-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-17 w-full rounded-lg!" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
