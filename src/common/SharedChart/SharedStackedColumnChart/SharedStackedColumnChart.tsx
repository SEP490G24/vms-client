import React, { memo, useEffect, useState } from 'react'
import { Column, ColumnConfig } from '@ant-design/charts'

interface SharedPieChartProps {
  data?: Record<string, any>[],
  angleField?: string,
  colorField?: string,
  titleContent?: string
}

export const SharedStackedColumnChart: React.FC<SharedPieChartProps> = memo(() => {

    const [data, setData] = useState([])

    useEffect(() => {
      asyncFetch()
    }, [])

    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error)
        })
    }

    const config: ColumnConfig = {
      data,
      isStack: true,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
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
