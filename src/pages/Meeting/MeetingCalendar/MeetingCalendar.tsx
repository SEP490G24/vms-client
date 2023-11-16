import { MeetingCalendarWrapper } from './styles.ts'
import { Card, Col, message, Row, Space, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Scheduler } from '@aldabil/react-scheduler'
import { MeetingInfo } from '~/pages/Meeting/common/MeetingInfo'
import { useEffect, useState } from 'react'
import { ProcessedEvent } from '@aldabil/react-scheduler/types'
import { MeetingDto } from '~/interface'
import moment from 'moment'
import { AuthSection } from '~/auth'
import { PERMISSION_ROLE_MAP } from '~/role'
import { MeetingFilter } from '~/pages'
import { MeetingFilterPayload, ticketService } from '~/service'


const MeetingCalendar = () => {

  const { t } = useTranslation()
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})
  const [meetingsState, setMeetingsState] = useState<{ meetings: MeetingDto[], loading: boolean }>({
    meetings: [],
    loading: false
  })

  useEffect(() => {
    fetchMeetings()
  }, [])

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setFilterPayload(filterPayload)
  }

  const fetchMeetings = () => {
    setMeetingsState({ ...meetingsState, loading: true })
    ticketService.filter(filterPayload).then((response) => {
      setMeetingsState({ ...meetingsState, meetings: response.data })
    }).catch(() => message.error(t('common.message.error')))
      .finally(() => {
        setMeetingsState({ ...meetingsState, loading: false })
      })
  }

  return (
    <MeetingCalendarWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.calendar.title')}</h2>
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_TICKET_FIND}>
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <MeetingFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Spin spinning={meetingsState.loading}>
                <Card>
                  <Scheduler
                    // week={null}
                    day={{
                      startHour: 3,
                      endHour: 23,
                      step: 60,
                      navigation: true
                    }}
                    deletable={false}
                    hourFormat={'24'}
                    fields={[{ name: 'id', type: 'input' }]}
                    dialogMaxWidth={'xl'}
                    customEditor={(scheduler) => <MeetingInfo classname={'w-[750px]'} scheduler={scheduler} />}
                    events={meetingsState.meetings.map((meeting: MeetingDto, index) => {
                      return {
                        event_id: index,
                        title: 'Test',
                        start: moment(meeting.startTime).toDate(),
                        end: moment(meeting.endTime).toDate(),
                        color: '#50b500',
                        id: meeting.id
                      } as ProcessedEvent
                    })}
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
