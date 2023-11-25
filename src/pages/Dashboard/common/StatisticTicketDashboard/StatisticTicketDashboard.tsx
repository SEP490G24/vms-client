import { StatisticTicketDashboardWrapper } from './styles.ts'
import CountUp from 'react-countup'
import { Card, Col, Statistic } from 'antd'


function StatisticTicketDashboard() {

  const formatter = (value: any) => <CountUp end={value} separator=',' />

  return (
    <StatisticTicketDashboardWrapper gutter={12}>
      <Col span={4}>
        <Card>
          <Statistic title='Total ticket' value={112893} formatter={formatter} />
        </Card>
      </Col>
      <Col span={4}>
        <Card>
          <Statistic title='Total ticket' value={112893} formatter={formatter} />
        </Card>
      </Col>
      <Col span={4}>
        <Card>
          <Statistic title='Total ticket' value={112893} formatter={formatter} />
        </Card>
      </Col>
      <Col span={4}>
        <Card>
          <Statistic title='Total ticket' value={112893} formatter={formatter} />
        </Card>
      </Col>
      <Col span={4}>
        <Card>
          <Statistic title='Total ticket' value={112893} formatter={formatter} />
        </Card>
      </Col>
      <Col span={4}>
        <Card>
          <Statistic title='Total ticket' value={112893} formatter={formatter} />
        </Card>
      </Col>
    </StatisticTicketDashboardWrapper>
  )
}

export default StatisticTicketDashboard
