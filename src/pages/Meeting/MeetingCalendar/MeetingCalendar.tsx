import { MeetingCalendarWrapper } from './styles.ts'
import { Avatar, Badge, BadgeProps, Calendar, CalendarProps, Card, Col, Row, Space } from 'antd'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { checkPermission } from '~/utils'
import { BUTTON_ROLE_MAP } from '~/role'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'


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
            <Col flex={'none'} style={{ width: 450 }}>
              <PerfectScrollbar className={'w-full h-[85vh]'}>
                <Space className={'w-full'} align={'center'} direction={'vertical'} size={24}>
                  {[...Array(10)].map((_, i) => (
                    <Card
                      key={i}
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt='example'
                          src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                        />
                      }
                      actions={[
                        <SettingOutlined key='setting' />,
                        <EditOutlined key='edit' />,
                        <EllipsisOutlined key='ellipsis' />
                      ]}
                    >
                      <Meta
                        avatar={<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />}
                        title='Card title'
                        description='This is the description'
                      />
                    </Card>
                  ))}
                </Space>
              </PerfectScrollbar>
            </Col>
          </Row>
        )}
      </Space>
    </MeetingCalendarWrapper>
  )
}

export default MeetingCalendar
