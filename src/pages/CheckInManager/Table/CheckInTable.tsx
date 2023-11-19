import React from 'react'
import Column from 'antd/es/table/Column'
import { PageableResponse, CheckInDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<CheckInDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
}

const CheckInTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey='id'
      pagination={{
        current: props.currentPage,
        total: props.pageableResponse?.totalElements,
        pageSize: props.pageableResponse?.pageable?.pageSize,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      loading={props.loading}
      onChange={props.onChangeTable}
      className='vms-table no-bg'
      size='middle'
    >
      <Column
        title={t('common.field.ticket_name')}
        sorter={true}
        key='name'
        render={(value: CheckInDto) => value.ticketName}
      />
      <Column title={t('common.field.purpose')} dataIndex='purpose' key='purpose' />
      <Column title={t('common.field.status')} dataIndex='ticketStatus' key='ticketStatus' />
      <Column
        title={t('common.field.visitor_name')}
        sorter={true}
        key='name'
        render={(value: CheckInDto) => value.customerInfo.visitorName}
      />
      <Column title={t('common.field.room_name')} dataIndex='roomName' key='roomName' />
      <Column title={t('common.field.start_time')} key='startTime' sorter={true}
              render={(value: CheckInDto) => moment(value.startTime).format('L')} />
      <Column title={t('common.field.end_time')} key='endTime' sorter={true}
              render={(value: CheckInDto) => moment(value.endTime).format('L')} />
    </Table>
  )
}

export default CheckInTable
