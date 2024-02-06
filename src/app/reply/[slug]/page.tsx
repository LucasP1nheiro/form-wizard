import CreateReplyForm from '@/components/reply/create-reply-form'

import supabase from '@/lib/supabase-browser'
import { ComponentProps, ComponentPropsMap } from '@/types/components'

import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

const Page = async ({ params: { slug } }: PageProps) => {
  const { data: forms } = await supabase
    .from('forms')
    .select()
    .match({ share_url: slug })

  if (!forms) {
    return notFound()
  }

  const [form] = forms

  const fields: ComponentProps<keyof ComponentPropsMap>[] = JSON.parse(
    form.fields as string,
  ).map((field: ComponentProps<keyof ComponentPropsMap>) => {
    return {
      type: field.type,
      id: field.id,
      props: field.props,
    }
  })

  return (
    <main className="min-h-screen w-screen py-32 bg-background px-4">
      <div className="lg:w-4/5 mx-auto space-y-5 w-full">
        <h1 className="text-4xl font-bold text-accent-foreground">
          {form?.name}
        </h1>
        <p className="dark:text-muted-foreground">{form?.description}</p>
        <CreateReplyForm formId={form.id} fields={fields} />
      </div>
    </main>
  )
}

export default Page
