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

  const handleBookmark = () => {
    props.onBookMark({
      bookmark: true,
      ticketId: props.meeting.id,
    })
  }

  const handleUnBookmark = () => {
    props.onBookMark({
      bookmark: false,
      ticketId: props.meeting.id,
    })
  }

  const meetingActions: MenuProps['items'] = [
    {
      label: t('common.label.cancel_meeting'),
      key: '1',
      danger: true,
      onClick: () => props.onCancel(props.meeting),
    },
    {
      label: (props.meeting.bookmark) ? t('common.label.unbookmark') : t('common.label.bookmark'),
      key: '2',
      danger: true,
      onClick: () =>{
        (props.meeting.bookmark) ? handleUnBookmark() : handleBookmark()
      }
    },
  ]

  return (
    <>
      <Dropdown menu={{ items: meetingActions }} placement='bottom'>
        {props.directionIcon === 'vertical' ? <MoreOutlined key='ellipsis' /> : <EllipsisOutlined key='ellipsis' />}

      </Dropdown>
    </>
  )
})
