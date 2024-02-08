'use client'

import { getReplysByFormId } from '@/data/replys'
import { Database } from '@/db/schema'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SubmissionsLineChart from '../charts/submissions-line-chart'
import { FileX } from 'lucide-react'
import { ShareForm } from '../share-form'

type Form = Database['public']['Tables']['forms']['Row']

interface RepliesFromFormProps {
  form: Form
}

const RepliesFromForm = ({ form }: RepliesFromFormProps) => {
  const { data: replies } = useQuery({
    queryKey: ['replies', form.id],
    queryFn: () => getReplysByFormId({ formId: form.id }),
  })

  if (!replies || replies.length === 0 || replies === undefined) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <FileX className="text-primary" size={32} />
        <p className="dark:text-muted-foreground text-center">
          Currently, there are no responses to this form. Click the button below
          to <strong className="text-primary">share</strong> this form.
        </p>
        <ShareForm shareUrl={form.share_url} text="Share" />
      </div>
    )
  }

  return (
    <div className="w-full space-y-12">
      <SubmissionsLineChart formName={form.name} replies={replies} />
    </div>
  )
}

export default RepliesFromForm
