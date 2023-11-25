import { TicketOverviewDashboardWrapper } from './styles.ts'
import { Card, Col } from 'antd'
import { SharedPieChart, SharedStackedColumnChart } from '~/common/SharedChart'


function TicketOverviewDashboard() {

  const pieData = [
    {
      type: '分类一',
      value: 27
    },
    {
      type: '分类二',
      value: 25
    },
    {
      type: '分类三',
      value: 18
    },
    {
      type: '分类四',
      value: 15
    },
    {
      type: '分类五',
      value: 10
    },
    {
      type: '其他',
      value: 5
    }
  ]

  return (
    <>
      <TicketOverviewDashboardWrapper gutter={12}>
        <Col span={12}>
          <Card title={'Ticket Accept'}  bordered={false}>
            <SharedStackedColumnChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'Meeting Purpose'} bordered={false}>
            <SharedPieChart data={pieData} angleField={'value'}
                            colorField={'type'} />
          </Card>
        </Col>
      </TicketOverviewDashboardWrapper>
    </>
  )
}

export default TicketOverviewDashboard
