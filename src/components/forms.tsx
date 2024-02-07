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

const Forms = () => {
  const { data: forms, isLoading } = useQuery({
    queryKey: ['forms'],
    queryFn: getForms,
  })

  if (isLoading) {
    return (
      <div className="lg:w-4/5 mx-auto space-y-8 w-full">
        <h1 className="text-2xl font-extrabold text-center lg:text-start">
          Your Form Vault
        </h1>
        <FormsLoading />
      </div>
    )
  }

  return (
    <div className="lg:w-4/5 mx-auto space-y-8 w-full">
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
    </div>
  )
}

export default Forms
