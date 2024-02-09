import { Label } from '@/components/ui/label'
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group'
import { useReplyFieldsStore } from '@/store/reply'
import { ReplyFields } from '@/types/reply'

interface ReplyRadioGruopProps {
  id: string
  label: string
  options: string[]
  required: boolean
}

const ReplyRadioGroup = ({
  id,
  label,
  options,
  required,
}: ReplyRadioGruopProps) => {
  const { replyFields, setReplyFields } = useReplyFieldsStore()

  const handleChange = (value: string) => {
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
        type: 'radio-group',
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
      <RadioGroup onValueChange={handleChange} required={required}>
        {options.map((option) => (
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

export default ReplyRadioGroup
