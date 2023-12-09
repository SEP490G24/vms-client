import { Descriptions, Divider, Space, Table } from 'antd'
import React from 'react'
import { CustomerDto, MeetingDto } from '~/interface'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import Column from 'antd/es/table/Column'
import { DATE_TIME_COMMON } from '~/constants'


interface HistoryFormArgs {
  meetingDto?: MeetingDto
}

const Info: React.FC<HistoryFormArgs> = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <Space className={'w-full'} direction={'vertical'}
             size={32}>
        <Divider orientation={'left'}>{t('common.field.ticket_info')}</Divider>
        <Descriptions bordered>
          <DescriptionsItem
            label={t('common.field.title')}>{props.meetingDto?.name}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.purpose')}>{props.meetingDto?.purpose}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.createdBy')}>{props.meetingDto?.createdBy}</DescriptionsItem>
          <DescriptionsItem
            label={t('common.field.room')}>{props.meetingDto?.roomName}</DescriptionsItem>
          <DescriptionsItem label={t('common.field.duration')} span={2}>
            <Space size={4}>
              <span>{moment(props.meetingDto?.startTime).format('LTS')}</span>
              <span>~</span>
              <span>{moment(props.meetingDto?.endTime).format('LTS')}</span>
            </Space>
          </DescriptionsItem>
        </Descriptions>
        <Divider orientation={'left'}>{t('meeting.popup.tabs.participants.title')}</Divider>
        <Space className={'w-full justify-center'}
               size={16}>
          <Table
            dataSource={props.meetingDto?.customers}
            rowKey='id'
            pagination={false}
            style={{ width: 950}}
            scroll={{y: 300}}
            className='vms-table no-bg'
            size='middle'
            bordered
          >
            <Column
              title={t('common.field.name')} sorter={true} dataIndex='visitorName' key='visitorName' />
            <Column title={t('common.field.identificationNumber')} dataIndex='identificationNumber'
                    key='identificationNumber' />
            <Column title={t('common.field.contact_number')} dataIndex='phoneNumber' key='phoneNumber' />
            <Column title={t('common.field.email')} dataIndex='email' key='email' />
            <Column title={t('common.field.createdBy')} dataIndex='createdBy' key='createdBy' />
            <Column title={t('common.field.created_on')} key='createdOn'
                    render={(value: CustomerDto) => moment(value.createdOn).format(DATE_TIME_COMMON.START_DAY)} />
          </Table>
        </Space>
      </Space>
    </>
  )
}

export default Info
