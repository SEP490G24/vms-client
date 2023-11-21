import React from 'react'
import { PageableResponse, RoleDto } from '~/interface'
import { Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import Column from 'antd/es/table/Column'
import { useTranslation } from 'react-i18next'
import { RoleActions } from '~/pages/Role/common/RoleActions'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<RoleDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: RoleDto) => void
}

const RoleTable: React.FC<MeetingItemProps> = (props) => {

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
      <Column title={t('common.field.code')} key='code'
              render={(value: RoleDto) => <a onClick={() => props.onEdit(value)}>{value.code}</a>}
      />
      <Column title={t('common.field.name')} key='name'
              render={(value: RoleDto) => value.attributes['name']}
      />
      <Column title={t('common.field.description')} key='description' dataIndex={'description'} />
      <Column title={t('common.field.action')} key='operation' fixed={'right'} width={80}
              render={(value: RoleDto) => <RoleActions role={value} directionIcon={'vertical'} />} />
    </Table>
  )
}

export default RoleTable
