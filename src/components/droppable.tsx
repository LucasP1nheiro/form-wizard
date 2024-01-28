import { cn } from '@/lib/utils'
import { useComponentStore } from '@/store/components'
import { useDroppable } from '@dnd-kit/core'

export default function Droppable({ children }: { children: React.ReactNode }) {
  const { components } = useComponentStore()

  const id = 'droppable'

  const { setNodeRef, over } = useDroppable({
    id,
  })

  const isOverAnotherItem = components.some((item) => item.id === over?.id)

  return (
    <section
      ref={setNodeRef}
      className={cn(
        'w-2/3 h-full rounded-md flex flex-col items-center justify-center',
        {
          'ring-4 ring-primary bg-primary/10':
            over?.id === id || isOverAnotherItem,
        },
      )}
    >
      {children}
    </section>
  )
}
