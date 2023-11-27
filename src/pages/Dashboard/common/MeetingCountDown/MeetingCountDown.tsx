import { MeetingCountDownWrapper } from './styles.ts'
import React from 'react'
import { TicketsPeriodResponse } from '~/interface'
import MeetingCountDownSection from './MeetingCountDownSection/MeetingCountDownSection.tsx'

interface Props {
  ticketsPeriod: TicketsPeriodResponse
  onRefresh: () => void
}

const MeetingCountDown: React.FC<Props> = (props) => {

  return (
    <MeetingCountDownWrapper className={'w-full'} classNames={{ item: 'flex-1' }}>
      <MeetingCountDownSection title={'Upcoming Meetings'} data={props.ticketsPeriod.upcomingMeetings} state={'future'}/>
      <MeetingCountDownSection title={'Current Taking Meetings'} data={props.ticketsPeriod.ongoingMeetings} state={'current'}/>
      <MeetingCountDownSection title={'Ended Meetings'} data={props.ticketsPeriod.recentlyFinishedMeetings} state={'finish'}/>
    </MeetingCountDownWrapper>
  )
}

export default MeetingCountDown
