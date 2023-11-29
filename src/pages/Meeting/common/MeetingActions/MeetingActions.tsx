import React from 'react'
import { Dropdown, MenuProps } from 'antd'
import { EllipsisOutlined, MoreOutlined } from '@ant-design/icons'
import { MeetingDto } from '~/interface'
import { MeetingBookMark } from '~/service'

interface MeetingActionProps {
  meeting: MeetingDto
  onCancel: (meeting: MeetingDto) => void
  directionIcon?: 'horizontal' | 'vertical';
  onBookMark:(payload: MeetingBookMark) => void
}

export const MeetingActions: React.FC<MeetingActionProps> = React.memo((props) => {

  const meetingActions: MenuProps['items'] = [
    {
      label: 'Cancel meeting',
      key: '1',
      danger: true,
      onClick: () => props.onCancel(props.meeting)
    },
    {
      label: 'Bookmark',
      key: '2',
      danger: true,
      onClick: () => props.onBookMark({
        bookmark: !props.meeting.bookmark,
        ticketId: props.meeting.id
      },)
    }
  ]

  return (
    <>
      <Dropdown menu={{ items: meetingActions }} placement='bottom'>
        {props.directionIcon === 'vertical' ? <MoreOutlined key='ellipsis' /> : <EllipsisOutlined key='ellipsis' />}

      </Dropdown>
    </>
  )
})
