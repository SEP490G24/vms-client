import { PurposeOverviewDashboardWrapper } from './styles.ts'
import { Card, Col } from 'antd'
import { useEffect, useState } from 'react'
import { SharedLineChart } from '~/common/SharedChart'


function PurposeOverviewDashboard() {

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

  return (
    <>
      <PurposeOverviewDashboardWrapper gutter={12}>
        <Col span={24}>
          <Card title={'Purpose Overview'} bordered={false}>
            <SharedLineChart data={lineData} xField={'year'}
                             yField={'gdp'}
                             seriesField={'name'} />
          </Card>
        </Col>
      </PurposeOverviewDashboardWrapper>

    </>
  )
}

export default PurposeOverviewDashboard
