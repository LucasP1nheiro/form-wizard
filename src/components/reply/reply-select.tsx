import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'
import { useReplyFieldsStore } from '@/store/reply'
import { ReplyFields } from '@/types/reply'

interface ReplySelectProps {
  id: string
  label: string
  options: string[]
  required: boolean
}

const ReplySelect = ({ id, label, options, required }: ReplySelectProps) => {
  const { replyFields, setReplyFields } = useReplyFieldsStore()

  const handleSelect = (value: string) => {
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
        type: 'select',
      }
      setReplyFields([...replyFields, newField])
    }
  }

  return (
    <div className="flex items-start gap-2">
      <Select onValueChange={handleSelect} required={required}>
        <SelectTrigger className="w-[180px] bg-background z-20">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {required && <span className="text-primary">*</span>}
    </div>
  )
}

export default ReplySelect
