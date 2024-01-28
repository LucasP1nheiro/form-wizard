'use client'
import { Input } from '@/components/ui/input'
import { useComponentStore } from '@/store/components'
import { SubtitleProps } from '@/types/components'

const SubtitleFields = ({ id }: { id: string }) => {
  const { components, setComponents } = useComponentStore()

  const currentComponent = components.find((item) => item.id === id)

  const props = currentComponent?.props as SubtitleProps

  const handleSubtitleChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, text } } : item,
      ),
    )
  }

  return (
    <Input
      placeholder="Enter the text for this title"
      onChange={(e) => handleSubtitleChange(e.target.value)}
      value={props.text}
    />
  )
}

export default SubtitleFields
