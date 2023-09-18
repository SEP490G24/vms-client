import React from 'react'
import { valueType } from 'antd/es/statistic/utils'
import { Card, Space } from 'antd'
import { SharedRadioGroup } from '~/common/SharedRadioGroup'
import { SharedDateRange } from '~/common/SharedDateRange'
import { SharedButton } from '~/common'

export interface ReportItemArgs {
  onSearch: () => void;
  titleLabel?: string;
  titleValue?: valueType;
}

const ReportItem: React.FC<ReportItemArgs> = (args) => {
  const onChangeDate = (valueString: [string, string]) => {
    console.log(valueString)
  }
  const radioOptions = [
    {
      label: 'Monthly',
      value: 'MONTHLY'
    },
    {
      label: 'Weekly',
      value: 'WEEKLY'
    },
    {
      label: 'Daily',
      value: 'DAILY'
    },
    {
      label: 'Manual Input',
      value: 'MANUAL'
    }
  ]
  return (
    <Card
      title={<p className={'flex items-center'}>{args.titleLabel}<span
        className={'text-primary-normal text-2xl ml-3'}>{args.titleValue}</span></p>}
      extra={
        <Space size={24}>
          <SharedRadioGroup options={radioOptions} />
          <Space size={8}>
            <SharedDateRange theme={'outline'} onChange={onChangeDate}></SharedDateRange>
            <SharedButton className={'h-fit px-2 py-1 text-[14px]'} theme={'search'} onClick={args.onSearch}/>
          </Space>
        </Space>}
      className={'h-[400px] rounded-tl-none shadow-none'} bordered={false}>
      <div className={'bg-amber-50'}></div>
    </Card>
  )
}

export default ReportItem
