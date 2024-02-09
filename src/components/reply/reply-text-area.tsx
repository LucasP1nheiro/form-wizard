import React, { ChangeEvent } from 'react'
import { Label } from '../ui/label'
import { useReplyFieldsStore } from '@/store/reply'
import { ReplyFields } from '@/types/reply'
import { Textarea } from '../ui/textarea'

type TextareaProps = {
  label: string
  id: string
  required: boolean
  placeholder: string
}

const ReplyTextArea = ({ label, id, required, placeholder }: TextareaProps) => {
  const { replyFields, setReplyFields } = useReplyFieldsStore()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target

    const fieldIndex = replyFields.findIndex((field) => field.id === id)

    if (fieldIndex !== -1) {
      const updatedFields = [...replyFields]
      updatedFields[fieldIndex] = { ...updatedFields[fieldIndex], value }
      setReplyFields(updatedFields)
    } else {
      const newField: ReplyFields = {
        id,
        label,
        value,
        type: 'text-area',
      }
      setReplyFields([...replyFields, newField])
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        {required && <span className="text-primary">*</span>}
      </div>
      <Textarea
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default ReplyTextArea
