import React from 'react'
import { valueType } from 'antd/es/statistic/utils'
import { Card } from 'antd'
import { SharedPieChart } from '~/common/SharedChart'

export interface ChartItemArgs {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  value?: valueType;
  precision?: number;
  valueColor?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const ChartItem: React.FC<ChartItemArgs> = (args) => {
  return (
    <Card title={args.title} className={'h-[400px]'}>
      <SharedPieChart />
    </Card>
  )
}

export default ChartItem
