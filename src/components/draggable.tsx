import { cn } from '@/lib/utils'
import { DragOverlay, useDraggable } from '@dnd-kit/core'

interface DraggableProps {
  id: string
  icon: React.ReactNode
}

const Overlay = ({
  isDragging,
  children,
}: {
  isDragging: boolean
  children: React.ReactNode
}) => {
  if (isDragging) {
    return <DragOverlay>{children}</DragOverlay>
  } else {
    return children
  }
}

export default function Draggable({ id, icon }: DraggableProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  })

  return (
    <Overlay isDragging={isDragging}>
      <div
        ref={setNodeRef}
        className={cn(
          'bg-card border border-border my-4 text-md p-4 rounded-md py-8 flex flex-col justify-center items-center gap-2',
          {
            'ring-4 ring-primary': isDragging,
          },
        )}
        {...listeners}
        {...attributes}
      >
        {icon}
        <span className="text-muted-foreground">{id}</span>
      </div>
    </Overlay>
  )
}
