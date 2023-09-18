import { Card, Statistic } from 'antd'
import React from 'react'
import { valueType } from 'antd/es/statistic/utils'

export interface StatisticArgs {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  value?: valueType;
  precision?: number;
  valueColor?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

const StatisticItem: React.FC<StatisticArgs> = (args) => {
  return (
    <Card bordered={false}>
      <Statistic
        className='flex flex-row justify-around'
        title={<>{args.icon}{args.title}</>}
        value={args.value}
        precision={args.precision}
        valueStyle={{fontSize: 39, fontWeight: 600, color: args.valueColor}}
        suffix={args.suffix}
        prefix={args.prefix}
      />
    </Card>
  )
}

export default StatisticItem
