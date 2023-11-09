import React from 'react'
import Column from 'antd/es/table/Column'
import { DepartmentDto, PageableResponse, UserDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { SharedStatus } from '~/common'
import { FilterValue } from 'antd/es/table/interface'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<DepartmentDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage: number
  onEdit: (value: DepartmentDto) => void
}

const DepartmentTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey='id'
      pagination={{
        current: props.currentPage,
        total: props.pageableResponse?.totalElements as number,
        pageSize: props.pageableResponse?.pageable?.pageSize as number,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      className='vms-table no-bg'
      onChange={props.onChangeTable}
      size='middle'
    >
      <Column
        title={t('common.field.department')}
        sorter={true}
        render={(value: DepartmentDto) => <a onClick={() => props.onEdit(value)}>{value.name}</a>}
      />
      <Column title={t('common.field.site.name')} dataIndex='siteName' key='siteName' sorter={true} />
      <Column title={t('common.field.code')} dataIndex='code' key='code' sorter={true} />
      <Column
        title={t('common.field.status')}
        dataIndex='enable'
        key='enable'
        filters={[
          { text: t('common.label.enable'), value: true },
          { text: t('common.label.disable'), value: false }
        ]}
        filterMultiple={false}
        render={(enable) => <SharedStatus status={enable} />}
      />
      <Column title={t('common.field.registration_date')} key='createdOn' sorter={true}
              render={(value: UserDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.modification_date')} key='lastUpdatedOn' sorter={true}
              render={(value: UserDto) => moment(value.lastUpdatedOn ?? value.createdOn).format('L')} />
    </Table>
  )
}

export default DepartmentTable
