import { Tabs } from 'antd'
import React from 'react'
import { ReportItem } from './ReportItem'
import { TabWrapper } from './styles.ts'
import { SharedButton } from '~/common'

export interface StatisticArgs {
  downloadHandler: () => void
  searchHandler: () => void
}

const Reports: React.FC<StatisticArgs> = (props) => {

  const onChange = (key: string) => {
    console.log(key)
  }

  const items = [
    {
      key: "tab1",
      label: "Message",
      children: <ReportItem titleLabel={'Total Messages'} titleValue={232301} onSearch={props.searchHandler}/>
    },
    {
      key: "tab2",
      label: "Response Time",
      children: <ReportItem titleLabel={'Avg Response Time'} titleValue={2.1} onSearch={props.searchHandler}/>
    },
    {
      key: "tab3",
      label: "Resourse Usage",
      children: <ReportItem titleLabel={'Total Resourse Usage'} titleValue={312} onSearch={props.searchHandler}/>
    }
  ]

  return (
    <TabWrapper>
      <Tabs
        tabBarExtraContent={<SharedButton className={'h-[36px]'} theme={'default'} onClick={props.downloadHandler}>Download</SharedButton>}
        onChange={onChange}
        className={'m-0 drop-shadow-sm'}
        type='card'
        items={items}
      />
    </TabWrapper>
  )
}

export default Reports
