import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8 mb-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>

      <Skeleton className="aspect-[2/1] w-full rounded-lg" />

      <div className="space-y-4 mt-8">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
      </div>
    </div>
  );
}
