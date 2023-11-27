import React, { memo } from 'react'
import { Line } from '@ant-design/charts'
import { LineConfig } from '@ant-design/plots/es/components/line'

interface SharedLineChartProps {
  data: any,
  xField: string,
  yField: string,
  seriesField: string,
}

export const SharedLineChart: React.FC<SharedLineChartProps> = memo((props) => {

    const config: LineConfig = {
      animation: false,
      data: props.data,
      point: {
        shape: 'circle',
        size: 3
      },
      seriesField: props.seriesField,
      smooth: true,
      xField: props.xField,
      yAxis: {
        position: 'right'
      },
      yField: props.yField,
      legend: {
        position: 'bottom-right'
      },
    }

    return (
      <Line {...config} />
    )
  }
)
