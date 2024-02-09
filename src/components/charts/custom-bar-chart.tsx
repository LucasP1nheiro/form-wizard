import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  Cell,
} from 'recharts'
import CustomTooltip from './custom-tooltip'

interface CustomChartProps {
  data: { value: string; count: number }[]
  label: string
  colors: string[]
}

const CustomBarChart: React.FC<CustomChartProps> = ({
  data,
  label,
  colors,
}) => {
  const barColors = data.map((_, index) => colors[index % colors.length])

  return (
    <div className="w-full  space-y-4 h-[350px] p-8 rounded-md border border-border">
      <h1 className="text-2xl font-bold">{label}</h1>
      <ResponsiveContainer width={'100%'}>
        <BarChart
          data={data}
          margin={{ top: 50, right: 20, left: 20, bottom: 30 }}
        >
          <XAxis dataKey="value" />
          <YAxis allowDecimals={false} />
          <Tooltip
            content={<CustomTooltip text="Votes" />}
            cursor={{ fill: 'transparent' }}
          />

          <Bar barSize={40} dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % 3]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
