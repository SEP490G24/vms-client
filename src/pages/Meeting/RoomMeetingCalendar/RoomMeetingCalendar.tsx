import { RoomMeetingCalendarWrapper } from './styles.ts'
import { Card, Col, message, Row, Space, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Scheduler } from '@aldabil/react-scheduler'
import { useEffect, useState } from 'react'
import { MeetingDto, RoomDto } from '~/interface'
import { MeetingFilterPayload, meetingTicketService } from '~/service'
import { MeetingFilter, MeetingInfo } from '~/pages'
import { AuthSection } from '~/auth'
import { PERMISSION_ROLE_MAP } from '~/role'
import moment from 'moment/moment'
import { ProcessedEvent } from '@aldabil/react-scheduler/types'
import { RESOURCES } from '~/data/event.ts'
import { randomColor } from '~/utils'

const RoomMeetingCalendar = () => {

  const { t } = useTranslation()

  const [dataState, setDataState] = useState<{
    loading: boolean,
    tickets?: MeetingDto[],
    rooms?: RoomDto[]
  }>({ loading: false, tickets: [], rooms: [] })
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})

  useEffect(() => {
    fetchApi()
  }, [filterPayload])

  useEffect(() => {
    console.log(transferRoomsResource())
    console.log(RESOURCES)
  }, [dataState])

  const transferRoomsResource = () => {
    return dataState.rooms?.map((room) => {
      console.log(room)
      return {
        ...room,
        roomId: room.id,
        color: randomColor()
      }
    })
  }

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setFilterPayload(filterPayload)
  }

  const fetchApi = () => {
    setDataState({ ...dataState, loading: true })
    meetingTicketService.findWithRoom(filterPayload).then((response) => {
      if (response.data) {
        setDataState({ loading: false, rooms: response.data.rooms, tickets: response.data.tickets })
      }
    }).catch(() => {
      setDataState({ ...dataState, loading: false })
      message.error(t('common.message.error'))
    })
  }

  return (
    <RoomMeetingCalendarWrapper>
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
              <Spin spinning={dataState.loading}>
                <Card>
                  {
                    dataState.rooms?.length &&
                    <Scheduler
                      events={dataState.tickets?.map(ticket => {
                        return {
                          event_id: ticket.id,
                          title: ticket.name,
                          start: moment(ticket.startTime).toDate(),
                          end: moment(ticket.endTime).toDate(),
                          id: ticket.id,
                          roomId: ticket.roomId
                        } as ProcessedEvent
                      })}
                      day={{
                        startHour: 3,
                        endHour: 23,
                        step: 60,
                        navigation: true
                      }}
                      week={{
                        weekDays: [0, 1, 2, 3, 4, 5],
                        weekStartOn: 6,
                        startHour: 3,
                        endHour: 23,
                        step: 60,
                        navigation: true
                      }}
                      resources={transferRoomsResource()}
                      resourceViewMode={'tabs'}
                      resourceFields={{
                        idField: 'roomId',
                        textField: 'name',
                        subTextField: 'code',
                        avatarField: 'code',
                        colorField: 'color'
                      }}
                      fields={[{ name: 'id', type: 'input' }, { name: 'roomId', type: 'input' }]}
                      dialogMaxWidth={'xl'}
                      customEditor={(scheduler) => <MeetingInfo classname={'w-[750px]'} scheduler={scheduler} />}
                    />
                  }
                </Card>
              </Spin>
            </Col>
          </Row>
        </AuthSection>
      </Space>
    </RoomMeetingCalendarWrapper>
  )
}

export default RoomMeetingCalendar
