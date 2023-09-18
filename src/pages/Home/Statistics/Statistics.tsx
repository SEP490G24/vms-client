import { Col, Row } from 'antd'
import React from 'react'
import { AccountOutlined, ClockOutlined, ClosedOutlined, MailOutlined, TicketOutlined } from '~/icon'
import { themes } from '~/themes'
import { StatisticItem } from './StatisticItem'

export interface StatisticArgs {
}

const Statistics: React.FC<StatisticArgs> = () => {
  return (
    <Row gutter={12}>
      <Col span={5}>
        <StatisticItem icon={<MailOutlined className={'text-[20px]'} />} title={<p>Current Total<br />Message</p>}
                       value={100} valueColor={themes.primary.normal} />
      </Col>
      <Col span={5}>
        <StatisticItem icon={<TicketOutlined className={'text-[20px]'} />} title={<p>Current CEP<br />Ticket</p>}
                       value={60} valueColor={themes.tertiary} />
      </Col>
      <Col span={4}>
        <StatisticItem icon={<AccountOutlined className={'text-[20px]'} />} title={<p>Current CEP <br />Counselor</p>}
                       value={4} valueColor={themes.black} />
      </Col>
      <Col span={5}>
        <StatisticItem icon={<ClockOutlined className={'text-[20px]'} />} title={<p>Waiting<br />Ticket</p>}
                       value={44} valueColor={themes.tertiary} />
      </Col>
      <Col span={5}>
        <StatisticItem icon={<ClosedOutlined className={'text-[20px]'} />} title={<p>Failed <br />Ticket</p>}
                       value={2} valueColor={themes.primary.normal} />
      </Col>
    </Row>
  )
}

export default Statistics
