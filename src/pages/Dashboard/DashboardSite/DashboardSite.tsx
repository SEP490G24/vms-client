import {Space} from 'antd'
import {DashboardSiteWrapper} from './styles.ts'
import {
  MeetingCountDown,
  OverviewFilterDashboard,
  StatisticTicketDashboard,
  TicketPurposeDashboard,
  TicketStatusDashboard
} from '~/pages'

const DashboardSite = () => {

  return (
    <DashboardSiteWrapper>
      <Space className={'w-full mb-10'} size={32} direction={'vertical'}>
        <OverviewFilterDashboard />
        <TicketStatusDashboard />
        <StatisticTicketDashboard />
        <TicketPurposeDashboard />
        <MeetingCountDown />
      </Space>
    </DashboardSiteWrapper>
  )
}

export default DashboardSite
