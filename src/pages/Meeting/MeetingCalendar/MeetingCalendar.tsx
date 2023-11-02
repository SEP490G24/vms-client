import { MeetingCalendarWrapper } from './styles.ts'
import { Card, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Scheduler } from '@aldabil/react-scheduler'
import { MeetingInfo } from '~/pages/Meeting/common/MeetingInfo'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMeeting, meetingSelector } from '~/redux/slices/meetingSlice.ts'
import { useEffect, useState } from 'react'
import { ProcessedEvent } from '@aldabil/react-scheduler/types'
import { MeetingDto } from '~/interface'
import { EVENTS } from '~/data/event.ts'


const MeetingCalendar = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { meetings } = useSelector(meetingSelector)
  const [event, setEvent] = useState([])


  useEffect(() => {
    dispatch(fetchAllMeeting() as any)
  }, [])

  return (
    <MeetingCalendarWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.calendar.title')}</h2>
        </Space>
        {/*{checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (*/}
        <Card>
          <Scheduler
            week={null}
            day={{
              startHour: 3,
              endHour: 23,
              step: 60,
              navigation: true
            }}
            hourFormat={'24'}
            fields={[{ name: 'id', type: 'input' }]}
            dialogMaxWidth={'xl'}
            customEditor={(scheduler) => <MeetingInfo classname={'w-[750px]'} scheduler={scheduler} />}
            events={meetings.map((meeting: MeetingDto, index) => {
              return {
                event_id: index,
                title: 'Test',
                start: new Date(meeting.startTime as string),
                end: new Date(meeting.endTime as string),
                color: '#50b500',
                id: meeting.id
              } as ProcessedEvent
            })}
          /></Card>
      </Space>
    </MeetingCalendarWrapper>
  )
}

export default MeetingCalendar
