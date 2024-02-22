import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from 'recharts'
import CustomTooltip from '../charts/custom-tooltip'

export function ChartDemo() {
  const data = [
    { day: '2024-02-01', submissions: 10 },
    { day: '2024-02-03', submissions: 20 },
    { day: '2024-02-05', submissions: 8 },
    { day: '2024-02-05', submissions: 23 },
  ]

  return (
    <div className="w-full h-full">
      <div className="h-96 w-full rounded-lg bg-black/5 dark:bg-white/5 duration-300 transition-all border border-border backdrop-blur-2xl z-30">
        <div className="h-8 border-b border-border w-full px-2 flex items-center gap-3 mb-5">
          <div className="w-4 h-4 rounded-full bg-emerald-500" />
          <div className="w-4 h-4 rounded-full bg-emerald-400" />
          <div className="w-4 h-4 rounded-full bg-emerald-300" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 70, right: 10, left: 5, bottom: 5 }}
          >
            <XAxis dataKey="day" opacity={0} />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="submissions"
              stroke="#34d399"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
