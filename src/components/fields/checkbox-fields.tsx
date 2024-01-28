import React from 'react'
import { Input } from '../ui/input'
import { CheckboxProps } from '@/types/components'
import { useComponentStore } from '@/store/components'

const CheckBoxFields = ({ id }: { id: string }) => {
  const { components, setComponents } = useComponentStore()

  const currentComponent = components.find((item) => item.id === id)

  const props = currentComponent?.props as CheckboxProps

  const handleLabelChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, label: text } } : item,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Add a label for this checkbox field."
        onChange={(e) => handleLabelChange(e.target.value)}
        value={props.label}
      />
    </div>
  )
}

export default CheckBoxFields
