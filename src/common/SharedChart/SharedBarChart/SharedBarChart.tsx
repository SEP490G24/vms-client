import React, { memo } from 'react'
import { Bar } from '@ant-design/charts'
import { BarConfig } from '@ant-design/plots/es/components/bar'
import { themes } from '~/themes'

interface SharedBarChartProps {
  data: Record<string, any>[],
  xField?: string,
  yField?: string,
}

export const SharedBarChart: React.FC<SharedBarChartProps> = memo((props) => {

    const config: BarConfig = {
      data: props.data,
      xField: props.xField ?? 'value',
      yField: props.yField ?? 'label',
      seriesField: props.yField,
      color: [themes.tertiary, themes.primary.normal],
      legend: {
        position: 'bottom-right'
      }
    }

    return (
      <Bar {...config} />
    )

  }
)
