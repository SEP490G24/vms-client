import 'react-perfect-scrollbar/dist/css/styles.css'
import React, { useEffect, useState } from 'react'
import { SharedButton } from '~/common'
import { Descriptions, Divider, message, Space } from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment'
import { MeetingQRDto } from '~/interface'
import { StatusTicketCustomer } from '~/constants'
import { cardService, meetingTicketService } from '~/service'
import { useTranslation } from 'react-i18next'
import { CreateCardModal } from './CreateCard'
import { AuthSection } from '~/auth'
import { PERMISSION_ROLE_MAP } from '~/role'
import { CardDto } from '~/interface/Card.ts'
import Modal from 'antd/es/modal/Modal'

interface Props {
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
  meetingQRDto?: MeetingQRDto
  scanCardDto?: CardDto
  onClose: () => void
}

const TicketInfo: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const [openModalCreateCard, setOpenModalCreateCard] = useState(false)
  const [checkInCodeState, setCheckInCodeState] = useState('')

  useEffect(() => {
    if (props.meetingQRDto) {
      setCheckInCodeState(props.meetingQRDto.checkInCode)
    }
  }, [props.meetingQRDto])

  const onCheckOut = () => {
    onCheckIn({ status: StatusTicketCustomer.CHECK_OUT })
  }

  const onCreateCard = (values: any) => {
    cardService.insert(values).then(
      async (response) => {
        if (response?.status === 200) {
          await message.success(t('common.message.success.save'))
          setOpenModalCreateCard(false)
        }
      }
    )
      .catch(async (error) => {
          await message.success(error.data.message)
        }
      )
  }
  const onCheckIn = (checkInStatus: {
    status: StatusTicketCustomer;
    reasonId?: number;
    reasonNote?: string;
  }) => {
    checkInCodeState && props.meetingQRDto && meetingTicketService.checkInCustomer({
      ticketId: props.meetingQRDto.ticketId,
      customerId: props.meetingQRDto.customerInfo.id,
      checkInCode: checkInCodeState,
      ...checkInStatus
    })
      .then(() => message.success(t('common.message.success.save')))
      .catch((error) => message.error(error.data.message))
  }

  return <>
    <Modal
      open={props.open}
      closable={true}
      title={null}
      footer={null}
      confirmLoading={props.confirmLoading}
      width={props.width}
      onCancel={props.onClose}
    >
      <Space className={'w-full'} direction={'vertical'}
             size={32}>
        <Divider orientation={'left'}>{t('common.label.ticketInfo')}</Divider>
        {props.meetingQRDto && <Descriptions bordered>
          <DescriptionsItem
            label={t('common.field.title')}>{props.meetingQRDto.ticketName}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.purpose')}>{props.meetingQRDto.purpose}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.createdBy')}>{props.meetingQRDto.createBy}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.room')}>{props.meetingQRDto.roomName}</DescriptionsItem>
          <DescriptionsItem label={t('common.field.duration')} span={2}>
            <Space size={4}>
              <span>{moment(props.meetingQRDto.startTime).format('LTS')}</span>
              <span>~</span>
              <span>{moment(props.meetingQRDto.endTime).format('LTS')}</span>
            </Space>
          </DescriptionsItem>
          <DescriptionsItem label={t('common.field.visitorName')}
                            span={3}>{props.meetingQRDto.customerInfo.visitorName}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.identificationNumber')}>{props.meetingQRDto.customerInfo.identificationNumber}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.email')}>{props.meetingQRDto.customerInfo.email}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.phoneNumber')}>{props.meetingQRDto.customerInfo.phoneNumber}</DescriptionsItem>
        </Descriptions>}
        <Space className={'w-full justify-center'}
               direction={'horizontal'}
               size={16}>
          <SharedButton onClick={() => onCheckOut()}
                        key='buy'>{t('common.field.check_out')}</SharedButton>
          <AuthSection permissions={PERMISSION_ROLE_MAP.R_TICKET_UPDATE}>
            <SharedButton type='primary' onClick={() => setOpenModalCreateCard(true)}
                          key='buy'>{t('common.field.create_card')}</SharedButton>
          </AuthSection>
        </Space>
      </Space>
    </Modal>
    <CreateCardModal open={openModalCreateCard} width={650} checkInCode={props.meetingQRDto?.checkInCode} scanCardDto={props.scanCardDto}
                     onSave={onCreateCard} onClose={() => setOpenModalCreateCard(false)} />
  </>
}

export default TicketInfo
