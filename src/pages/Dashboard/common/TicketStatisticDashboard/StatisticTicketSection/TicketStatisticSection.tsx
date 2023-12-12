import React from 'react'
import { TicketStatisticSectionWrapper } from './styles.ts'
import { Card, Col, Row, Space, Statistic } from 'antd'
import CountUp from 'react-countup'
import Title from 'antd/es/typography/Title'
import { useTranslation } from 'react-i18next'

interface Props {
  total?: number,
  totalLabel: string
  totalWithCondition?: number
  success?: number
  successWithCondition?: number
  successLabel: string
  failed?: number
  failedWithCondition?: number
  failedLabel: string
  filterLabel: string
}

const TicketStatisticSection: React.FC<Props> = (props) => {

  const { t } = useTranslation()
  const formatter = (value: any) => <CountUp end={value} separator=',' />

  return (
    <TicketStatisticSectionWrapper>
      <Card>
        <Row gutter={12}>
          <Col xl={6} xxl={8} className={'statistic-total'}>
            <Card bordered={false}>
              <Statistic title={<Title level={3}>{props.totalLabel}</Title>} value={props.total}
                         formatter={formatter} />
              <p className={'py-2 text-muted'}>{t('common.label.in')} {props.filterLabel}: {props.totalWithCondition}</p>
            </Card>
          </Col>
          <Col xl={9} xxl={8}>
            <Card className={'bg-body'}>
              <Space className={'w-full justify-between'} direction={'horizontal'} align={'center'}>
                <Statistic title={<span dangerouslySetInnerHTML={{ __html: props.successLabel }} />}
                           value={props.success}
                           formatter={formatter} />
                <p
                  className={'lg:w-[97px] 2xl:w-[120px] px-4 py-2 text-white bg-gray-400 rounded'}>{t('common.label.in')} {props.filterLabel}: {props.successWithCondition}</p>
              </Space>
            </Card>
          </Col>
          <Col xl={9} xxl={8}>
            <Card className={'bg-body'}>
              <Space className={'w-full justify-between'} direction={'horizontal'} align={'center'}>
                <Statistic title={<span dangerouslySetInnerHTML={{ __html: props.failedLabel }} />} value={props.failed}
                           formatter={formatter} />
                <p
                  className={'xl:w-[97px] 2xl:w-[120px] px-4 py-2 text-white bg-gray-400 rounded'}>{t('common.label.in')} {props.filterLabel}: {props.failedWithCondition}</p>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
    </TicketStatisticSectionWrapper>
  )
}

export default TicketStatisticSection
