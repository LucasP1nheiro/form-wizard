import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createForm } from '@/data/forms'
import { cn } from '@/lib/utils'
import { useComponentStore } from '@/store/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RocketIcon, Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Database } from '@/db/schema'
import { ClipLoader } from 'react-spinners'

type Form = Database['public']['Tables']['forms']['Row']

const formSchema = z.object({
  name: z.string().min(1, 'Add a name to this form'),
  description: z
    .string()
    .min(10, 'The description has to be at least 10 characters')
    .max(100, 'The description has to be 100 characters maximum.'),
})

type FormSchema = z.infer<typeof formSchema>

export function CreateFormDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const queryClient = useQueryClient()

  const { components, setComponents } = useComponentStore()

  const router = useRouter()

  const { mutateAsync: createFormFn, isPending } = useMutation({
    mutationFn: createForm,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['forms'], (data: Form[]) => {
        return [
          ...data,
          {
            name: variables.name,
            description: variables.description,
            fields: variables.fields,
          },
        ]
      })

      setComponents([])

      toast('Form created!', {
        icon: <RocketIcon className="h-4 w-4" />,
        description: `The form ${variables.name} was created successfully.`,
      })

      router.push('/')
    },
    onError: () => {
      toast.error('Error', {
        description: `Something went wrong on creating this form`,
      })
    },
  })

  const handleCreateForm = async ({ name, description }: FormSchema) => {
    if (errors.root) {
      return
    }

    const fields = JSON.stringify(components)

    await createFormFn({ name, description, fields })
  }

  const isFormEmpty = components.length === 0

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'secondary'}
          className="flex items-center gap-2 w-full lg:w-fit"
        >
          <Upload size={18} />
          <p>Publish</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-border">
        <DialogHeader>
          <DialogTitle>Form Publishing</DialogTitle>
          <DialogDescription>
            Finally, provide a name and description for the form. Once
            completed, it will be ready for publishing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateForm)} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Add a name to the form"
              className={cn({
                'ring-2 ring-red-500 focus-visible:ring-red-500': errors.name,
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Add a description to the form"
              className={cn({
                'ring-2 ring-red-500 focus-visible:ring-red-500':
                  errors.description,
              })}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="border border-emerald-200 bg-emerald-600  w-full flex items-center gap-2"
            disabled={isFormEmpty}
          >
            <ClipLoader size={18} color="secondary" />
            <p>Save</p>
          </Button>
        </form>
        {isFormEmpty && (
          <Alert className="border border-border">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Empty form!</AlertTitle>
            <AlertDescription>
              Try adding fields to publish this form
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  )
}
