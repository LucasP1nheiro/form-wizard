import { Check } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <main className="w-screeen h-screen flex items-center justify-center flex-col gap-4 bg-background">
      <Check size={60} className="stroke-primary" />
      <h1 className="text-3xl font-bold">Thank You</h1>
      <p>Your response has been successfully submitted!</p>
    </main>
  )
}

export default Page
