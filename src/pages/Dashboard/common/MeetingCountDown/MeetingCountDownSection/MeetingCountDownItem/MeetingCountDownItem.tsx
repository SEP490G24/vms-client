import React, { useEffect, useState } from 'react'
import { Card, CountdownProps, Tooltip } from 'antd'
import { MeetingDto } from '~/interface'
import Countdown from 'antd/es/statistic/Countdown'

interface Props {
  meeting: MeetingDto
  onFinish: (meeting: MeetingDto) => void
  state: 'current' | 'future' | 'finish'
  onSelected: (meeting: MeetingDto) => void
}

const MeetingCountDownItem: React.FC<Props> = (props) => {

  const [deadline, setDeadline] = useState(0)

  useEffect(() => {
    switch (props.state) {
      case 'future':
        setDeadline(new Date(props.meeting.startTime).getTime())
        break
      case 'current':
        setDeadline(new Date(props.meeting.endTime).getTime())
        break
      case 'finish':
      default:
        setDeadline(0)
        break
    }
  }, [props.meeting])

  const onFinish: CountdownProps['onFinish'] = () => {
    props.onFinish(props.meeting)
  }

  return (
    <Card className={'bg-body'} onClick={() => props.onSelected(props.meeting)}
    >
      <Countdown
        title={
          <Tooltip placement='topLeft' title={props.meeting.name} arrow={true}>
                      <span
                        className={'w-[120px] truncate block'}>{props.meeting.name}
                      </span>
          </Tooltip>
        } value={deadline}
        onFinish={onFinish} />
    </Card>
  )
}

export default MeetingCountDownItem
