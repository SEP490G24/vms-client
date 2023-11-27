import {TicketStatusDashboardWrapper} from './styles.ts'
import {Card, Col} from 'antd'
import {SharedStackedColumnChart} from '~/common/SharedChart'

function TicketStatusDashboard() {

  return (
    <>
      <TicketStatusDashboardWrapper gutter={12}>
        <Col span={12}>
          <Card title={'Ticket Accept'}  bordered={false}>
            <SharedStackedColumnChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'Ticket Accept'}  bordered={false}>
            <SharedStackedColumnChart />
          </Card>
        </Col>
      </TicketStatusDashboardWrapper>

    </>
  )
}

export default TicketStatusDashboard
