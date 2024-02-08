import { Skeleton } from '../ui/skeleton'

export function LineChartLoading() {
  return (
    <div className="space-y-8 w-full h-[500px] mb-32">
      <Skeleton className="h-4 w-8 rounded-md" />
      <Skeleton className="h-2 w-14 rounded-md" />
      <Skeleton className="h-[420px] w-[320px] rounded-md" />
    </div>
  )
}
