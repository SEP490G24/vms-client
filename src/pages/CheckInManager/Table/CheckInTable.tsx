import React from 'react'
import Column from 'antd/es/table/Column'
import { v4 as uuid } from 'uuid'
import { MeetingQRDto, PageableResponse } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Space, Table, TablePaginationConfig, Tooltip } from 'antd'
import { FilterValue } from 'antd/es/table/interface'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<MeetingQRDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: MeetingQRDto) => void
}

const CheckInTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey={() => uuid()}
      pagination={{
        current: props.currentPage,
        total: props.pageableResponse?.totalElements,
        pageSize: props.pageableResponse?.pageable?.pageSize,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      loading={props.loading}
      onChange={props.onChangeTable}
      scroll={{ x: 1200 }}
      className='vms-table no-bg'
      size='middle'
    >
      <Column
        title={t('common.field.visitor_name')}
        key='name'
        render={(value: MeetingQRDto) => <a onClick={() => props.onEdit(value)}>{value.customerInfo.visitorName}</a>}
      />
      <Column
        title={t('common.field.title_meeting')}
        key='ticketName'
        render={(value: MeetingQRDto) => <Tooltip placement={'topLeft'} title={value.ticketName} arrow={true}><span
          className={'truncate w-[120px] block'}>{value.ticketName}</span></Tooltip>}
      />
      <Column title={t('common.field.purpose')} dataIndex='purpose' key='purpose' />
      <Column title={t('common.field.checkIn_status')} dataIndex='ticketCustomerStatus' key='ticketCustomerStatus' />
      <Column title={t('common.field.room_name')} dataIndex='roomName' key='roomName' />
      <Column title={t('common.field.duration')} key='startTime'
              render={(value: MeetingQRDto) => <Space direction={'vertical'} size={4}>
                <strong>{moment(value.startTime).format('DD-MM-YYYY')}</strong>
                <Space direction={'horizontal'} size={4}>
                  <p>{moment(value.startTime).format('LTS')}</p>
                  <span>~</span>
                  <p>{moment(value.endTime).format('LTS')}</p>
                </Space>
              </Space>} />
      <Column title={t('common.field.registration_date')} key='createdOn'
              render={(value: MeetingQRDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.modification_date')} key='lastUpdatedOn'
              render={(value: MeetingQRDto) => value.lastUpdatedOn ? moment(value.lastUpdatedOn).fromNow() : undefined} />
    </Table>
  )
}

export default CheckInTable
