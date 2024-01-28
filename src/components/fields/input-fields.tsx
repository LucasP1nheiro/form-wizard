'use client'

import { Switch } from '../ui/switch'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useComponentStore } from '@/store/components'
import { InputProps } from '@/types/components'

const InputFields = ({ id }: { id: string }) => {
  const { components, setComponents } = useComponentStore()

  const currentComponent = components.find((item) => item.id === id)

  const props = currentComponent?.props as InputProps

  const handlePlaceholderChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id
          ? { ...item, props: { ...props, placeholder: text } }
          : item,
      ),
    )
  }

  const handleLabelChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, label: text } } : item,
      ),
    )
  }

  const handleRequiredChange = (required: boolean) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, required } } : item,
      ),
    )
  }

  return (
    <div className="space-y-5">
      <Input
        placeholder="Enter the placeholder for this input"
        onChange={(e) => handlePlaceholderChange(e.target.value)}
        value={props.placeholder}
      />
      <Input
        placeholder="Enter the label for this input"
        onChange={(e) => handleLabelChange(e.target.value)}
        value={props.label}
      />
      <div className="flex items-center justify-between">
        <Label>Is this input field required?</Label>
        <Switch
          onCheckedChange={() => handleRequiredChange(!props.required)}
          checked={props.required}
        />
      </div>
    </div>
  )
}

export default InputFields
