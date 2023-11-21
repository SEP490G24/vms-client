import { Space } from 'antd'
import { DashboardSiteWrapper } from './styles.ts'
import { CountDownTable, PurposeMeetingDashboard, StatisticTicketDashboard } from '~/pages'

const DashboardSite = () => {

  return (
    <DashboardSiteWrapper>
      <Space className={'w-full'} size={32} direction={'vertical'}>
        <StatisticTicketDashboard />
        <PurposeMeetingDashboard />
        <CountDownTable />
      </Space>
    </DashboardSiteWrapper>
  )
}

export default DashboardSite
