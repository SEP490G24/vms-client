import React from 'react'
import { Card, Descriptions, Space } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { MeetingDto } from '~/interface'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { MeetingActions } from '~/pages/Meeting/common'
import { MeetingBookMark } from '~/service'

interface MeetingItemProps {
  meeting: MeetingDto
  onEdit: (value: MeetingDto) => void
  onCancelMeeting: (meeting: MeetingDto) => void
  onBookmark: (payload: MeetingBookMark) => void
  onUnBookmark: (payload: MeetingBookMark) => void
}

export const MeetingItem: React.FC<MeetingItemProps> = React.memo((props) => {
  const { t } = useTranslation()

  return (
    <Card
      className={'bg-body w-full'}
      actions={[
        <EditOutlined key='edit' onClick={() => props.onEdit(props.meeting)} />,
        <MeetingActions onCancel={props.onCancelMeeting} meeting={props.meeting} onBookMark={props.onBookmark} onUnBookMark={props.onUnBookmark}/>,
      ]}
    >
      <Descriptions bordered>
        <DescriptionsItem label={t('common.field.title')} span={3}><strong className={'truncate block'}>{props.meeting.name}</strong></DescriptionsItem>
        <DescriptionsItem label={t('common.field.purpose')} span={3}>{props.meeting.purpose}</DescriptionsItem>
        <DescriptionsItem label={t('common.field.duration')} span={3}>
          <Space direction={'vertical'} size={4}>
            <strong>{moment(props.meeting.startTime).format('DD-MM-YYYY')}</strong>
            <Space direction={'horizontal'} size={4}>
              <p>{moment(props.meeting.startTime).format('LTS')}</p>
              <span>~</span>
              <p>{moment(props.meeting.endTime).format('LTS')}</p>
            </Space>
          </Space>
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.room')} span={3}>{props.meeting.roomName}</DescriptionsItem>
        <DescriptionsItem label={t('common.field.createdBy')} span={3}>{props.meeting.createdBy}</DescriptionsItem>
        <DescriptionsItem label={t('common.field.guest')} span={3}>
          {props.meeting.customerCount} people
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.purposeNote')} span={3}>{props.meeting.purposeNote}</DescriptionsItem>
        <DescriptionsItem label={t('common.field.description')} span={3}>{props.meeting.description}</DescriptionsItem>
      </Descriptions>
    </Card>
  )
})
