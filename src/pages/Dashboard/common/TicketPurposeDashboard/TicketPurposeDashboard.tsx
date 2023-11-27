import { TicketPurposeDashboardWrapper } from './styles.ts'
import { Card, Col } from 'antd'
import { SharedLineChart, SharedPieChart } from '~/common/SharedChart'
import React from 'react'
import { MultiLineResponse, PurposePieResponse } from '~/interface'

interface Props {
  ticketPurposeMultiLine: MultiLineResponse[]
  ticketPurposePie: PurposePieResponse[]
}

const TicketPurposeDashboard: React.FC<Props> = (props) => {

  return (
    <TicketPurposeDashboardWrapper gutter={12}>
      <Col span={18}>
        <Card title={'Purpose Overview'} bordered={false}>
          <SharedLineChart data={props.ticketPurposeMultiLine} xField={'time'}
                           yField={'value'}
                           seriesField={'type'} />
        </Card>
      </Col>
      <Col span={6}>
        <Card title={'Meeting Purpose'} bordered={false}>
          <SharedPieChart data={props.ticketPurposePie} angleField={'value'}
                          colorField={'type'} />
        </Card>
      </Col>
    </TicketPurposeDashboardWrapper>
  )
}

export default TicketPurposeDashboard
