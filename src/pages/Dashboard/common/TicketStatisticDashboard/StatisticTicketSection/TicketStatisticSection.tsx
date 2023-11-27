import React from 'react'
import { TicketStatisticSectionWrapper } from './styles.ts'
import { Card, Col, Row, Space, Statistic } from 'antd'
import CountUp from 'react-countup'

interface Props {
  total?: number,
  totalLabel: string
  success?: number
  successWithCondition?: number
  successLabel: string
  failed?: number
  failedWithCondition?: number
  failedLabel: string
  filterLabel: string
}

const TicketStatisticSection: React.FC<Props> = (props) => {

  const formatter = (value: any) => <CountUp end={value} separator=',' />

  return (
    <TicketStatisticSectionWrapper>
      <Card>
        <Row gutter={12}>
          <Col span={10} className={'statistic-total'}>
            <Card bordered={false}>
              <Statistic title={props.totalLabel} value={props.total} formatter={formatter} />
            </Card>
          </Col>
          <Col span={7}>
            <Card className={'bg-body'}>
              <Space className={'w-full justify-between'} direction={'horizontal'} align={'center'}>
                <Statistic title={<span dangerouslySetInnerHTML={{ __html: props.successLabel }} />}
                           value={props.success}
                           formatter={formatter} />
                <p className={'px-4 py-2 text-muted bg-white'}>In {props.filterLabel}: {props.successWithCondition}</p>
              </Space>
            </Card>
          </Col>
          <Col span={7}>
            <Card className={'bg-body'}>
              <Space className={'w-full justify-between'} direction={'horizontal'} align={'center'}>
                <Statistic title={<span dangerouslySetInnerHTML={{ __html: props.failedLabel }} />} value={props.failed}
                           formatter={formatter} />
                <p className={'px-4 py-2 text-muted bg-white'}>In {props.filterLabel}: {props.failedWithCondition}</p>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
    </TicketStatisticSectionWrapper>
  )
}

export default TicketStatisticSection
