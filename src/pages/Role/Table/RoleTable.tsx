import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Column from 'antd/es/table/Column'
import { PageableResponse, RoleDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Space, Table, TablePaginationConfig } from 'antd'
import { SharedStatus } from '~/common'
import { FilterValue } from 'antd/es/table/interface'
import { PATH_ROLE_DETAIL } from '~/routes/paths'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<RoleDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage: number
  onEdit: (value: RoleDto) => void
}

const RoleTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()
  const navigate = useNavigate()
console.log(props.pageableResponse)
  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey='id'
      pagination={{
        current: props.currentPage,
        total: props.pageableResponse?.totalElements as number,
        pageSize: props.pageableResponse?.pageable?.pageSize as number,
        showSizeChanger: false,
        position: ['bottomCenter'],
      }}
      onChange={props.onChangeTable}
      className='vms-table no-bg'
      size='middle'
    >
      <Column title={''} dataIndex='stt'  key='stt' />
      <Column
        title={t('common.field.name')}
        sorter={true}
        render={(value: RoleDto) => <a onClick={() => navigate(PATH_ROLE_DETAIL)}>{value.attributes.name}</a>}
      />
      <Column title={t('common.field.code')} sorter={true} dataIndex='code' key='phoneNumber' />
      <Column title={t('common.field.description')} dataIndex='description' key='address' />
      <Column title={t('common.field.site.name')} key='address'
              render={(value: RoleDto) => value.attributes.site_id} />
      <Column
        title={t('common.field.status')}
        dataIndex='enable'
        key='enable'
        filters={[
          { text: t('common.label.enable'), value: true },
          { text: t('common.label.disable'), value: false },
        ]}
        filterMultiple={false}
        render={(enable) => <SharedStatus status={enable} />}
      />

    </Table>
  )
}

export default RoleTable
