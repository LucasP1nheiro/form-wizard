import React from 'react'
import { Skeleton } from '../ui/skeleton'

const RepliesFromFormLoading = () => {
  return (
    <div className="space-y-4 w-full">
      <Skeleton className="h-56 w-96 mb-4" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  )
}

export default RepliesFromFormLoading
