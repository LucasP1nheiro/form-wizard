import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="w-4/5 mx-auto grid grid-cols-4 gap-4 h-screen py-32">
      {Array.from({ length: 10 }, (_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-[200px] w-[300px] rounded-md" />
        </div>
      ))}
    </div>
  )
}
