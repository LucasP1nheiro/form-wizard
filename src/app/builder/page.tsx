'use client'

import { SortableItem } from '@/components/sortable-item'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import Draggable from '@/components/draggable'
import Droppable from '@/components/droppable'
import { availableComponents } from '@/utils/available-components'
import { getEmptyProps } from '@/utils/get-empty-props'
import { useComponentStore } from '@/store/components'
import { generateRandomString } from '@/utils/generate-random-string'
import { Preview } from '@/components/preview'
import { UploadIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const Page = () => {
  const { components, setComponents } = useComponentStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  function handleSorting(e: DragEndEvent) {
    const { active, over } = e

    if (active.id !== over?.id && components.length > 0) {
      const activeIndex = components.findIndex((item) => item.id === active.id)
      const overIndex = components.findIndex((item) => item.id === over?.id)

      const newComponents = arrayMove(components, activeIndex, overIndex)

      setComponents(newComponents)
    }
  }

  function addItem(e: DragEndEvent) {
    const { active, over } = e

    const isOverAnotherItem = components.some((item) => item.id === over?.id)

    if (over?.id === 'droppable' || isOverAnotherItem) {
      const newItem = availableComponents.find(
        (item) => item.name === active.id,
      )
      if (newItem) {
        const newComponent = {
          id: generateRandomString(10),
          type: newItem.type,
          props: getEmptyProps(newItem.type),
        }

        setComponents([...components, newComponent])
      }
    }
  }

  function deleteItem(id: string) {
    setComponents(components.filter((item) => item.id !== id))
  }

  return (
    <main className="w-screen min-h-screen bg-background py-32 space-y-5">
      <div className="w-4/5 mx-auto">
        <Preview />
      </div>
      <div className="flex items-start w-4/5 justify-between mx-auto">
        <DndContext
          sensors={sensors}
          onDragEnd={(event: DragEndEvent) => {
            const { active, over } = event

            const isAddingNewItem = availableComponents.some(
              (item) => item.name === active?.id,
            )

            if (isAddingNewItem && over) {
              return addItem(event)
            }

            return handleSorting(event)
          }}
        >
          <Droppable>
            <SortableContext
              items={components.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="h-full min-h-[700px] w-full flex flex-col gap-4 border bg-background border-border border-dashed rounded-md px-4 py-8">
                {components.map(
                  (component) =>
                    component !== undefined && (
                      <SortableItem
                        type={component.type}
                        key={component.id}
                        id={component.id}
                        deleteItem={() => deleteItem(component.id)}
                      />
                    ),
                )}
                {components.length === 0 && (
                  <div className="w-full h-full flex items-center text-center justify-center flex-col my-auto space-y-5">
                    <UploadIcon size={42} className="text-primary" />
                    <div className="space-y-8">
                      <h1 className="text-foreground text-2xl font-medium">
                        The form is empty
                      </h1>
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">
                          Drag and drop {''}
                        </strong>
                        components here to build your form.
                      </span>
                    </div>
                  </div>
                )}
              </ul>
            </SortableContext>
          </Droppable>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Draggable components</h1>
            <ScrollArea className="h-full max-h-[600px] p-4 flex flex-col gap-12">
              {availableComponents.map((item) => (
                <Draggable key={item.name} id={item.name} icon={item.icon} />
              ))}
            </ScrollArea>
          </div>
        </DndContext>
      </div>
    </main>
  )
}

export default Page
