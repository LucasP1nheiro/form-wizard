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
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Span } from 'next/dist/trace'
import { cn } from '@/lib/utils'

interface CreateReplyFormProps {
  fields: ComponentProps<keyof ComponentPropsMap>[]
  formId: number
}

const replyFormSchema = z.object({
  name: z.string().min(3, 'This field has to have at least 3 characters.'),
  email: z.string().email('Email is not valid.'),
})

type ReplyFormSchema = z.infer<typeof replyFormSchema>

const CreateReplyForm = ({ formId, fields }: CreateReplyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReplyFormSchema>({
    resolver: zodResolver(replyFormSchema),
  })

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

  const handleCreateReply = async (data: ReplyFormSchema) => {
    if (!errors.root) {
      const { name, email } = data

      const answers = JSON.stringify(replyFields)

      await createReplyFn({
        answers,
        formId,
        name,
        email,
      })
    }
  }

  return (
    <form
      id="form"
      className="lg:w-2/3 w-full space-y-14"
      onSubmit={handleSubmit(handleCreateReply)}
    >
      <div className="space-y-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your name here"
          {...register('name')}
          className={cn({
            'ring-2 ring-red-500 focus-visible:ring-red-500': errors.name,
          })}
        />
        {errors.name && (
          <p className="text-red-500 my-4">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="Enter your email here"
          {...register('email')}
          className={cn({
            'ring-2 ring-red-500 focus-visible:ring-red-500': errors.email,
          })}
        />
        {errors.email && (
          <p className="text-red-500 my-4">{errors.email.message}</p>
        )}
      </div>
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
