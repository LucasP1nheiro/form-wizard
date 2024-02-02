import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useComponentStore } from '@/store/components'
import { PreviewComponents } from '@/utils/preview-components'
import { Eye } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'

export function Preview() {
  const { components } = useComponentStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full lg:w-fit"
        >
          <Eye />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-96 border border-border">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>
            Here&apos;s a brief preview of what your form looks like.
          </DialogDescription>
        </DialogHeader>
        {components.length > 0 && (
          <div className="space-y-4">
            <ScrollArea className="w-full h-full max-h-[600px] rounded-md border border-border p-4 flex flex-col">
              {components.map((component) => (
                <div className="px-4 py-2" key={component.id}>
                  <PreviewComponents component={component} />
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
