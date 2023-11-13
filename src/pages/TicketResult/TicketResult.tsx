import { TicketResultWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useEffect, useState } from 'react'
import { SharedButton } from '~/common'
import { useNavigate, useParams } from 'react-router-dom'
import { Descriptions, Divider, message, Space } from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment'
import { MeetingQRDto, StatusTicket } from '~/interface'
import meetingTicketService, { TicketQRCodePayload } from '~/service/meetingTicketService.ts'
import { isNullish } from '~/utils'
import { MeetingCancelModals } from '~/pages'
import { useTranslation } from 'react-i18next'
import { PATH_DASHBOARD } from '~/routes/paths.ts'


interface Props {
  ticketId?: string
  customerId?: string
}

const TicketResult: React.FC<Props> = (props) => {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const [meetingQRDto, setMeetingQRDto] = useState<MeetingQRDto>({} as MeetingQRDto)
  const [openCancelModal, setOpenCancelModal] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const { ticketId, customerId } = useParams()
  const [ticketQRPayload, setTicketQRPayload] = useState<TicketQRCodePayload>()

  useEffect(() => {
    if (ticketId && customerId) {
      setTicketQRPayload({ ticketId, customerId })
    } else if (props.ticketId && props.customerId) {
      setTicketQRPayload({ ticketId: props.ticketId, customerId: props.customerId })
    }
  }, [ticketId, customerId, props.ticketId, props.customerId])

  useEffect(() => {
    ticketQRPayload && meetingTicketService.findByQRCode(ticketQRPayload).then((response) => {
      setMeetingQRDto(response.data)
    })
  }, [ticketQRPayload])

  const onAccept = () => {
    onCheckIn({ status: StatusTicket.CHECK_IN })
  }

  const onReject = (values: any) => {
    onCheckIn({ status: StatusTicket.CHECK_IN, ...values })
  }

  const onCheckIn = (checkInStatus: {
    status: StatusTicket;
    reasonId?: string;
    reasonNote?: string;
  }) => {
    ticketId && customerId && meetingTicketService.checkInCustomer({ ticketId, customerId, ...checkInStatus })
      .then(() => success())
      .catch(() => message.error(t('common.message.error')))
      .finally(() => {
        setTimeout(() => {
          navigate(PATH_DASHBOARD)
        }, 3000)
      })
  }

  const success = () => {
    return messageApi.open({
      type: 'success',
      content: 'This browser tab will redirect to dashboard after 3 seconds',
      duration: 3
    })
  }

  return !isNullish(meetingQRDto) ?
    <>
      {contextHolder}
      <TicketResultWrapper
        status='success'
        title='Successfully Verify QR Server!'
        subTitle={'Ticket number: ' + meetingQRDto.ticketId + '. Cloud server configuration takes 1-5 minutes, please wait.'}
        extra={<Space className={'w-full'} direction={'vertical'}
                      size={32}>
          <Divider orientation={'left'}>Ticket Info</Divider>
          {meetingQRDto && <Descriptions bordered>
            <DescriptionsItem
              label={'Title'}>{meetingQRDto.ticketName}</DescriptionsItem>
            <DescriptionsItem
              label={'Purpose'}>{meetingQRDto.purpose}</DescriptionsItem>
            <DescriptionsItem
              label={'CreateBy'}>{meetingQRDto.createBy}</DescriptionsItem>
            <DescriptionsItem
              label={'Room'}>{meetingQRDto.roomName}</DescriptionsItem>
            <DescriptionsItem label={'Duration'} span={2}>
              <Space size={4}>
                <span>{moment(meetingQRDto.startTime).format('LTS')}</span>
                <span>~</span>
                <span>{moment(meetingQRDto.endTime).format('LTS')}</span>
              </Space>
            </DescriptionsItem>
            <DescriptionsItem label={'Customer'}
                              span={3}>{meetingQRDto.customerInfo.visitorName}</DescriptionsItem>
            <DescriptionsItem
              label={'Identification Number'}>{meetingQRDto.customerInfo.identificationNumber}</DescriptionsItem>
            <DescriptionsItem
              label={'Email'}>{meetingQRDto.customerInfo.email}</DescriptionsItem>
            <DescriptionsItem
              label={'PhoneNumber'}>{meetingQRDto.customerInfo.phoneNumber}</DescriptionsItem>
          </Descriptions>}
          <Space className={'w-full justify-center'}
                 direction={'horizontal'}
                 size={16}>
            <SharedButton key='console' onClick={() => setOpenCancelModal(true)}>Reject</SharedButton>
            <SharedButton type='primary' onClick={() => onAccept()}
                          key='buy'>Accept</SharedButton>
          </Space>
        </Space>} />
      <MeetingCancelModals
        openModal={openCancelModal}
        siteId={meetingQRDto.siteId}
        onOk={onReject}
        onClose={() => setOpenCancelModal(false)} />
    </>
    : <></>
}

export default TicketResult
