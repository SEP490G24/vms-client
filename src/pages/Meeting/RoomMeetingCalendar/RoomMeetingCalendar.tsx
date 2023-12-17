import { RoomMeetingCalendarWrapper } from './styles.ts'
import { Card, Col, message, Row, Space, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Scheduler } from '@aldabil/react-scheduler'
import { useEffect, useState } from 'react'
import { MeetingDto, RoomDto } from '~/interface'
import { MeetingFilterPayload, meetingTicketService } from '~/service'
import { MeetingFilter, MeetingInfoModal } from '~/pages'
import { AuthSection } from '~/auth'
import { PERMISSION_ROLE_MAP } from '~/role'
import moment from 'moment/moment'
import { ProcessedEvent, RemoteQuery } from '@aldabil/react-scheduler/types'
import { randomColor } from '~/utils'
import dayjs from 'dayjs'
import { DATE_TIME } from '~/constants'

const RoomMeetingCalendar = () => {

  const { t } = useTranslation()

  const [dataState, setDataState] = useState<{
    loading: boolean,
    tickets?: MeetingDto[],
    rooms?: RoomDto[]
  }>({ loading: false, tickets: [], rooms: [] })
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})
  const [remoteQuery, setRemoteQuery] = useState<RemoteQuery>()
  let [roomResources, setRoomResources] = useState<any[]>([])
  const [showSchedule, setShowSchedule] = useState(false)

  useEffect(() => {
    // if (remoteQuery) {
    fetchApi({
      ...filterPayload,
      startTimeStart: dayjs(remoteQuery?.start).format(DATE_TIME.START_DAY),
      startTimeEnd: dayjs(remoteQuery?.end).format(DATE_TIME.END_DAY)
    })
    // }
  }, [filterPayload, remoteQuery])

  const transferRoomsResource = () => {
    roomResources = dataState.rooms?.map((room) => {
      return {
        ...room,
        roomId: room.id,
        color: randomColor()
      }
    }) ?? []
    setRoomResources(roomResources)
  }

  useEffect(() => {
    transferRoomsResource()
  }, [dataState.rooms])

  useEffect(() => {
    setTimeout(() => {
      setShowSchedule(true)
    }, 1500)
  }, [roomResources])

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setFilterPayload(filterPayload)
  }

  const fetchApi = (payload: MeetingFilterPayload) => {
    setDataState({ ...dataState, loading: true })
    meetingTicketService.findWithRoom(payload).then((response) => {
      if (response.data) {
        setDataState({ loading: false, rooms: response.data.rooms, tickets: response.data.tickets })
      }
    }).catch((error) => {
      setDataState({ ...dataState, loading: false })
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
    <RoomMeetingCalendarWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.rooms.title')}</h2>
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_TICKET_FILTER}>
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <MeetingFilter calendar onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Spin spinning={dataState.loading}>
                <Card>
                  {
                    showSchedule &&
                    <Scheduler
                      events={dataState.tickets?.filter((meeting: MeetingDto) => meeting.status != 'CANCEL').map(ticket => {
                        return {
                          event_id: ticket.id,
                          title: `[${ticket.status}] ${ticket.name}`,
                          start: moment(ticket.startTime).toDate(),
                          end: moment(ticket.endTime).toDate(),
                          id: ticket.id,
                          roomId: ticket.roomId
                        } as ProcessedEvent
                      })}
                      day={{
                        startHour: 8,
                        endHour: 24,
                        step: 60,
                        navigation: true
                      }}
                      week={{
                        weekDays: [0, 1, 2, 3, 4, 5],
                        weekStartOn: 6,
                        startHour: 8,
                        endHour: 24,
                        step: 60,
                        navigation: true
                      }}
                      getRemoteEvents={fetchRemote}
                      deletable={false}
                      resources={roomResources}
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
                      customEditor={(scheduler) => <MeetingInfoModal open={true} classname={'w-[950px]'}
                                                                     scheduler={scheduler} />}
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
