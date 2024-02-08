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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy, LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

interface ShareFormProps {
  shareUrl: string
  text?: string
}

export function ShareForm({ shareUrl, text }: ShareFormProps) {
  const currentURL = window.location.origin

  const sendToast = () => {
    toast.success('Copied to clipboard')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={text ? 'sm' : 'icon'}>
          {text ?? <LinkIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-border">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Copy this link to send to other people.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={`${currentURL}/reply/${shareUrl}`}
              readOnly
            />
          </div>

          <Button
            size={'icon'}
            variant={'default'}
            asChild
            className="p-3 hover:cursor-pointer"
          >
            <CopyToClipboard
              text={`${currentURL}/reply/${shareUrl}`}
              onCopy={() => sendToast()}
            >
              <Copy className="h-4 w-4" />
            </CopyToClipboard>
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
