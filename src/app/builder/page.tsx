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
import { Lightbulb, UploadIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CreateFormDialog } from './create-form-dialog'
import { AddItemSelect } from './add-item-select'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

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
    <main className="w-screen min-h-screen bg-background py-32 space-y-5 p-4">
      <div className="lg:w-4/5 w-full mx-auto flex flex-col lg:flex-row items-center gap-4 justify-end">
        <Preview />
        <CreateFormDialog />
        <AddItemSelect />
      </div>

      <div className="flex items-start w-full lg:w-4/5 justify-between gap-8 mx-auto flex-col lg:flex-row">
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
          <aside className="lg:flex flex-col hidden w-1/3 gap-3">
            <h1 className="2xl:text-2xl text-lg font-bold">Components</h1>
            <p>
              Here&apos;s a list of components you can add to the form. To add,
              just{' '}
              <strong className="text-primary font-bold">drag and drop</strong>{' '}
              them into the droppable area.
            </p>
            <Alert className="border border-border">
              <Lightbulb className="w-4 h-4 stroke-primary" />
              <AlertTitle>Quick Tip</AlertTitle>
              <AlertDescription>
                After adding a component, explore its settings to customize its
                properties.
              </AlertDescription>
            </Alert>
            <ScrollArea className="h-full max-h-[600px] py-4 pr-4 flex flex-col gap-12">
              {availableComponents.map((item) => (
                <Draggable key={item.name} id={item.name} icon={item.icon} />
              ))}
            </ScrollArea>
          </aside>
          <Droppable>
            <SortableContext
              items={components.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="h-full min-h-[800px] w-full flex flex-col gap-4 border bg-background border-border border-dashed rounded-md px-4 py-8">
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
                    <div className="space-y-4">
                      <h1 className="text-foreground text-2xl font-medium">
                        The form is empty
                      </h1>
                      <span className="text-muted-foreground hidden lg:block">
                        <strong className="text-primary font-bold">
                          Drag and drop {''}
                        </strong>
                        components here to build your form.
                      </span>
                      <span className="block lg:hidden">
                        Add components here to build your form.
                      </span>
                    </div>
                  </div>
                )}
              </ul>
            </SortableContext>
          </Droppable>
        </DndContext>
      </div>
    </main>
  )
}

export default Page
