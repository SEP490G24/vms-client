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
        <Divider orientation={'left'}>History Scan Card</Divider>
        <Space className={'w-full justify-center'}
               size={16}>
          <Table
            dataSource={props.historyDetailTable?.content}
            rowKey='id'
            style={{width:950}}
            pagination={{
              //current: props.currentPage,
              total: props.historyDetailTable?.totalElements,
              pageSize: props.historyDetailTable?.pageable?.pageSize,
              showSizeChanger: false,
              position: ['bottomCenter']
            }}
            // loading={props.loading}
            // onChange={props.onChangeTable}
            className='vms-table no-bg'
            size='middle'
            bordered
          >
            <Column title={t('common.field.room_name')} dataIndex='roomName' key='roomName' />
            <Column title={t('common.field.status')} dataIndex='status' key='status' />
            <Column title={t('common.field.created_on')} key='createdOn' sorter={true}
                    render={(value: HistoryDto) => moment(value.createdOn).format('DD/MM/YYYY HH:mm')} />
          </Table>
        </Space>
      </Space>
    </>
  )
}

export default Info
