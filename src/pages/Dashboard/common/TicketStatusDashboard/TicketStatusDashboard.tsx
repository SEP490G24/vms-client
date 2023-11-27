import { TicketStatusDashboardWrapper } from './styles.ts'
import { Card, Col } from 'antd'
import { SharedStackedColumnChart } from '~/common/SharedChart'
import React from 'react'
import { MultiLineResponse } from '~/interface'

interface Props {
  ticketStateColumn: MultiLineResponse[]
  visitsStateColumn: MultiLineResponse[]
}

const TicketStatusDashboard: React.FC<Props> = (props) => {

  return (
    <TicketStatusDashboardWrapper gutter={12}>
      <Col span={12}>
        <Card title={'Ticket State'} bordered={false}>
          <SharedStackedColumnChart data={props.ticketStateColumn} xField={'time'} yField={'value'}
                                    seriesField={'type'} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title={'Customer Accept'} bordered={false}>
          <SharedStackedColumnChart data={props.visitsStateColumn} xField={'time'} yField={'value'}
                                    seriesField={'type'} />
        </Card>
      </Col>
    </TicketStatusDashboardWrapper>
  )
}

export default TicketStatusDashboard
