'use client'

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
import { deleteForm } from '@/data/forms'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form } from 'react-hook-form'
import { toast } from 'sonner'
import { ClipLoader } from 'react-spinners'
import { Database } from '@/db/schema'

type Form = Database['public']['Tables']['forms']['Row']

const DeleteFormAlertDialog = ({ formId }: { formId: number }) => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteFormFn, isPending } = useMutation({
    mutationFn: deleteForm,
    onSuccess: () => {
      queryClient.setQueryData(['forms'], (data: Form[]) => {
        const filtedForms = data.filter((form) => form.id !== formId)

        return filtedForms
      })

      toast.success('Form deleted', {
        description: `The form  was created successfully.`,
      })
    },
    onError: () => {
      toast.error('Error', {
        description: `Something went wrong on deleting this form`,
      })
    },
  })

  const handleDeleteForm = async () => {
    await deleteFormFn({ formId })
  }

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
            <Button
              className="bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2"
              onClick={handleDeleteForm}
            >
              {isPending && <ClipLoader size={18} color="secondary" />}
              <p>Yes, delete</p>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteFormAlertDialog
