import React from 'react'
import { Input } from '../ui/input'
import { useComponentStore } from '@/store/components'
import { DatePickerProps } from '@/types/components'

const DatePickerFields = ({ id }: { id: string }) => {
  const { components, setComponents } = useComponentStore()

  const currentComponent = components.find((item) => item.id === id)

  const props = currentComponent?.props as DatePickerProps

  const handleLabelChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, label: text } } : item,
      ),
    )
  }

  const handlePlaceholderChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id
          ? { ...item, props: { ...props, placeholder: text } }
          : item,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Add a placeholder for this date picker field"
        onChange={(e) => handlePlaceholderChange(e.target.value)}
        value={props.placeholder}
      />
      <Input
        placeholder="Add a label for this date picker field"
        onChange={(e) => handleLabelChange(e.target.value)}
        value={props.label}
      />
    </div>
  )
}

export default DatePickerFields
