'use client'

import { getReplyByShareUrl } from '@/data/replys'
import { ReplyFields } from '@/types/reply'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BookText } from 'lucide-react'
import { formatDate } from 'date-fns'

interface PageProps {
  params: {
    slug: string
  }
}

const Page = ({ params: { slug } }: PageProps) => {
  const { data: replies } = useQuery({
    queryKey: ['reply', slug],
    queryFn: () => getReplyByShareUrl({ shareUrl: slug }),
  })

  if (!replies || replies.length === 0 || replies === undefined) {
    return null
  }

  const [reply] = replies

  const repliesAnswers: ReplyFields[] = replies.flatMap((reply) => {
    return JSON.parse(reply.answers as string).map((field: ReplyFields) => ({
      id: field.id,
      label: field.label,
      value:
        field.type === 'date-picker'
          ? formatDate(field.value, 'PPP')
          : field.value,
      type: field.type,
    }))
  })

  return (
    <main className="min-h-screen w-screen bg-background py-32">
      <div className="w-4/5 mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold">Name</h1>
          <p className="text-emerald-600 dark:text-primary">{reply.name}</p>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold">Email</h1>
          <p className="text-emerald-600 dark:text-primary">{reply.email}</p>
        </div>

        <div className="flex items-center gap-4">
          <BookText className="text-primary" size={24} />
          <h1 className="text-3xl font-extrabold">
            Here are the answers of this reply.
          </h1>
        </div>

        {repliesAnswers.map((answer) => (
          <div className="space-y-4" key={answer.id}>
            <h3 className="text-lg font-bold">{answer.label}</h3>
            <p className="dark:text-muted-foreground">{answer.value}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Page
