import React from 'react'
import { Dropdown, MenuProps } from 'antd'
import { EllipsisOutlined, MoreOutlined } from '@ant-design/icons'
import { MeetingDto } from '~/interface'
import { MeetingBookMark } from '~/service'
import { useTranslation } from 'react-i18next'

interface MeetingActionProps {
  meeting: MeetingDto
  onCancel: (meeting: MeetingDto) => void
  directionIcon?: 'horizontal' | 'vertical';
  onBookMark: (payload: MeetingBookMark) => void
  onUnBookMark: (payload: MeetingBookMark) => void
}

export const MeetingActions: React.FC<MeetingActionProps> = React.memo((props) => {
  const { t } = useTranslation()

  const meetingActions: MenuProps['items'] = [
    {
      label: t('common.label.cancel_meeting'),
      key: '1',
      danger: true,
      onClick: () => props.onCancel(props.meeting),
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
