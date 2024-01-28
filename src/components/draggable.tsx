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
          'bg-accent border border-border text-md p-4 rounded-md py-8 flex flex-col justify-center items-center gap-2',
          {
            'ring-4 ring-primary': isDragging,
            'hover:bg-secondary/50 duration-300 transition-all': !isDragging,
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
