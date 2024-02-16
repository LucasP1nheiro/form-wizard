import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  BarChart,
} from 'recharts'
import CustomTooltip from '../charts/custom-tooltip'

export function ChartDemo() {
  const data = [
    { option: 'Option A', count: 25 },
    { option: 'Option B', count: 40 },
    { option: 'Option C', count: 30 },
    { option: 'Option D', count: 20 },
    { option: 'Option E', count: 10 },
  ]

  const colors = ['#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669']

  return (
    <div className="w-full h-full">
      <div className="h-96 w-full rounded-lg bg-black/5 dark:bg-white/5 duration-300 transition-all border border-border backdrop-blur-2xl z-30">
        <div className="h-8 border-b border-border w-full px-2 flex items-center gap-3 mb-5">
          <div className="w-4 h-4 rounded-full bg-emerald-500" />
          <div className="w-4 h-4 rounded-full bg-emerald-400" />
          <div className="w-4 h-4 rounded-full bg-emerald-300" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          >
            <XAxis dataKey="option" />
            <YAxis />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="count" fill="#8884d8" barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 5]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-32 w-32 bg-emerald-300 rounded-full relative bottom-56 md:left-[310px] left-36 -z-10 opacity-60" />
      <div className="h-32 w-32 bg-emerald-400 rounded-full relative bottom-96 md:left-[410px] left-36 -z-10 opacity-60" />
    </div>
  )
}
