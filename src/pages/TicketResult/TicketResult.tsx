import { TicketResultWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useEffect, useState } from 'react'
import { SharedButton } from '~/common'
import { useParams } from 'react-router-dom'
import { Descriptions, Divider, message, Space } from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment'
import { MeetingQRDto } from '~/interface'
import { Reason, StatusTicketCustomer, StatusTicketMeeting } from '~/constants'
import { meetingTicketService } from '~/service'
import { MeetingCancelModals } from '~/pages'
import { useTranslation } from 'react-i18next'


interface Props {
  ticketResult?: {
    checkInCode: string
    meetingQRDto?: MeetingQRDto
    isDetail?: boolean
  }
}

const TicketResult: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const [meetingQRDto, setMeetingQRDto] = useState<MeetingQRDto>()
  const [openCancelModal, setOpenCancelModal] = useState(false)

  const { checkInCode } = useParams()
  const [checkInCodeState, setCheckInCodeState] = useState('')
  const [meetingState, setMeetingState] = useState<'success' | 'error'>('success')
  const [disableBtn, setDisableBtn] = useState(false)

  useEffect(() => {
    console.log(checkInCode)
    if (checkInCode) {
      setCheckInCodeState(checkInCode)
      meetingTicketService.findByQRCode(checkInCode).then((response) => {
        setMeetingQRDto(response.data)
      })
    }
  }, [checkInCode])

  useEffect(() => {
    if (props.ticketResult) {
      setMeetingQRDto(props.ticketResult.meetingQRDto)
      setCheckInCodeState(props.ticketResult.checkInCode)
    }
  }, [props.ticketResult])

  useEffect(() => {
    meetingQRDto && setMeetingState(meetingQRDto.ticketStatus === StatusTicketMeeting.PENDING ? 'success' : 'error')
  }, [meetingQRDto])

  const onAccept = () => {
    onCheckIn({ status: StatusTicketCustomer.CHECK_IN })
  }

  const onReject = (values: any) => {
    onCheckIn({ status: StatusTicketCustomer.REJECT, ...values })
  }

  const onCheckIn = (checkInStatus: {
    status: StatusTicketCustomer;
    reasonId?: number;
    reasonNote?: string;
  }) => {
    checkInCodeState && meetingQRDto && meetingTicketService.checkInCustomer({
      ticketId: meetingQRDto.ticketId,
      customerId: meetingQRDto.customerInfo.id,
      checkInCode: checkInCodeState,
      ...checkInStatus
    })
      .then(() => message.success(t('common.message.success.save')))
      .then(() => {
        setDisableBtn(true)
      })
      .catch((error) => message.error(error.data.message))
  }


  return !!meetingQRDto ?
    <>
      <TicketResultWrapper
        status={meetingState}
        title={t(`ticket-result.${meetingState}.title`)}
        subTitle={t(`ticket-result.${meetingState}.subTitle`, { ticketId: meetingQRDto.ticketId })}
        extra={<Space className={'w-full'} direction={'vertical'}
                      size={32}>
          <Divider orientation={'left'}>Ticket Info</Divider>
          {meetingQRDto && <Descriptions bordered>
            <DescriptionsItem
              label={t('common.field.title')}>{meetingQRDto.ticketName}</DescriptionsItem>
            <DescriptionsItem
              label={t('common.field.purpose')}>{meetingQRDto.purpose}</DescriptionsItem>
            <DescriptionsItem
              label={t('common.field.createdBy')}>{meetingQRDto.createdBy}</DescriptionsItem>
            <DescriptionsItem
              label={t('common.field.room')}>{meetingQRDto.roomName}</DescriptionsItem>
            <DescriptionsItem label={'Duration'} span={2}>
              <Space size={4}>
                <span>{moment(meetingQRDto.startTime).format('MM Do YYYY, h:mm:ss a')}</span>
                <span>~</span>
                <span>{moment(meetingQRDto.endTime).format('MM Do YYYY, h:mm:ss a')}</span>
              </Space>
            </DescriptionsItem>
            <DescriptionsItem label={t('common.field.guest')}
                              span={3}>{meetingQRDto.customerInfo.visitorName}</DescriptionsItem>
            <DescriptionsItem
              label={t('common.field.identificationNumber')}>{meetingQRDto.customerInfo.identificationNumber}</DescriptionsItem>
            <DescriptionsItem
              label={t('common.field.email')}>{meetingQRDto.customerInfo.email}</DescriptionsItem>
            <DescriptionsItem
              label={t('common.field.phoneNumber')}>{meetingQRDto.customerInfo.phoneNumber}</DescriptionsItem>
          </Descriptions>}
          {meetingState === 'success' &&
            <Space className={'w-full justify-center'}
                   direction={'horizontal'}
                   size={16}>
              <SharedButton key='console' onClick={() => setOpenCancelModal(true)} disabled={disableBtn}>Reject</SharedButton>
              <SharedButton type='primary' onClick={() => onAccept()}
                            disabled={disableBtn}
                            key='buy'>Accept</SharedButton>
            </Space>
          }
        </Space>} />
      <MeetingCancelModals
        reasonType={Reason.REJECT}
        open={openCancelModal}
        onOk={onReject}
        onClose={() => setOpenCancelModal(false)} />
    </>
    : <></>
}

export default TicketResult
