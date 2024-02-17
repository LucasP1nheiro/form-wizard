'use client'

import DeleteFormAlertDialog from '@/components/delete-form-alert-dialog'
import RepliesFromForm from '@/components/reply/replies-from-form'
import { ShareForm } from '@/components/share-form'
import { getFormById } from '@/data/forms'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { notFound } from 'next/navigation'
import React from 'react'

interface FormProps {
  formId: number
  userId: string
}

const Form = ({ formId, userId }: FormProps) => {
  const { data: form, isLoading } = useQuery({
    queryKey: ['form-by-id', formId],
    queryFn: () => getFormById({ formId, userId }),
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (form === undefined || !form) {
    return notFound()
  }
  return (
    <div className="lg:w-4/5 mx-auto min-h-screen py-32 space-y-20 w-full">
      <section className="space-y-6 w-full">
        <div className="w-full justify-between flex items-center">
          <h1 className="text-3xl font-extrabold truncate">{form?.name}</h1>

          <div className="flex items-center gap-2">
            {form?.share_url && <ShareForm shareUrl={form?.share_url} />}
            <DeleteFormAlertDialog formId={formId} />
          </div>
        </div>
        {form?.created_at && (
          <p>Created {formatDistanceToNow(form?.created_at)} ago.</p>
        )}
        <p className="dark:text-muted-foreground">{form?.description}</p>
      </section>
      {form && <RepliesFromForm form={form} />}
    </div>
  )
}

export default Form
