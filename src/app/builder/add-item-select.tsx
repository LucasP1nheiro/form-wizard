'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useComponentStore } from '@/store/components'
import { availableComponents } from '@/utils/available-components'
import { generateRandomString } from '@/utils/generate-random-string'
import { getEmptyProps } from '@/utils/get-empty-props'

const FormSchema = z.object({
  value: z.string({
    required_error: 'Please select an item to be added.',
  }),
})

export function AddItemSelect() {
  const { components, setComponents } = useComponentStore()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit({ value }: z.infer<typeof FormSchema>) {
    const newItem = availableComponents.find((item) => item.name === value)
    if (newItem) {
      const newComponent = {
        id: generateRandomString(10),
        type: newItem.type,
        props: getEmptyProps(newItem.type),
      }

      setComponents([...components, newComponent])
    }
  }

  return (
    <div className="w-full lg:hidden">
      {' '}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add item</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableComponents.map((item) => (
                      <SelectItem value={item.name} key={item.type}>
                        <div className="w-full flex items-center gap-2 p-1">
                          {item.icon}
                          <p>{item.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-accent-foreground hover:bg-accent-foreground/75 text-background transition-all duration-300"
          >
            Add
          </Button>
        </form>
      </Form>
    </div>
  )
}
