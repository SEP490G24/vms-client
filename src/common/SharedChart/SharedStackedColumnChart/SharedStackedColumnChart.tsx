import React, { memo } from 'react'
import { Column, ColumnConfig } from '@ant-design/charts'

interface SharedStackedColumnChartProps {
  data: any,
  xField: string,
  yField: string,
  seriesField: string,
}

export const SharedStackedColumnChart: React.FC<SharedStackedColumnChartProps> = memo((props) => {

    const config: ColumnConfig = {
      data: props.data,
      isStack: true,
      xField: props.xField,
      yField: props.yField,
      seriesField: props.seriesField,
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle' // 'top', 'bottom', 'middle'
      },
      interactions: [
        {
          type: 'active-region',
          enable: false
        }
      ],
      connectedArea: {
        style: (oldStyle, _) => {
          return {
            fill: 'rgba(0,0,0,0.25)',
            stroke: oldStyle.fill,
            lineWidth: 0.5
          }
        }
      }
    }

    return (
      <Column {...config} />
    )
  }
)
