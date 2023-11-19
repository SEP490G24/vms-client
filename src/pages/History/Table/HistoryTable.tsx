import React from 'react'
import Column from 'antd/es/table/Column'
import { HistoryDto, PageableResponse, SiteDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<SiteDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: SiteDto) => void
}

const HistoryTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  // @ts-ignore
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
        key='ticketName'
        render={(value: any) => value.ticketName}
      />
      <Column title={t('organization.history.table.roomName')} dataIndex='roomName' key='roomName' />
      <Column
        title={t('organization.history.table.visitorName')}
        key='visitorName'
        dataIndex='visitorName'
      />
      <Column
        title={t('common.field.phoneNumber')}
        key='phoneNumber'
        dataIndex='phoneNumber'
      />
      <Column title={t('common.field.status')} dataIndex='ticketCustomerStatus' key='ticketCustomerStatus' />
      <Column title={t('common.field.created_on')} key='createdOn' sorter={true}
              render={(value: HistoryDto) => moment(value.createdOn).format('L')} />
      <Column title={t('organization.history.table.check_in')} key='checkInTime' sorter={true}
              render={(value: HistoryDto) => value.checkInTime ? moment(value.checkInTime).format('L') : null} />
      <Column title={t('organization.history.table.check_out')} key='checkOutTime' sorter={true}
              render={(value: HistoryDto) => value.checkOutTime ? moment(value.checkOutTime).format('L') : null} />
    </Table>
  )
}

export default HistoryTable
