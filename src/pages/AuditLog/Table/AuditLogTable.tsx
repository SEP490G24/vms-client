import React from 'react'
import Column from 'antd/es/table/Column'
import { PageableResponse, AuditLogDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<AuditLogDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: AuditLogDto) => void
}

const AuditLogTable: React.FC<MeetingItemProps> = (props) => {

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
        title={t('common.field.created_by')}
        sorter={true}
        key='name'
        dataIndex='createBy'
      />
      <Column title={t('common.field.audit_type')} dataIndex='auditType' key='auditType' />
      <Column title={t('common.field.table_name')} dataIndex='tableName' key='tableName' />
      <Column title={t('common.field.site_name')} dataIndex='siteName' key='siteName' />

      <Column title={t('common.field.date_time')} key='createdOn' sorter={true}
              render={(value: AuditLogDto) => moment(value.createdOn).format('DD/MM/YYYY')} />
      <Column  key='action'
               render={(value: AuditLogDto) => <a onClick={()=>{props.onEdit(value)}}>{t('common.field.view_detail')}</a>} />
    </Table>
  )
}

export default AuditLogTable
