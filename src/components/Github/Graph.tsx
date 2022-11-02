import { useEffect, useState } from 'react'
import { userDetails } from 'lib/types'
import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import CustomToolTip from './ToolTip'

interface Props {
  userData: userDetails | undefined
}

type ContributionData = {
  day: number
  contributions: number
}[]

const Graph = ({ userData }: Props) => {
  const [data, setData] = useState<ContributionData | undefined>(undefined)

  const getUpperLimit = () => {
    if (userData?.contributions)
      return 5 * ((Math.max.apply(Math, userData.contributions) % 5) + 1)
  }

  useEffect(() => {
    const returnData: ContributionData = []
    if (userData)
      userData.contributions.map((total, i) =>
        returnData.push({ day: i + 1, contributions: total }),
      )
    setData(returnData)
  }, [userData])

  if (!data) return null

  return (
    <>
      <ResponsiveContainer height={350}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#36D399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2E3440" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <XAxis
            tickLine={false}
            axisLine={{ stroke: '#76797d', strokeOpacity: 0.6 }}
            tick={{ stroke: '#76797d' }}
            dataKey="day"
          />
          <YAxis
            tick={{ stroke: '#76797d' }}
            tickLine={false}
            axisLine={{ stroke: '#76797d', strokeOpacity: 0.6 }}
            domain={[0, getUpperLimit() || 30]}
          />
          <Tooltip content={<CustomToolTip />} cursor={false} />
          <Area
            type="monotone"
            dataKey="contributions"
            stroke="#36D399"
            strokeOpacity={0.3}
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#colorContributions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default Graph
