import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ReplyLoading = () => {
  return (
    <main className="min-h-screen w-screen bg-background py-32 p-4">
      <div className="lg:w-4/5 mx-auto space-y-12 w-full">
        <section className="flex items-center justify-between flex-col xl:flex-row gap-8 xl:gap-0">
          <Skeleton className="w-full xl:w-[300px] h-16" />

          <Skeleton className="w-full xl:w-[300px] h-16" />

          <Skeleton className="w-full xl:w-[300px] h-16" />
        </section>

        <Skeleton className="w-full xl:w-[400px] h-12" />

        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full xl:w-[250px] h-8" />
        ))}
      </div>
    </main>
  )
}

export default ReplyLoading
