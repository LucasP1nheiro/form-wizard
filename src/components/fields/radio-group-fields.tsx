'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Plus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { RadioGroupProps } from '@/types/components'
import { useComponentStore } from '@/store/components'

const textSchema = z.object({
  text: z.string().max(30, {
    message: 'The text must not exceed 30 characters.',
  }),
})

type TextSchema = z.infer<typeof textSchema>

const RadioGroupFields = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TextSchema>({
    resolver: zodResolver(textSchema),
  })

  const { components, setComponents } = useComponentStore()

  const currentComponent = components.find((item) => item.id === id)

  const props = currentComponent?.props as RadioGroupProps

  const handleLabelChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, label: text } } : item,
      ),
    )
  }

  const handleAddOption = ({ text }: TextSchema) => {
    if (!errors.text) {
      setComponents(
        components.map((item) =>
          item.id === id
            ? {
                ...item,
                props: { ...props, options: [...props.options, text] },
              }
            : item,
        ),
      )

      reset({ text: '' })
    }
  }

  const handleDeleteOption = (optionToDelete: string) => {
    setComponents(
      components.map((item) =>
        item.id === id
          ? {
              ...item,
              props: {
                ...item.props,
                options: props.options.filter(
                  (option) => option !== optionToDelete,
                ),
              },
            }
          : item,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Add a label for this radio group field"
        onChange={(e) => handleLabelChange(e.target.value)}
        value={props.label}
      />
      <form
        onSubmit={handleSubmit(handleAddOption)}
        className="flex items-start gap-2"
      >
        <div className="flex flex-col gap-3 w-full">
          <Input
            placeholder="Add a new option for this radio group field"
            {...register('text')}
            className={cn('w-auto', {
              'ring-2 ring-red-500 focus-visible:ring-red-500': errors.text,
            })}
          />
          {errors.text && (
            <span className="text-sm text-red-500">{errors.text?.message}</span>
          )}
        </div>
        <Button size="icon" className="p-2" type="submit">
          <span className="sr-only">Add new option</span>
          <Plus />
        </Button>
      </form>

      {props.options.map((option) => (
        <div key={option} className="flex items-center gap-3">
          <Badge variant="outline">{option}</Badge>
          <Button
            size="icon"
            variant={'outline'}
            className="h-6 w-6 p-1"
            onClick={() => handleDeleteOption(option)}
          >
            <span className="sr-only">Delete this option</span>
            <X />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default RadioGroupFields
