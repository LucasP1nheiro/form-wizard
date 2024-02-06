'use client'

import { createReply } from '@/data/replys'
import { useReplyFieldsStore } from '@/store/reply'
import { FormReplyFields } from '@/utils/form-reply-fields'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'
import { ComponentPropsMap, ComponentProps } from '@/types/components'
import { FormEvent } from 'react'

interface CreateReplyFormProps {
  fields: ComponentProps<keyof ComponentPropsMap>[]
  formId: number
}

const CreateReplyForm = ({ formId, fields }: CreateReplyFormProps) => {
  const router = useRouter()
  const { replyFields, setReplyFields } = useReplyFieldsStore()

  const { mutateAsync: createReplyFn, isPending } = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      setReplyFields([])

      router.push('/reply-submitted')
    },
    onError: () => {
      toast.error('Error', {
        description: `Something went wrong on creating this form`,
      })
    },
  })

  const handleCreateReply = async (e: FormEvent) => {
    e.preventDefault()
    const answers = JSON.stringify(replyFields)

    await createReplyFn({ answers, formId })
  }

  return (
    <form
      id="form"
      className="lg:w-2/3 w-full space-y-14"
      onSubmit={handleCreateReply}
    >
      {fields.map((field) => (
        <FormReplyFields key={field.id} field={field} />
      ))}
      <div>
        <Button className="border border-emerald-200 bg-emerald-600 px-20 flex items-center gap-2">
          {isPending && <ClipLoader size={18} color="secondary" />}
          <p>Submit</p>
        </Button>
      </div>
    </form>
  )
}

export default CreateReplyForm
