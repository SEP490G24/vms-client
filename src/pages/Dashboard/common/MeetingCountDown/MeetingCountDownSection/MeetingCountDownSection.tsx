import React from 'react'
import { MeetingCountDownSectionWrapper } from './styles.ts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, CountdownProps, List, Tooltip } from 'antd'
import { MeetingDto } from '~/interface'
import Countdown from 'antd/es/statistic/Countdown'

interface Props {
  title: string
  data?: MeetingDto[]
  state: 'current' | 'future' | 'finish'
}

const MeetingCountDownSection: React.FC<Props> = (props) => {

  const getDeadline = (meeting: MeetingDto): number => {
    switch (props.state) {
      case 'future':
        return (new Date(meeting.startTime).getTime() - Date.now())
      case 'current':
        return (new Date(meeting.endTime).getTime() - Date.now())
      case 'finish':
      default:
        return 0
    }
  }

  const onFinish: CountdownProps['onFinish'] = () => {
  }

  return (
    <MeetingCountDownSectionWrapper title={[props.title]}>
      <PerfectScrollbar className={'w-full h-[240px]'} options={{ suppressScrollX: true }}>
        <List
          grid={{ gutter: 12 }}
          dataSource={props.data}
          renderItem={(meeting: MeetingDto) => (
            <List.Item>
              <Card className={'bg-body'}>
                <Countdown
                  title={
                    <Tooltip placement='topLeft' title={meeting.name} arrow={true}>
                      <span
                        className={'w-[120px] truncate block'}>{meeting.name}
                      </span>
                    </Tooltip>
                  } value={getDeadline(meeting)}
                  onFinish={onFinish} />
              </Card>
            </List.Item>
          )}
        />
      </PerfectScrollbar>
    </MeetingCountDownSectionWrapper>
  )
}

export default MeetingCountDownSection
