import { PurposeMeetingDashboardWrapper } from './styles.ts'
import { Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { SharedLineChart, SharedPieChart } from '~/common/SharedChart'


function PurposeMeetingDashboard() {

  const [lineData, setLineData] = useState([])

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

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then((response) => response.json())
      .then((json) => setLineData(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }

  return (
    <PurposeMeetingDashboardWrapper>
      <Row gutter={16}>
        <Col span={18}>
          <Card bordered={false}>
            <SharedLineChart data={lineData} xField={'year'}
                             yField={'gdp'}
                             seriesField={'name'} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <SharedPieChart data={pieData} angleField={'value'}
                            colorField={'type'} />
          </Card>
        </Col>
      </Row>
    </PurposeMeetingDashboardWrapper>
  )
}

export default PurposeMeetingDashboard
