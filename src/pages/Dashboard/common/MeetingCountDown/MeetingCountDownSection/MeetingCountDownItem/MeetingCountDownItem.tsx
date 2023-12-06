import React, { useEffect, useState } from 'react'
import { Card, CountdownProps, Modal, Tooltip } from 'antd'
import { MeetingDto, MeetingQRDto } from '~/interface'
import Countdown from 'antd/es/statistic/Countdown'
import { TicketInfo } from '~/pages/Dashboard/common/TicketInfo'

interface Props {
  meeting: MeetingDto
  meetingDetail: MeetingQRDto
  onFinish: (meeting: MeetingDto) => void
  state: 'current' | 'future' | 'finish'
  isOpenModal: boolean
  onClose: () => void
  onOpen: () => void
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
    <div
      onClick={() => {
        props.onOpen()
        }
      }
    >
      <Card className={'bg-body'}
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
        <Modal open={props.isOpenModal}
               closable={true}
               title={null}
               footer={null}
               confirmLoading={true}
               width={1000}
               onCancel={props.onClose}
        >
          <TicketInfo meetingDto={props.meetingDetail}/>
        </Modal>
      </Card>
    </div>

  )
}

export default MeetingCountDownItem
