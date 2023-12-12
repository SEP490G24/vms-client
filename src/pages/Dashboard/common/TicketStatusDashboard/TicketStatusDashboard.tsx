import { TicketStatusDashboardWrapper } from './styles.ts'
import { Card, Col } from 'antd'
import { SharedStackedColumnChart } from '~/common/SharedChart'
import React from 'react'
import { MultiLineResponse } from '~/interface'
import { useTranslation } from 'react-i18next'

interface Props {
  ticketStateColumn: MultiLineResponse[]
  visitsStateColumn: MultiLineResponse[]
}

const TicketStatusDashboard: React.FC<Props> = (props) => {

  const { t } = useTranslation()

  return (
    <TicketStatusDashboardWrapper gutter={12}>
      <Col span={12}>
        <Card title={t('dashboard.state.ticket')} bordered={false}>
          <SharedStackedColumnChart data={props.ticketStateColumn} xField={'time'} yField={'value'}
                                    seriesField={'type'} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title={t('dashboard.state.visitor')} bordered={false}>
          <SharedStackedColumnChart data={props.visitsStateColumn} xField={'time'} yField={'value'}
                                    seriesField={'type'} />
        </Card>
      </Col>
    </TicketStatusDashboardWrapper>
  )
}

export default TicketStatusDashboard
