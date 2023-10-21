import { MeetingCalendarWrapper } from './styles.ts'
import { Badge, BadgeProps, Calendar, CalendarProps, Card, Col, Descriptions, Row, Space } from 'antd'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { checkPermission } from '~/utils'
import { BUTTON_ROLE_MAP } from '~/role'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import DescriptionsItem from 'antd/es/descriptions/Item'


const getListData = (value: Dayjs) => {
  let listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' }
      ]
      break
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' }
      ]
      break
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ]
      break
    default:
  }
  return listData || []
}

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394
  }
}

const MeetingCalendar = () => {

  const { t } = useTranslation()


  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value)
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }


  return (
    <MeetingCalendarWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.calendar.title')}</h2>
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'auto'}>
              <Card>
                <Calendar cellRender={cellRender} />
              </Card>
            </Col>
            <Col flex={'none'} style={{ width: 550 }}>
              <Card className={'w-full'} bodyStyle={{padding: '24px 0'}}>
                <PerfectScrollbar className={'w-full px-6 max-h-[792px]'}>
                  <Space className={'w-full'} align={'center'} direction={'vertical'} size={24} classNames={{item: 'w-full flex-1'}}>
                    {[...Array(10)].map((_, i) => (
                      <Card
                        key={i}
                        className={'bg-body w-full'}
                        actions={[
                          <SettingOutlined key='setting' />,
                          <EditOutlined key='edit' />,
                          <EllipsisOutlined key='ellipsis' />
                        ]}
                      >
                        <Descriptions bordered >
                          <DescriptionsItem label={'Product'} span={3}>
                            Cloud Database
                          </DescriptionsItem>
                          <DescriptionsItem label={'Room'} span={3}>
                            Room Meeting 2
                          </DescriptionsItem>
                          <DescriptionsItem label={'Order time'} span={3}>
                            2018-04-24 18:00:00
                          </DescriptionsItem>
                          <DescriptionsItem label={'Status'} span={3}>
                            <Badge status="processing" text="Running" />
                          </DescriptionsItem>
                        </Descriptions>
                      </Card>
                    ))}
                  </Space>
                </PerfectScrollbar>
              </Card>
            </Col>
          </Row>
        )}
      </Space>
    </MeetingCalendarWrapper>
  )
}

export default MeetingCalendar
