import { Skeleton } from '@/components/ui/skeleton'

export default function FormsLoading() {
  return (
    <div className="w-full 2xl:basis-1/4 lg:basis-1/3 md:basis-2/3 basis-5/6 flex gap-2 overflow-hidden">
      {Array.from({ length: 4 }, (_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[420px] w-[380px] rounded-md" />
        </div>
      ))}
    </div>
  )
}
