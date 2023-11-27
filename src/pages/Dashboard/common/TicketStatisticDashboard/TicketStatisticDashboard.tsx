import { STicketStatisticDashboardWrapper } from './styles.ts'
import { Col } from 'antd'
import React from 'react'
import { TotalTicketResponse, TotalVisitsResponse } from '~/interface'
import { TicketStatisticSection } from '~/pages'
import { useTranslation } from 'react-i18next'

interface Props {
  totalTicket: TotalTicketResponse
  totalVisits: TotalVisitsResponse
  filterLabel: string
}

const TicketStatisticDashboard: React.FC<Props> = (props) => {

  const { t } = useTranslation()

  return (
    <STicketStatisticDashboardWrapper gutter={12}>
      <Col span={12}>
        <TicketStatisticSection
          filterLabel={props.filterLabel}
          totalLabel={t('dashboard.statistic.totalTicket')}
          total={props.totalTicket.totalTicket}
          successLabel={t('dashboard.statistic.totalTicketCompleted')}
          successWithCondition={props.totalTicket.totalCompletedTicketWithCondition}
          success={props.totalTicket.totalCompletedTicket}
          failedLabel={t('dashboard.statistic.totalTicketCancel')}
          failedWithCondition={props.totalTicket.totalCancelTicketWithCondition}
          failed={props.totalTicket.totalCancelTicket}
        />
      </Col>
      <Col span={12}>
        <TicketStatisticSection
          filterLabel={props.filterLabel}
          totalLabel={t('dashboard.statistic.totalVisitor')}
          total={props.totalVisits.totalVisits}
          successLabel={t('dashboard.statistic.totalVisitorAccept')}
          successWithCondition={props.totalVisits.totalAcceptanceVisitsWithCondition}
          success={props.totalVisits.totalAcceptanceVisits}
          failedLabel={t('dashboard.statistic.totalVisitorReject')}
          failedWithCondition={props.totalVisits.totalRejectVisitsWithCondition}
          failed={props.totalVisits.totalRejectVisits}
        />
      </Col>
    </STicketStatisticDashboardWrapper>
  )
}

export default TicketStatisticDashboard
