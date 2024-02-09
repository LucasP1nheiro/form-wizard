import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useReplyFieldsStore } from '@/store/reply'
import { ReplyFields } from '@/types/reply'

interface ReplyCheckBoxProps {
  id: string
  label: string
}

const ReplyCheckBox = ({ id, label }: ReplyCheckBoxProps) => {
  const { replyFields, setReplyFields } = useReplyFieldsStore()

  const handleChange = (bool: boolean) => {
    const value = bool ? 'yes' : 'no'

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
        type: 'check-box',
      }
      setReplyFields([...replyFields, newField])
    }
  }
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} onCheckedChange={handleChange} />
      <Label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </Label>
    </div>
  )
}

export default ReplyCheckBox
