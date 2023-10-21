import React from 'react'
import Column from 'antd/es/table/Column'
import { DepartmentDto, PageableResponse, SiteDto, UserDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<SiteDto>
  currentPage: number
  setCurrentPage: (value: number) => void
  onEdit: (value: SiteDto) => void
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
        onChange: props.setCurrentPage,
        pageSize: props.pageableResponse?.pageable?.pageSize as number,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      className='vms-table no-bg'
      scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
      size='middle'
    >
      <Column
        title={t('common.field.department')}
        render={(value: DepartmentDto) => <a onClick={() => props.onEdit(value)}>{value.name}</a>}
      />
      <Column title={t('common.field.site.name')} dataIndex='siteName' key='siteName' />
      <Column title={t('common.field.code')} dataIndex='code' key='code' />
      <Column
        title={t('common.field.status')}
        dataIndex='enable'
        key='enable'
        render={(enable) =>
          enable ? t('common.label.enable') : t('common.label.disable')
        }
      />
      <Column title={t('common.field.registration_date')} key='createdOn'
              render={(value: UserDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.modification_date')} key='lastUpdatedOn'
              render={(value: UserDto) => moment(value.lastUpdatedOn ?? value.createdOn).format('L')} />
    </Table>
  )
}

export default DepartmentTable
