'use client'

import { getReplyByShareUrl } from '@/data/replys'
import { ReplyFields } from '@/types/reply'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BookText, Clock, Mails, UserRound } from 'lucide-react'
import { formatDate } from 'date-fns'
import ReplyLoading from '@/components/loading/reply-loading'

interface PageProps {
  params: {
    slug: string
  }
}

const Page = ({ params: { slug } }: PageProps) => {
  const { data: replies, isLoading } = useQuery({
    queryKey: ['reply', slug],
    queryFn: () => getReplyByShareUrl({ shareUrl: slug }),
  })

  if (isLoading) {
    return <ReplyLoading />
  }

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
    <main className="min-h-screen w-screen bg-background py-32 p-4">
      <div className="lg:w-4/5 mx-auto space-y-12 w-full">
        <section className="flex items-center justify-between flex-col xl:flex-row gap-8 xl:gap-0">
          <div className="p-4 rounded-md border border-border w-full xl:w-[300px] flex items-center gap-4 truncate">
            <UserRound className="text-primary" />
            <p className="dark:text-muted-foreground">{reply.name}</p>
          </div>
          <div className="p-4 rounded-md border border-border w-full xl:w-[300px] flex items-center gap-4 truncate">
            <Mails className="text-primary" />
            <p className="dark:text-muted-foreground">{reply.email}</p>
          </div>

          <div className="p-4 rounded-md border border-border w-full xl:w-[300px] flex items-center gap-4 truncate">
            <Clock className="text-primary" />
            <p className="dark:text-muted-foreground">
              {formatDate(reply.created_at, 'PPP p')}
            </p>
          </div>
        </section>

        <div className="flex lg:items-center gap-4 flex-col lg:flex-row">
          <BookText className="text-primary" size={36} />
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
