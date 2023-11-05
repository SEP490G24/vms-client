import React from 'react'
import { Dropdown, MenuProps } from 'antd'
import { EllipsisOutlined, MoreOutlined } from '@ant-design/icons'
import { MeetingDto } from '~/interface'

interface MeetingActionProps {
  meeting: MeetingDto
  onCancel: (meeting: MeetingDto) => void
  directionIcon?: 'horizontal' | 'vertical';
}

export const MeetingActions: React.FC<MeetingActionProps> = React.memo((props) => {



  const meetingActions: MenuProps['items'] = [
    {
      label: 'Cancel meeting',
      key: '1',
      danger: true,
      onClick: () => props.onCancel(props.meeting)
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
