'use client'
import { Input } from '@/components/ui/input'
import { useComponentStore } from '@/store/components'
import { TitleProps } from '@/types/components'

const TitleFields = ({ id }: { id: string }) => {
  const { components, setComponents } = useComponentStore()

  const currentComponent = components.find((item) => item.id === id)

  const props = currentComponent?.props as TitleProps

  const handleTitleChange = (text: string) => {
    setComponents(
      components.map((item) =>
        item.id === id ? { ...item, props: { ...props, text } } : item,
      ),
    )
  }

  return (
    <Input
      placeholder="Enter the text for this title"
      onChange={(e) => handleTitleChange(e.target.value)}
      value={props.text}
    />
  )
}

export default TitleFields
