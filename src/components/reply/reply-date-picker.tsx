'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ReplyFields } from '@/types/reply'
import { useReplyFieldsStore } from '@/store/reply'

interface ReplyDatePickerProps {
  id: string
  placeholder: string
  label: string
  required: boolean
}

const ReplyDatePicker = ({
  id,
  placeholder,
  label,
  required,
}: ReplyDatePickerProps) => {
  const [date, setDate] = useState<Date>(new Date())

  const { replyFields, setReplyFields } = useReplyFieldsStore()

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate === undefined) {
      return
    }
    setDate(newDate)

    const fieldIndex = replyFields.findIndex((field) => field.id === id)

    if (fieldIndex !== -1) {
      const updatedFields = [...replyFields]
      updatedFields[fieldIndex] = {
        ...updatedFields[fieldIndex],
        value: date.toString(),
      }
      setReplyFields(updatedFields)
    } else {
      const newField: ReplyFields = {
        id,
        label,
        value: date.toString(),
        type: 'date-picker',
      }
      setReplyFields([...replyFields, newField])
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        {required && <span className="text-primary">*</span>}
      </div>
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
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 bg-background z-50 border border-border">
          <Calendar
            mode="single"
            selected={date || new Date()}
            onSelect={handleDateChange}
            initialFocus
            className="bg-background z-50"
            required={required}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ReplyDatePicker
