import { getReplysByFormId } from '@/data/replys'
import { Database } from '@/db/schema'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FileX, Rocket } from 'lucide-react'
import { ShareForm } from '../share-form'
import { ReplyFields } from '@/types/reply'
import CustomBarChart from '../charts/custom-bar-chart'
import SubmissionsLineChart from '../charts/submissions-line-chart'
import ReplyTable from '../tables/reply-table'
import RepliesFromFormLoading from '../loading/replies-from-form-loading'

type Form = Database['public']['Tables']['forms']['Row']

interface RepliesFromFormProps {
  form: Form
}

const RepliesFromForm: React.FC<RepliesFromFormProps> = ({ form }) => {
  const { data: replies, isLoading } = useQuery({
    queryKey: ['replies', form.id],
    queryFn: () => getReplysByFormId({ formId: form.id }),
  })

  if (isLoading) {
    return <RepliesFromFormLoading />
  }

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

  const repliesAnswers: ReplyFields[] = replies.flatMap((reply) => {
    return JSON.parse(reply.answers as string).map((field: ReplyFields) => ({
      id: field.id,
      label: field.label,
      value: field.value,
      type: field.type,
    }))
  })

  const filteredRepliesAnswers = repliesAnswers.filter(
    (field) =>
      field.type !== 'input' &&
      field.type !== 'text-area' &&
      field.type !== 'date-picker',
  )

  const groupedData: { [key: string]: { [key: string]: number } } = {}
  filteredRepliesAnswers.forEach((item) => {
    if (!groupedData[item.label]) {
      groupedData[item.label] = {}
    }
    if (!groupedData[item.label][item.value]) {
      groupedData[item.label][item.value] = 1
    } else {
      groupedData[item.label][item.value]++
    }
  })

  const chartData: { label: string; value: number }[] = []
  for (const label in groupedData) {
    for (const value in groupedData[label]) {
      chartData.push({ label, value: groupedData[label][value] })
    }
  }

  return (
    <div className="w-full space-y-12">
      <div className="border border-border rounded-md p-4 w-fit space-y-5">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-foreground font-semibold">Total submissions</h3>
          <Rocket className="text-primary" size={24} />
        </div>
        <h1 className="text-5xl font-extrabold text-primary">
          {replies.length}
        </h1>
        <p className="dark:text-muted-foreground">
          Total submissions recorded from this form.
        </p>
      </div>
      <ReplyTable replies={replies} />
      <SubmissionsLineChart formName={form.name} replies={replies} />
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4">
        {Object.keys(groupedData).map((label, index) => (
          <CustomBarChart
            key={index}
            data={Object.entries(groupedData[label]).map(([value, count]) => ({
              value,
              count,
            }))}
            label={label}
            colors={['#f59e0b', '#34d399', '#8b5cf6', '#0ea5e9']}
          />
        ))}
      </div>
    </div>
  )
}

export default RepliesFromForm
