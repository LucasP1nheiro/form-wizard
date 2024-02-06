import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DeleteFormAlertDialog = ({ formId }: { formId: number }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-border">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your form
            and remove all the replys related to it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all duration-300">
              Yes, delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteFormAlertDialog
