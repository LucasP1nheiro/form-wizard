'use client'
import { useComponentStore } from '@/store/components'
import { ParagraphProps } from '@/types/components'
import { Textarea } from '../ui/textarea'

const ParagraphFields = ({ id }: { id: string }) => {
  const { components, setComponents } = useComponentStore()

  const currentComponent = components.find((item) => item.id === id)

  const props = currentComponent?.props as ParagraphProps

  const handleParagraphChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, text } } : item,
      ),
    )
  }

  return (
    <Textarea
      placeholder="Enter the text for this paragraph..."
      onChange={(e) => handleParagraphChange(e.target.value)}
      value={props.text}
    />
  )
}

export default ParagraphFields
