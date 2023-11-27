import {TicketPurposeDashboardWrapper} from './styles.ts'
import {Card, Col} from 'antd'
import {SharedLineChart, SharedPieChart} from '~/common/SharedChart'
import {useEffect, useState} from "react";


function TicketPurposeDashboard() {

  const [lineData, setLineData] = useState([])

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
      <TicketPurposeDashboardWrapper gutter={12}>
        <Col span={18}>
          <Card title={'Purpose Overview'} bordered={false}>
            <SharedLineChart data={lineData} xField={'year'}
                             yField={'gdp'}
                             seriesField={'name'} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title={'Meeting Purpose'} bordered={false}>
            <SharedPieChart data={pieData} angleField={'value'}
                            colorField={'type'} />
          </Card>
        </Col>
      </TicketPurposeDashboardWrapper>
    </>
  )
}

export default TicketPurposeDashboard
