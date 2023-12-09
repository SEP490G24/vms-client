import { Descriptions, Divider, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { HistoryDto, MeetingQRDto, PageableResponse } from '~/interface'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment/moment'
import Column from 'antd/es/table/Column'
import { useTranslation } from 'react-i18next'


interface HistoryFormArgs {
  meetingQRDto?: MeetingQRDto
  onClose: () => void
  historyDetailTable?: PageableResponse<HistoryDto>
}

const Info: React.FC<HistoryFormArgs> = (props) => {
  const { t } = useTranslation()
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
            label={t('common.field.title')}>{meetingQRDto?.ticketName}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.purpose')}>{meetingQRDto?.purpose}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.created_by')}>{meetingQRDto?.createBy}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.room')}>{meetingQRDto?.roomName}</DescriptionsItem>
          <DescriptionsItem label={t('common.field.duration')} span={2}>
            <Space size={4}>
              <span>{moment(meetingQRDto?.startTime).format('LTS')}</span>
              <span>~</span>
              <span>{moment(meetingQRDto?.endTime).format('LTS')}</span>
            </Space>
          </DescriptionsItem>
          <DescriptionsItem label={t('common.field.visitorName')}
                            span={3}>{meetingQRDto?.customerInfo.visitorName}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.identificationNumber')}>{meetingQRDto?.customerInfo.identificationNumber}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.email')}>{meetingQRDto?.customerInfo.email}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.phoneNumber')}>{meetingQRDto?.customerInfo.phoneNumber}</DescriptionsItem>
        </Descriptions>
        <Divider orientation={'left'}>History Scan Card</Divider>
        <Space className={'w-full justify-center'}
               size={16}>
          <Table
            dataSource={props.historyDetailTable?.content}
            rowKey='id'
            style={{ width: 1150 }}
            scroll={{ y: 300 }}
            pagination={false}
            className='vms-table no-bg'
            size='middle'
            bordered
          >
            <Column title={t('common.field.room_name')} dataIndex='roomName' key='roomName' />
            <Column title={t('common.field.status')} dataIndex='status' key='status' />
            <Column title={t('common.field.created_on')} key='createdOn'
                    render={(value: HistoryDto) => moment(value.createdOn).format('DD/MM/YYYY HH:mm')} />
          </Table>
        </Space>
      </Space>
    </>
  )
}

export default Info
