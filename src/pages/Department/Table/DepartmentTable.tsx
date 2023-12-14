import React from 'react'
import Column from 'antd/es/table/Column'
import { DepartmentDto, PageableResponse } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { SharedStatus } from '~/common'
import { FilterValue } from 'antd/es/table/interface'
import { SharedActionDelete } from '~/common/SharedActionDelete'
import { PERMISSION_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<DepartmentDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: DepartmentDto) => void
  onDelete: (id: string) => void
}

const DepartmentTable: React.FC<MeetingItemProps> = (props) => {

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
      className='vms-table no-bg'
      onChange={props.onChangeTable}
      scroll={{ x: 1200 }}
      size='middle'
    >
      <Column
        title={t('common.field.code')}
        sorter={true}
        key='name'
        render={(value: DepartmentDto) => <a onClick={() => props.onEdit(value)}>{value.code}</a>}
      />
      <Column title={t('common.field.department')} dataIndex='name' key='name' />
      <Column title={t('common.field.site.name')} dataIndex='siteName' key='siteName' />
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
              render={(value: DepartmentDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.modification_date')} key='lastUpdatedOn' sorter={true}
              render={(value: DepartmentDto) => value.lastUpdatedOn ? moment(value.lastUpdatedOn).format('L') : undefined} />
      {checkPermission(PERMISSION_ROLE_MAP.R_DEPARTMENT_DELETE) &&
        <Column title={t('common.field.action')} key='operation' fixed={'right'} width={80}
                render={(value: DepartmentDto) =>
                  <>
                    <SharedActionDelete onDelete={props.onDelete} id={value.id}
                                        directionIcon={'vertical'} />

                  </>

                } />
      }
    </Table>
  )
}

export default DepartmentTable
