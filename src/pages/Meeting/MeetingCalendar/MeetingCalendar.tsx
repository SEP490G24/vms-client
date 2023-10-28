import { MeetingCalendarWrapper } from './styles.ts'
import { Card, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { EVENTS } from '~/data/event.ts'
import { Scheduler } from '@aldabil/react-scheduler'
import { MeetingInfo } from '~/pages/Meeting/common/MeetingInfo'


const MeetingCalendar = () => {

  const { t } = useTranslation()

  return (
    <MeetingCalendarWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.calendar.title')}</h2>
        </Space>
        {/*{checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (*/}
        <Card>
          <Scheduler
            fields={[{ name: 'id', type: 'input' }]}
            dialogMaxWidth={'xl'}
            customEditor={(scheduler) => <MeetingInfo classname={'w-[650px]'} scheduler={scheduler} />}
            events={EVENTS}
          /></Card>
      </Space>
    </MeetingCalendarWrapper>
  )
}

export default MeetingCalendar
