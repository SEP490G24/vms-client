import { DashboardWrapper } from './styles.ts'
import { CountDownTable } from '~/pages/Dashboard/CountDownTable'
import { Space } from 'antd'
import { PurposeMeetingDashboard } from '~/pages/Dashboard/PurposeMeetingDashboard'
import StatisticTicketDashboard from './StatisticTicketDashboard/StatisticTicketDashboard.tsx'

const Dashboard = () => {


  return (
    <DashboardWrapper>
      <Space className={'w-full'} size={32} direction={'vertical'}>
        <StatisticTicketDashboard />
        <PurposeMeetingDashboard />
        <CountDownTable />
      </Space>
    </DashboardWrapper>
  )
}

export default Dashboard
