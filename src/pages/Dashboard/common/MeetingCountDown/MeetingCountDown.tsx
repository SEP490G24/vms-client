import { MeetingCountDownWrapper } from './styles.ts'
import React from 'react'
import { MeetingDto, TicketsPeriodResponse } from '~/interface'
import MeetingCountDownSection from './MeetingCountDownSection/MeetingCountDownSection.tsx'

interface Props {
  ticketsPeriod: TicketsPeriodResponse
  onRefresh: () => void
}

const MeetingCountDown: React.FC<Props> = (props) => {

  const onFinishCountDown = (meeting: MeetingDto) => {
    console.log('Meeting End CountDown', meeting)
    props.onRefresh()
  }

  return (
    <MeetingCountDownWrapper className={'w-full'} classNames={{ item: 'flex-1' }}>
      <MeetingCountDownSection title={'Upcoming Meetings'} data={props.ticketsPeriod.upcomingMeetings ?? []}
                               state={'future'} onFinish={onFinishCountDown} />
      <MeetingCountDownSection title={'Current Taking Meetings'} data={props.ticketsPeriod.ongoingMeetings ?? []}
                               state={'current'} onFinish={onFinishCountDown} />
      <MeetingCountDownSection title={'Ended Meetings'} data={props.ticketsPeriod.recentlyFinishedMeetings ?? []}
                               state={'finish'} />
    </MeetingCountDownWrapper>
  )
}

export default MeetingCountDown
