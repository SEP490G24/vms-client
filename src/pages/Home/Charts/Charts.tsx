import { Col, Row } from 'antd'
import React from 'react'
import { ChartItem } from './ChartItem'

export interface StatisticArgs {
}

const Charts: React.FC<StatisticArgs> = () => {
  return (
    <Row gutter={12}>
      <Col span={8}>
        <ChartItem title={'Chats Closed by'}/>
      </Col>
      <Col span={8}>
        <ChartItem title={'The Average of Response Time'} />
      </Col>
      <Col span={8}>
        <ChartItem title={'System Resource Usage'} />
      </Col>
    </Row>
  )
}

export default Charts
