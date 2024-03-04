'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useComponentStore } from '@/store/components'
import {
  CheckboxProps,
  ComponentProps,
  ComponentPropsMap,
  DatePickerProps,
  InputProps,
  ParagraphProps,
  RadioGroupProps,
  SelectProps,
  SubtitleProps,
  TextareaProps,
  TitleProps,
} from '@/types/components'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group'

interface PreviewComponentsProps {
  component: ComponentProps<keyof ComponentPropsMap>
}

export function PreviewComponents({
  component,
}: PreviewComponentsProps): React.ReactNode {
  const [date, setDate] = React.useState<Date>()

  const { components } = useComponentStore()

  const currentComponent = components.find((item) => item.id === component.id)

  switch (component.type) {
    case 'title': {
      const props = currentComponent?.props as TitleProps

      return <h1 className="text-3xl font-bold">{props?.text}</h1>
    }

    case 'subtitle': {
      const props = currentComponent?.props as SubtitleProps

      return <h2 className="text-xl font-semibold">{props?.text}</h2>
    }

    case 'input': {
      const props = currentComponent?.props as InputProps

      return (
        <div className="space-y-2">
          <Label>{props.label}</Label>
          <Input placeholder={props.placeholder} className="max-w-[420px]" />
        </div>
      )
    }

    case 'text area': {
      const props = currentComponent?.props as TextareaProps

      return (
        <div className="space-y-2">
          <Label>{props.label}</Label>
          <Textarea placeholder={props.placeholder} className="max-w-[420px]" />
        </div>
      )
    }

    case 'date picker': {
      const props = currentComponent?.props as DatePickerProps

      return (
        <div className="flex flex-col gap-4">
          <Label>{props.label}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>{props.placeholder}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 bg-background">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )
    }

    case 'select': {
      const props = currentComponent?.props as SelectProps

      return (
        <Select>
          <SelectTrigger className="w-[180px] bg-background">
            <SelectValue placeholder={props.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{props.label}</SelectLabel>
              {props.options.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    }

    case 'check box': {
      const props = currentComponent?.props as CheckboxProps

      return (
        <div className="flex items-center space-x-2">
          <Checkbox id={component.id} />
          <Label
            htmlFor={component.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {props.label}
          </Label>
        </div>
      )
    }

    case 'radio group': {
      const props = currentComponent?.props as RadioGroupProps

      return (
        <div className="space-y-2">
          <Label>{props.label}</Label>
          <RadioGroup>
            {props.options.map((option) => (
              <div className="flex items-center space-x-2" key={option}>
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    }

    case 'paragraph': {
      const props = currentComponent?.props as ParagraphProps

      return <p className="text-muted-foreground">{props.text}</p>
    }
  }
}
