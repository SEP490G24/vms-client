import { CheckInManagerWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Card, Col, Divider, Row, Space } from 'antd'
import { checkPermission } from '~/utils'
import { PERMISSION_ROLE_MAP } from '~/role'
import { TicketQRCodePayload } from '~/service'
import { useTranslation } from 'react-i18next'
import { TicketResult } from '~/pages'
import { useState } from 'react'
import { CheckInFilter } from '~/pages/CheckInManager/Filter'


const CheckInManager = () => {

  const { t } = useTranslation()
  const [ticketQRPayload, setTicketQRPayload] = useState<TicketQRCodePayload>()

  const onFilter = (ticketQRCodePayload?: any) => {
    setTicketQRPayload(ticketQRCodePayload)
  }

  return (
    <CheckInManagerWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('check-in.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_USER_FIND) && (
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <CheckInFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card>
                <TicketResult ticketId={ticketQRPayload?.ticketId} customerId={ticketQRPayload?.customerId} />
              </Card>
            </Col>
          </Row>
        )}
      </Space>
    </CheckInManagerWrapper>
  )
}

export default CheckInManager
