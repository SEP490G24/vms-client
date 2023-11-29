import 'react-perfect-scrollbar/dist/css/styles.css'
import React, { useEffect, useState } from 'react'
import { SharedButton } from '~/common'
import { useNavigate } from 'react-router-dom'
import { Descriptions, Divider, message, Modal, Space } from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment'
import { MeetingQRDto, StatusTicket } from '~/interface'
import { meetingTicketService } from '~/service'
import { MeetingCancelModals } from '~/pages'
import { useTranslation } from 'react-i18next'
import { PATH_DASHBOARD } from '~/routes/paths.ts'
import { CreateCard } from '~/pages/CheckInManager/TicketInfo/CreateCard'
import { cardService } from '~/service'
import { AuthSection } from '~/auth'
import { PERMISSION_ROLE_MAP } from '~/role'

interface Props {
  ticketResult?: {
    checkInCode: string
    meetingQRDto?: MeetingQRDto
    isDetail?: boolean
  }
}

const TicketInfo: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [meetingQRDto, setMeetingQRDto] = useState<MeetingQRDto>()
  const [openCancelModalReject, setOpenCancelModalReject] = useState(false)
  const [openModalCreateCard, setOpenModalCreateCard] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [checkInCodeState, setCheckInCodeState] = useState('')

  useEffect(() => {
    if (props.ticketResult?.checkInCode) {
      setCheckInCodeState(props.ticketResult?.checkInCode)
      meetingTicketService.findByQRCode(props.ticketResult?.checkInCode).then((response) => {
        setMeetingQRDto(response.data)
      })
    }
  }, [props.ticketResult?.checkInCode])

  useEffect(() => {
    if (props.ticketResult) {
      setMeetingQRDto(props.ticketResult.meetingQRDto)
      setCheckInCodeState(props.ticketResult.checkInCode)
    }
  }, [props.ticketResult])

  const onCheckOut = () => {
    onCheckIn({ status: StatusTicket.CHECK_OUT })
  }

  const onReject = (values: any) => {
    onCheckIn({ status: StatusTicket.CHECK_IN, ...values })
  }
  const onCreateCard = (values: any) => {
    cardService.insert(values).then(
      async (response) => {
        if (response?.status === 200) {
          await message.success(t('common.message.success.save'))
        }
      },
    )
      .catch(async () => {
          await message.success(t('common.message.success.error'))
        },
      )
  }
  const onCheckIn = (checkInStatus: {
    status: StatusTicket;
    reasonId?: string;
    reasonNote?: string;
  }) => {
    checkInCodeState && meetingQRDto && meetingTicketService.checkInCustomer({
      ticketId: meetingQRDto.ticketId,
      customerId: meetingQRDto.customerInfo.id,
      checkInCode: checkInCodeState,
      ...checkInStatus,
    })
      .then(() => success())
      .catch(() => message.error(t('common.message.error.save')))
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
      duration: 3,
    })
  }

  return !!meetingQRDto ?
    <>
      {contextHolder}
      <Space className={'w-full'} direction={'vertical'}
             size={32}>
        <Divider orientation={'left'}>Ticket Info</Divider>
        {meetingQRDto && <Descriptions bordered>
          <DescriptionsItem
            label={'Title'}>{meetingQRDto.ticketName}</DescriptionsItem>
          <DescriptionsItem
            label={'Purpose'}>{meetingQRDto.purpose}</DescriptionsItem>
          <DescriptionsItem
            label={'CreateBy'}>{meetingQRDto.createdBy}</DescriptionsItem>
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
          <SharedButton key='console' onClick={() => setOpenCancelModalReject(true)}>Reject</SharedButton>
          <SharedButton type='primary' onClick={() => onCheckOut()}
                        key='buy'>Check Out</SharedButton>
          <AuthSection permissions={PERMISSION_ROLE_MAP.R_TICKET_UPDATE}>
            <SharedButton type='primary' onClick={() => setOpenModalCreateCard(true)}
                          key='buy'>Create Card</SharedButton>
          </AuthSection>
        </Space>
      </Space>
      <MeetingCancelModals
        openModal={openCancelModalReject}
        siteId={meetingQRDto.siteId}
        onOk={onReject}
        onClose={() => setOpenCancelModalReject(false)} />
      <Modal
        open={openModalCreateCard}
        closable={false}
        title={null}
        footer={null}
        width={650}
        onCancel={() => setOpenModalCreateCard(false)}
      ><CreateCard checkInCode={props.ticketResult?.checkInCode} onSave={onCreateCard}
                   onClose={() => setOpenModalCreateCard(false)} />
      </Modal>
    </>
    : <></>
}

export default TicketInfo
