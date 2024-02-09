import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useReplyFieldsStore } from '@/store/reply'
import { ReplyFields } from '@/types/reply'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  required: boolean
  placeholder: string
}

const ReplyInput: React.FC<InputProps> = ({
  label,
  id,
  required,
  placeholder,
  ...rest
}) => {
  const { replyFields, setReplyFields } = useReplyFieldsStore()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        type: 'input',
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
      <Input
        id={id}
        onChange={handleChange}
        required={required}
        {...rest}
        placeholder={placeholder}
      />
    </div>
  )
}

export default ReplyInput
