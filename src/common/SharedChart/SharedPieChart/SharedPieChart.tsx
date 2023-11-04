import React, { memo } from 'react'
import { Pie } from '@ant-design/charts'
import { PieConfig } from '@ant-design/plots/es/components/pie'

interface SharedPieChartProps {
  data: Record<string, any>[],
  angleField?: string,
  colorField?: string,
  titleContent?: string
}

export const SharedPieChart: React.FC<SharedPieChartProps> = memo((props) => {

    const config: PieConfig = {
      appendPadding: 10,
      data: props.data,
      angleField: props.angleField ?? 'value',
      colorField: props.colorField ?? 'type',
      // color: [themes.tertiary, themes.primary.normal],
      radius: 1,
      innerRadius: 0.5,
      label: {
        type: 'inner',
        offset: '-50%',
        content: `{${props.angleField ?? 'value'}}`,
        style: {
          textAlign: 'center',
          fontSize: 14
        }
      },
      interactions: [
        {
          type: 'element-selected'
        },
        {
          type: 'element-active'
        }
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          },
          content: props.titleContent
        }
      }
    }

    return (
      <Pie {...config} />
    )
  }
)
