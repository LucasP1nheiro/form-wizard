import React from 'react'
import { Skeleton } from '../ui/skeleton'

const FormLoading = () => {
  return (
    <div className="lg:w-4/5 mx-auto min-h-screen py-32 space-y-20 w-full">
      <section className="space-y-6 w-full">
        <div className="w-full justify-between flex items-center">
          <Skeleton className="h-8 w-64" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-96" />
      </section>
    </div>
  )
}

export default FormLoading
