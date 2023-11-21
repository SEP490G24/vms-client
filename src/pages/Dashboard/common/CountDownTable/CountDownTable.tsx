import { HeaderDashboardWrapper } from './styles.ts'
import { Card, Col, CountdownProps, Row, Space } from 'antd'
import Countdown from 'antd/es/statistic/Countdown'
import { SharedStackedColumnChart } from '~/common/SharedChart'


function CountDownTable() {

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Dayjs is also OK

  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!')
  }
  return (
    <HeaderDashboardWrapper>
      <Row gutter={8}>
        <Col span={12}>
          <Card bordered={false}>
            <SharedStackedColumnChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Space size={8} direction={'horizontal'} wrap={true}>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
              <Card>
                <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
              </Card>
            </Space>
          </Card>
        </Col>
      </Row>
    </HeaderDashboardWrapper>
  )
}

export default CountDownTable
