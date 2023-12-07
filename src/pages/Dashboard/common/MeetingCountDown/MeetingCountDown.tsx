import { MeetingCountDownWrapper } from './styles.ts'
import React, { useState } from 'react'
import { InfoModalData, MeetingDto, TicketsPeriodResponse } from '~/interface'
import MeetingCountDownSection from './MeetingCountDownSection/MeetingCountDownSection.tsx'
import { TicketInfo } from '~/pages/Dashboard/common/TicketInfo'
import { Modal } from 'antd'

interface Props {
  ticketsPeriod: TicketsPeriodResponse
  onRefresh: () => void
}

const MeetingCountDown: React.FC<Props> = (props) => {

  const [modalInfoData, setModalInfoData] = useState<InfoModalData<MeetingDto>>({
    openModal: false,
    confirmLoading: false
  })

  const onFinishCountDown = (meeting: MeetingDto) => {
    console.log(meeting)
    props.onRefresh()
  }

  const onSelected = (meeting: MeetingDto) => {
    setModalInfoData({
      ...modalInfoData,
      entitySelected: meeting,
      openModal: true
    })
  }

  const onClose = () => {
    setModalInfoData({
      ...modalInfoData,
      entitySelected: undefined,
      openModal: false
    })
  }


  return (
    <MeetingCountDownWrapper className={'w-full'} classNames={{ item: 'flex-1' }}>
      <MeetingCountDownSection title={'Upcoming Meetings'} data={props.ticketsPeriod.upcomingMeetings ?? []}
                               state={'future'} onFinish={onFinishCountDown} onSelected={onSelected} />
      <MeetingCountDownSection title={'Current Taking Meetings'} data={props.ticketsPeriod.ongoingMeetings ?? []}
                               state={'current'} onFinish={onFinishCountDown} onSelected={onSelected} />
      <MeetingCountDownSection title={'Ended Meetings'} data={props.ticketsPeriod.recentlyFinishedMeetings ?? []}
                               state={'finish'} onSelected={onSelected} />
      <Modal open={modalInfoData.openModal}
             closable={true}
             title={null}
             footer={null}
             confirmLoading={modalInfoData.confirmLoading}
             width={1000}
             onCancel={onClose}
      >
        <TicketInfo meetingDto={modalInfoData.entitySelected} />
      </Modal>
    </MeetingCountDownWrapper>
  )
}

export default MeetingCountDown
