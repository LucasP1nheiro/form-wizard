'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import Loading from './forms-loading'
import { FormCard } from '@/components/form-card'
import { getForms } from '@/data/forms'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data: forms } = useQuery({
    queryKey: ['forms'],
    queryFn: getForms,
  })

  return (
    <main className="bg-background w-screen min-h-screen flex flex-col p-4 gap-8 py-32">
      <div className="w-4/5 mx-auto flex items-center gap-2 justify-end">
        <Button asChild className="border border-emerald-200 bg-emerald-600 ">
          <Link href="/builder" className="flex items-center gap-2">
            <Plus size={18} />
            <p>New form</p>
          </Link>
        </Button>
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-4 gap-4">
        <Suspense fallback={<Loading />}>
          {forms?.map((form) => <FormCard key={form.id} form={form} />)}
        </Suspense>
      </div>
    </main>
  )
}
