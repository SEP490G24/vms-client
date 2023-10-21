import { MeetingCalendarWrapper } from './styles.ts'
import { Card, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { EVENTS } from '~/data/event.ts'
import { Scheduler } from '@aldabil/react-scheduler'


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
            events={EVENTS}
          /></Card>
          {/*<Row gutter={24} wrap={false}>*/}
          {/*  <Col flex={'auto'}>*/}
          {/*    </Card>*/}
          {/*  </Col>*/}
          {/*<Col flex={'none'} style={{ width: 550 }}>*/}
          {/*  <Card className={'w-full'} bodyStyle={{ padding: '24px 0' }}>*/}
          {/*    <PerfectScrollbar className={'w-full px-6 max-h-[792px]'}>*/}
          {/*      <Space className={'w-full'} align={'center'} direction={'vertical'} size={24}*/}
          {/*             classNames={{ item: 'w-full flex-1' }}>*/}
          {/*        {[...Array(10)].map((_, i) => (*/}
          {/*          */}
          {/*        ))}*/}
          {/*      </Space>*/}
          {/*    </PerfectScrollbar>*/}
          {/*  </Card>*/}
          {/*</Col>*/}
          {/*</Row>*/}
          {/*)}*/}
      </Space>
    </MeetingCalendarWrapper>
)
}

export default MeetingCalendar
