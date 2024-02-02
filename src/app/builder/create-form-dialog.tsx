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
import supabase from '@/lib/supabase-browser'
import { cn } from '@/lib/utils'
import { useComponentStore } from '@/store/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { RocketIcon, Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Add a name to this form'),
  description: z
    .string()
    .min(10, 'The description has to be at least 10 characters'),
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

  const { components } = useComponentStore()

  const handleCreateForm = async ({ name, description }: FormSchema) => {
    if (errors.root) {
      return
    }

    const fields = JSON.stringify(components)

    await supabase.from('forms').insert({ name, description, fields })
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
            className="border border-emerald-200 bg-emerald-600  w-full"
            disabled={isFormEmpty}
          >
            Save
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
