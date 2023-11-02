import { HeaderDashboardWrapper } from './styles.ts'
import { Card, Col, CountdownProps, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import Countdown from 'antd/es/statistic/Countdown'
import { Column } from '@ant-design/charts'


function CountDownTable() {

  const DemoColumn = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      asyncFetch()
    }, [])

    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error)
        })
    }
    const config = {
      data,
      isStack: true,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle' // 'top', 'bottom', 'middle'
      },
      interactions: [
        {
          type: 'active-region',
          enable: false
        }
      ],
      connectedArea: {
        style: (oldStyle, element) => {
          return {
            fill: 'rgba(0,0,0,0.25)',
            stroke: oldStyle.fill,
            lineWidth: 0.5
          }
        }
      }
    }

    return <Column {...config} />
  }

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Dayjs is also OK

  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!')
  }
  return (
    <HeaderDashboardWrapper>
      <Row gutter={8}>
        <Col span={12}>
          <Card bordered={false}>
            {DemoColumn()}
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
