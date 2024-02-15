'use client'

import Spotlight, { SpotlightCard } from './spotlight-cards'

import { ChartDemo } from './chart-demo'
import DragAndDropDemo from './drag-and-drop-demo'
import CustomFieldsDemo from './custom-fields-demo'
import PreviewDemo from './preview-demo'

interface Feature {
  title: string
  description: string
  children?: React.ReactNode
}

export function Features() {
  const features: Feature[] = [
    {
      title: 'Analytics',
      description:
        'Obtain data analysis for responses submitted through the forms.',
      children: <ChartDemo />,
    },
    {
      title: 'Drag and drop',
      description:
        'Build your forms easily by dragging and dropping components.',
      children: <DragAndDropDemo />,
    },
    {
      title: 'Custom fields',
      description: 'Customise each field to meet your unique requirements.',
      children: <CustomFieldsDemo />,
    },
    {
      title: 'Preview',
      description:
        'Have access to a live preview while you are building the form.',
      children: <PreviewDemo />,
    },
  ]

  return (
    <section className="lg:w-4/5 mx-auto space-y-10 pt-48 w-full p-4">
      <div className="w-fit mx-auto rounded-full bg-gradient-to-r my-2 from-emerald-200 to-emerald-500 p-[1px] brightness-90 contrast-150  dark:brightness-125 dark:contrast-100">
        <div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 dark:bg-black/80">
          <span className="select-none bg-gradient-to-r from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
            <svg
              className="mr-1 inline-block h-4 w-4 fill-emerald-200"
              viewBox="4 4 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m19.2 36.4-4.75-10.45L4 21.2l10.45-4.75L19.2 6l4.75 10.45L34.4 21.2l-10.45 4.75ZM36.4 42l-2.35-5.25-5.25-2.35 5.25-2.4 2.35-5.2 2.4 5.2 5.2 2.4-5.2 2.35Z"></path>
            </svg>
            Features
          </span>
        </div>
      </div>
      <h1 className="text-center text-4xl font-extrabold">
        What does{' '}
        <strong className="bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-transparent">
          Form Wizard
        </strong>{' '}
        has to offer?
      </h1>
      <p className="text-muted-foreground text-center text-lg">
        All the features you need to manage your forms without effort
      </p>
      <Spotlight className="w-full mx-auto grid gap-24 xl:grid-cols-2 py-32 place-items-center">
        {features.map((feature) => (
          <SpotlightCard
            className="2xl:w-[650px] w-full group overflow-hidden max-h-[580px]"
            key={feature.title}
          >
            <div className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="grow mb-5">
                  <h1 className="text-2xl font-bold mb-1">{feature.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                {feature.children}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </Spotlight>
    </section>
  )
}
