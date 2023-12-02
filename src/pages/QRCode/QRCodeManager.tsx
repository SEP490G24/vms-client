import { QRCodeManagerWrapper, RightSideBarWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Card, Col, Divider, message, Row, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { TicketResult } from '~/pages'
import { QRCodeFilter } from '~/pages/QRCode/Filter'
import { useEffect, useState } from 'react'
import { MeetingQRDto } from '~/interface'
import { meetingTicketService } from '~/service'
import { QRCustomerInfo } from '~/pages/QRCode/CustomerInfo'


const QRCodeManager = () => {

  const { t } = useTranslation()

  const [meetingQRDto, setMeetingQRDto] = useState<MeetingQRDto>()
  const [checkInCode, setCheckInCode] = useState<string>()

  useEffect(() => {
    if (checkInCode) {
      meetingTicketService.findByQRCode(checkInCode).then((response) => {
        setMeetingQRDto(response.data)
      }).catch((error) => message.error(error.data.message))
    } else {
      setMeetingQRDto(undefined)
    }
  }, [checkInCode])

  const onFilter = (checkInCode?: string) => {
    setCheckInCode(checkInCode)
  }

  return (
    <QRCodeManagerWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('qr-manager.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <Row className={'w-full m-0'} gutter={24} wrap={false}>
          <Col flex={'none'} span={12}>
            <RightSideBarWrapper>
              <Space className={'w-full'} direction={'vertical'} size={16}>
                <QRCodeFilter onFilter={onFilter} />
                {meetingQRDto?.customerInfo && checkInCode &&
                  <QRCustomerInfo checkInCode={checkInCode} customerInfo={meetingQRDto.customerInfo} />}
              </Space>
            </RightSideBarWrapper>
          </Col>
          {checkInCode && meetingQRDto &&
            <Col flex={'auto'}>
              <Card>
                <TicketResult ticketResult={{ checkInCode, meetingQRDto }} />
              </Card>
            </Col>
          }
        </Row>
      </Space>
    </QRCodeManagerWrapper>
  )
}

export default QRCodeManager
