import Skeleton from "@/components/ui/Skeleton";

export default function CartSkeleton() {
  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-[5.5rem] pb-24 sm:pb-28 lg:pb-32">
      <div className="absolute inset-0 bg-slate-50/70 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4 py-5 sm:py-6 mb-1 sm:mb-2">
          <div className="flex items-baseline gap-3">
            <Skeleton className="h-7 w-16 sm:h-8 sm:w-20" />
            <Skeleton className="h-4 w-14" />
          </div>
          <Skeleton className="h-4 w-28 hidden sm:block" />
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          <div className="lg:col-span-7 xl:col-span-8 min-w-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_12px_40px_rgba(15,23,42,0.04)] overflow-hidden">
              <div className="px-4 sm:px-6 lg:px-7 pt-5 sm:pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 !rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2.5">
                    <Skeleton className="h-3.5 w-[70%] sm:w-[50%]" />
                    <Skeleton className="h-1.5 w-full !rounded-full" />
                  </div>
                </div>
              </div>

              <ul className="divide-y divide-gray-100">
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i} className="p-4 sm:p-5 lg:p-6">
                    <div className="flex gap-3.5 sm:gap-5">
                      <Skeleton className="shrink-0 w-[88px] h-[88px] sm:w-28 sm:h-28 lg:w-[120px] lg:h-[120px] !rounded-xl sm:!rounded-2xl" />
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-2.5 w-16" />
                            <Skeleton className="h-4 w-[80%]" />
                            <Skeleton className="h-4 w-[55%] hidden sm:block" />
                          </div>
                          <Skeleton className="w-8 h-8 !rounded-lg shrink-0" />
                        </div>
                        <Skeleton className="hidden sm:block mt-2 h-3.5 w-24" />
                        <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between gap-3">
                          <Skeleton className="h-10 w-28 !rounded-xl" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 min-w-0">
            <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_16px_48px_rgba(15,23,42,0.06)] p-5 sm:p-6 lg:p-7">
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-3.5 w-[80%] mb-6" />
              <div className="flex gap-2 mb-6">
                <Skeleton className="h-11 flex-1 !rounded-xl" />
                <Skeleton className="h-11 w-20 !rounded-xl" />
              </div>
              <div className="space-y-3 border-t border-gray-100 pt-5">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-gray-100 flex items-end justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="mt-6 h-12 w-full !rounded-xl" />
              <Skeleton className="mt-4 h-3 w-[70%] mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
