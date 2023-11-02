import { RoomMeetingCalendarWrapper } from './styles.ts'
import { Card, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { RESOURCES, ROOM_EVENTS } from '~/data/event.ts'
import { Scheduler } from '@aldabil/react-scheduler'


const RoomMeetingCalendar = () => {

  const { t } = useTranslation()

  return (
    <RoomMeetingCalendarWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.calendar.title')}</h2>
        </Space>
        {/*{checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (*/}
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
      </Space>
    </RoomMeetingCalendarWrapper>
  )
}

export default RoomMeetingCalendar
