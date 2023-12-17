import { MeetingCalendarWrapper } from './styles.ts'
import { Card, Col, message, Row, Space, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Scheduler } from '@aldabil/react-scheduler'
import { MeetingInfoModal } from '~/pages/Meeting/common/MeetingInfo'
import { useEffect, useState } from 'react'
import { ProcessedEvent, RemoteQuery } from '@aldabil/react-scheduler/types'
import { MeetingDto } from '~/interface'
import moment from 'moment'
import { AuthSection } from '~/auth'
import { PERMISSION_ROLE_MAP } from '~/role'
import { MeetingFilter } from '~/pages'
import { MeetingFilterPayload, ticketService } from '~/service'
import dayjs from 'dayjs'
import { DATE_TIME, TICKET_STATUS_COLOR_MAP } from '~/constants'

const MeetingCalendar = () => {

  const { t } = useTranslation()
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})
  const [meetingsState, setMeetingsState] = useState<{
    meetings: MeetingDto[],
    loading: boolean
  }>({
    meetings: [],
    loading: false
  })
  // const firstRender = useFirstRender()
  const [remoteQuery, setRemoteQuery] = useState<RemoteQuery>()

  useEffect(() => {
    if (remoteQuery) {
      fetchMeetings({
        ...filterPayload,
        startTimeStart: dayjs(remoteQuery.start).format(DATE_TIME.START_DAY),
        startTimeEnd: dayjs(remoteQuery.end).format(DATE_TIME.END_DAY)
      })
    }
  }, [filterPayload, remoteQuery])

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setFilterPayload(filterPayload)
  }

  const transferTickets = () => {
    return meetingsState.meetings.filter((meeting: MeetingDto) => meeting.status != 'CANCEL').map((meeting: MeetingDto, index) => {
      return {
        event_id: index,
        title: `[${meeting.status}] ${meeting.name}`,
        start: moment(meeting.startTime).toDate(),
        end: moment(meeting.endTime).toDate(),
        color: TICKET_STATUS_COLOR_MAP[meeting.status],
        id: meeting.id
      } as ProcessedEvent
    })
  }

  const fetchMeetings = (payload: MeetingFilterPayload) => {
    setMeetingsState({ ...meetingsState, loading: true })
    ticketService.filter(payload).then((response) => {
      setMeetingsState({ loading: false, meetings: response.data })
    }).catch((error) => {
      setMeetingsState({ ...meetingsState, loading: false })
      message.error(error.data.message)
    })
  }

  const fetchRemote = async (query: RemoteQuery): Promise<ProcessedEvent[]> => {
    setRemoteQuery(query)
    return new Promise((res) => {
      res([])
    })
  }

  return (
    <MeetingCalendarWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.calendar.title')}</h2>
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_TICKET_FILTER}>
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <MeetingFilter calendar onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Spin spinning={meetingsState.loading}>
                <Card>
                  <Scheduler
                    day={{
                      startHour: 8,
                      endHour: 24,
                      step: 60,
                      navigation: true
                    }}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5, 6],
                      weekStartOn: 6,
                      startHour: 8,
                      endHour: 24,
                      step: 60,
                      navigation: true
                    }}
                    getRemoteEvents={fetchRemote}
                    deletable={false}
                    hourFormat={'24'}
                    fields={[{ name: 'id', type: 'input' }]}
                    dialogMaxWidth={'xl'}
                    customEditor={(scheduler) => <MeetingInfoModal open={true} classname={'w-[950px]'}
                                                                   scheduler={scheduler} />}
                    events={transferTickets()}
                  />
                </Card>
              </Spin>
            </Col>
          </Row>
        </AuthSection>
      </Space>
    </MeetingCalendarWrapper>
  )
}

export default MeetingCalendar
