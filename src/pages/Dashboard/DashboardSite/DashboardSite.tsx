import { Space } from 'antd'
import { DashboardSiteWrapper } from './styles.ts'
import { OverviewFilterDashboard, PurposeOverviewDashboard, StatisticTicketDashboard } from '~/pages'
import TicketOverviewDashboard from '../common/TicketOverviewDashboard/TicketOverviewDashboard.tsx'
import MeetingCountDown from '../common/MeetingCountDown/MeetingCountDown.tsx'

const DashboardSite = () => {

  return (
    <DashboardSiteWrapper>
      <Space className={'w-full mb-10'} size={32} direction={'vertical'}>
        <OverviewFilterDashboard />
        <StatisticTicketDashboard />
        <TicketOverviewDashboard />
        <PurposeOverviewDashboard />
        <MeetingCountDown />
      </Space>
    </DashboardSiteWrapper>
  )
}

export default DashboardSite
