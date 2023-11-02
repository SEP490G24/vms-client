import { PurposeMeetingDashboardWrapper } from './styles.ts'
import { Card, Col, Row } from 'antd'
import { Line, Pie } from '@ant-design/charts'
import { useEffect, useState } from 'react'


function PurposeMeetingDashboard() {

  const DemoPie = () => {
    const data = [
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
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'outer'
      },
      interactions: [
        {
          type: 'element-active'
        }
      ]
    }
    return <Pie {...config} />
  }

  const DemoLine = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      asyncFetch()
    }, [])

    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error)
        })
    }
    const config = {
      data,
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
      yAxis: {
        label: {
          formatter: (v) => `${(v / 10e8).toFixed(1)} B`
        }
      },
      legend: {
        position: 'top'
      },
      smooth: true,
      // @TODO 后续会换一种动画方式
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000
        }
      }
    }

    return <Line {...config} />
  }

  return (
    <PurposeMeetingDashboardWrapper>
      <Row gutter={16}>
        <Col span={18}>
          <Card bordered={false}>
            {DemoLine()}
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            {DemoPie()}
          </Card>
        </Col>
      </Row>
    </PurposeMeetingDashboardWrapper>
  )
}

export default PurposeMeetingDashboard
