import { Descriptions, Divider, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { HistoryDto, MeetingQRDto, PageableResponse } from '~/interface'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'


interface HistoryFormArgs {
  meetingDto?: MeetingQRDto
  historyDetailTable?: PageableResponse<HistoryDto>
}

const Info: React.FC<HistoryFormArgs> = (props) => {
  const { t } = useTranslation()
  const [meetingQRDto, setMeetingQRDto] = useState<MeetingQRDto>()
  useEffect(() => {
    setMeetingQRDto(props.meetingDto)
  }, [props.meetingDto])
  return (
    <>
      <Space className={'w-full'} direction={'vertical'}
             size={32}>
        <Divider orientation={'left'}>{t('common.field.ticket_info')}</Divider>
        <Descriptions bordered>
          <DescriptionsItem
            label={'Title'}>{meetingQRDto?.name}</DescriptionsItem>
          <DescriptionsItem
            label={'Purpose'}>{meetingQRDto?.purpose}</DescriptionsItem>
          <DescriptionsItem
            label={'CreateBy'}>{meetingQRDto?.createBy}</DescriptionsItem>
          <DescriptionsItem
            label={'Room'}>{meetingQRDto?.roomName}</DescriptionsItem>
          <DescriptionsItem label={'Duration'} span={2}>
            <Space size={4}>
              <span>{moment(meetingQRDto?.startTime).format('LTS')}</span>
              <span>~</span>
              <span>{moment(meetingQRDto?.endTime).format('LTS')}</span>
            </Space>
          </DescriptionsItem>
        </Descriptions>
      </Space>
    </>
  )
}

export default Info
