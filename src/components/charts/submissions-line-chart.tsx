import { getReplysByFormId } from '@/data/replys'
import { Database } from '@/db/schema'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from 'date-fns'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import CustomTooltip from './custom-tooltip'

type Reply = Database['public']['Tables']['replys']['Row']

interface SubmissionsLineChartProps {
  formName: string
  replies: Reply[]
}

const SubmissionsLineChart = ({
  formName,
  replies,
}: SubmissionsLineChartProps) => {
  if (!replies || replies === undefined || replies.length === 0) {
    return null
  }

  const groupedReplies: { [key: string]: Reply[] } = replies.reduce(
    (acc: { [key: string]: Reply[] }, reply) => {
      const date = formatDate(new Date(reply.created_at), 'PPP')
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(reply)
      return acc
    },
    {},
  )

  const data = Object.keys(groupedReplies).map((date) => ({
    date,
    Submissions: groupedReplies[date].length,
  }))

  return (
    <div className="space-y-8 w-full h-[650px] p-8 pb-24 border border-border rounded-md">
      <h1 className="text-2xl font-extrabold text-center lg:text-start">
        Submissions over time
      </h1>
      <p className="text-muted-foreground text-center lg:text-start">
        This chart displays the number of submissions over time from the form{' '}
        <strong className="text-primary">{formName}</strong>.
      </p>
      <ResponsiveContainer width={'100%'}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip text="Submissions" />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Submissions"
            stroke="#10b981"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SubmissionsLineChart
