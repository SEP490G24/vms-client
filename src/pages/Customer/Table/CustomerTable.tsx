import React from 'react'
import Column from 'antd/es/table/Column'
import { CustomerDto, PageableResponse } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { DATE_TIME_COMMON } from '~/constants'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<CustomerDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: CustomerDto) => void
}

const CustomerTable: React.FC<MeetingItemProps> = (props) => {

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
      scroll={{x: 1200}}
      className='vms-table no-bg'
      size='middle'
    >
      <Column
        title={t('common.field.name')}
        sorter={true}
        render={(value: CustomerDto) => <a onClick={() => props.onEdit(value)}>{value.visitorName}</a>}
      />
      <Column title={t('common.field.identificationNumber')} sorter={true} dataIndex='identificationNumber' key='identificationNumber' />
      <Column title={t('common.field.contact_number')} sorter={true} dataIndex='phoneNumber' key='phoneNumber' />
      <Column title={t('common.field.email')} sorter={true} dataIndex='email' key='email' />
      <Column title={t('common.field.createdBy')} sorter={true} dataIndex='createdBy' key='createdBy' />
      <Column title={t('common.field.created_on')} key='createdOn' sorter={true}
              render={(value: CustomerDto) => moment(value.createdOn).format(DATE_TIME_COMMON.START_DAY)} />

    </Table>
  )
}

export default CustomerTable
