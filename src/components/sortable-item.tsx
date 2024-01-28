'use client'

import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'
import { Button } from './ui/button'
import { MoreVertical, Trash2Icon } from 'lucide-react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import { cn } from '@/lib/utils'
import { availableComponents } from '@/utils/available-components'

interface SortableItemsProps {
  id: string
  deleteItem: (item: string) => void
  type:
    | 'title'
    | 'subtitle'
    | 'text area'
    | 'select'
    | 'check box'
    | 'input'
    | 'date picker'
    | 'radio group'
}

export function SortableItem({ deleteItem, id, type }: SortableItemsProps) {
  const [shouldDisableDragging, setShouldDisableDragging] = useState(false)
  const [shouldOpenSheet, setShouldOpenSheet] = useState(false)

  const component = availableComponents.find(
    (component) => component.type === type,
  )

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: shouldDisableDragging,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      className={cn(
        'cursor-grab bg-background border rounded-md border-border h-20 flex items-center justify-between w-full py-2 px-4 text-xl',
        { 'ring-4 ring-primary': isDragging },
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setShouldDisableDragging(false)}
      onMouseLeave={() => setShouldDisableDragging(true)}
    >
      <div className="flex items-center gap-4">
        {component?.icon}
        <span className="font-semibold">{component?.name}</span>
      </div>
      <div className="flex items-center gap-3">
        <Sheet open={shouldOpenSheet} onOpenChange={setShouldOpenSheet}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onMouseDown={() => setShouldOpenSheet(true)}
            >
              <MoreVertical />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="border border-border z-50 space-y-5"
            setShouldOpenSheet={setShouldOpenSheet}
          >
            <SheetHeader>
              <SheetTitle>Edit Subtitle field</SheetTitle>
              <SheetDescription>
                Make changes to your subtitle here. Click save when you done.
              </SheetDescription>
            </SheetHeader>
            {component?.sheetContent(id)}
            <SheetFooter className="absolute bottom-0 w-full pr-10 pb-4">
              <SheetClose asChild>
                <Button
                  type="submit"
                  onMouseDown={() => setShouldOpenSheet(false)}
                  className="w-full"
                >
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button
          onMouseDown={() => deleteItem(component?.name ?? '')}
          variant={'ghost'}
          size={'icon'}
        >
          <Trash2Icon />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </li>
  )
}
