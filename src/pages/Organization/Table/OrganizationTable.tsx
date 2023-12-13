import React from 'react'
import Column from 'antd/es/table/Column'
import { OrganizationDto, PageableResponse } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { SharedStatus } from '~/common'
import { FilterValue } from 'antd/es/table/interface'
import { SharedActionDelete } from '~/common/SharedActionDelete'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<OrganizationDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: OrganizationDto) => void
  onDelete: (id: string) => void
}

const OrganizationTable: React.FC<MeetingItemProps> = (props) => {

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
      scroll={{ x: 1200 }}
      className='vms-table no-bg'
      size='middle'
    >

      <Column title={t('common.field.code')} key='code'
              render={(value: OrganizationDto) => <a onClick={() => props.onEdit(value)}>{value.code}</a>} />
      <Column
        title={t('common.field.name')}
        sorter={true}
        key='name'
        dataIndex='name'
      />
      <Column title={t('common.field.website')} dataIndex='website' key='website' />

      <Column title={t('common.field.representative')} dataIndex='representative' key='representative' />
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
              render={(value: OrganizationDto) => moment(value.createdOn).format('DD/MM/YYYY')} />
      <Column title={t('common.field.action')} key='operation' fixed={'right'} width={80}
              render={(value: OrganizationDto) =>
                <>
                  <SharedActionDelete onDelete={props.onDelete} id={value.id}
                                      directionIcon={'vertical'} />

                </>

              } />
    </Table>
  )
}

export default OrganizationTable
