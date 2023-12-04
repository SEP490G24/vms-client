import { Descriptions, Divider, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { HistoryDto, MeetingQRDto, PageableResponse } from '~/interface'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment/moment'


interface HistoryFormArgs {
  meetingQRDto?: MeetingQRDto
  onClose: () => void
  historyDetailTable?: PageableResponse<HistoryDto>
}

const Info: React.FC<HistoryFormArgs> = (props) => {
  // const { t } = useTranslation()
  const [meetingQRDto, setMeetingQRDto] = useState<MeetingQRDto>()
  useEffect(() => {
    setMeetingQRDto(props.meetingQRDto)
  }, [props.meetingQRDto])
  return (
    <>
      <Space className={'w-full'} direction={'vertical'}
             size={32}>
        <Divider orientation={'left'}>Ticket History</Divider>
        <Descriptions bordered>
          <DescriptionsItem
            label={'Title'}>{meetingQRDto?.ticketName}</DescriptionsItem>
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
          <DescriptionsItem label={'Customer'}
                            span={3}>{meetingQRDto?.customerInfo.visitorName}</DescriptionsItem>
          <DescriptionsItem
            label={'Identification Number'}>{meetingQRDto?.customerInfo.identificationNumber}</DescriptionsItem>
          <DescriptionsItem
            label={'Email'}>{meetingQRDto?.customerInfo.email}</DescriptionsItem>
          <DescriptionsItem
            label={'PhoneNumber'}>{meetingQRDto?.customerInfo.phoneNumber}</DescriptionsItem>
        </Descriptions>
      </Space>
    </>
  )
}

export default Info
