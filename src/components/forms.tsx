'use client'

import { getForms } from '@/data/forms'
import { useQuery } from '@tanstack/react-query'
import { FormCard } from './form-card'
import FormsLoading from '@/components/loading/forms-loading'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel'
import SubmissionsLineChart from './charts/submissions-line-chart'
import { Button } from './ui/button'
import Link from 'next/link'
import { Library, Plus } from 'lucide-react'
import { getReplysByFormId } from '@/data/replys'
import { User } from '@supabase/supabase-js'

const Forms = ({ user }: { user: User }) => {
  const { data: forms, isLoading } = useQuery({
    queryKey: ['forms'],
    queryFn: () => getForms({ userId: user.id }),
  })

  const lastFormCreatedId = forms && forms?.length > 0 ? forms[0].id : null

  const { data: replies } = useQuery({
    queryKey: ['replies', lastFormCreatedId],
    queryFn: () => getReplysByFormId({ formId: lastFormCreated.id }),
    enabled: lastFormCreatedId !== null,
  })

  if (isLoading) {
    return (
      <div className="lg:w-4/5 mx-auto space-y-16 w-full">
        <h1 className="text-2xl font-extrabold text-center lg:text-start">
          Your Form Vault
        </h1>
        <FormsLoading />
      </div>
    )
  }

  if (!forms || forms === undefined || forms.length === 0) {
    return (
      <div className="lg:w-4/5 mx-auto flex items-center gap-4 flex-col my-48 text-center w-full">
        <Library className="stroke-primary" size={32} />
        <h1 className="text-2xl font-extrabold">No forms</h1>
        <p>
          Get started creating a new{' '}
          <strong className="text-primary">form</strong>
        </p>

        <Button
          asChild
          className="border border-emerald-200 bg-emerald-600 w-full lg:w-fit"
        >
          <Link href="/builder" className="flex items-center gap-2">
            <Plus size={18} />
            <p>New form</p>
          </Link>
        </Button>
      </div>
    )
  }

  const lastFormCreated = forms.reduce((prevForm, currentForm) => {
    const prevDate = new Date(prevForm.created_at)
    const currentDate = new Date(currentForm.created_at)

    return prevDate > currentDate ? prevForm : currentForm
  })

  return (
    <div className="lg:w-4/5 mx-auto space-y-16 w-full">
      <h1 className="text-2xl font-extrabold text-center lg:text-start">
        Your Form Vault
      </h1>
      <Carousel
        opts={{
          align: 'start',
          startIndex: 1,
        }}
        className="w-full"
      >
        <CarouselContent>
          {forms?.map((form) => (
            <CarouselItem
              className="2xl:basis-1/4 lg:basis-1/3 md:basis-2/3 basis-5/6"
              key={form.id}
            >
              <FormCard form={form} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
      {replies && (
        <SubmissionsLineChart
          formName={lastFormCreated.name}
          replies={replies}
        />
      )}
    </div>
  )
}

export default Forms
