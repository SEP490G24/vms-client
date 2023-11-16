import { RoomMeetingCalendarWrapper } from './styles.ts'
import { Card, Col, message, Row, Space, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { RESOURCES, ROOM_EVENTS } from '~/data/event.ts'
import { Scheduler } from '@aldabil/react-scheduler'
import { useEffect, useState } from 'react'
import { MeetingDto, RoomDto } from '~/interface'
import { MeetingFilterPayload, meetingTicketService } from '~/service'
import { MeetingFilter } from '~/pages'
import { AuthSection } from '~/auth'
import { PERMISSION_ROLE_MAP } from '~/role'

const RoomMeetingCalendar = () => {

  const { t } = useTranslation()

  const [dataState, setDataState] = useState<{
    loading: boolean,
    tickets?: MeetingDto[],
    rooms?: RoomDto[]
  }>({ loading: false })
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})


  useEffect(() => {
    fetchApi()
  }, [])

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setFilterPayload(filterPayload)
  }

  const fetchApi = () => {
    setDataState({ ...dataState, loading: true })
    meetingTicketService.findWithRoom(filterPayload).then((response) => {
      if (response.data) {
        setDataState({ ...dataState, rooms: response.data.rooms, tickets: response.data.tickets })
      }
    }).catch(() => message.error(t('common.message.error')))
      .finally(() => {
        setDataState({ ...dataState, loading: false })
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
                  <Scheduler
                    events={ROOM_EVENTS}
                    resources={RESOURCES}
                    resourceViewMode={'tabs'}
                    resourceFields={{
                      idField: 'admin_id',
                      textField: 'title',
                      subTextField: 'mobile',
                      avatarField: 'title',
                      colorField: 'color'
                    }}
                    fields={[
                      {
                        name: 'admin_id',
                        type: 'select',
                        default: RESOURCES[0].admin_id,
                        options: RESOURCES.map((res) => {
                          return {
                            id: res.admin_id,
                            text: `${res.title} (${res.mobile})`,
                            value: res.admin_id //Should match "name" property
                          }
                        }),
                        config: { label: 'Assignee', required: true }
                      }
                    ]}
                  />
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
