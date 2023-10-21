import React from 'react'
import Column from 'antd/es/table/Column'
import { PageableResponse, SiteDto, UserDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table } from 'antd'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<SiteDto>
  currentPage: number
  setCurrentPage: (value: number) => void
  onEdit: (value: SiteDto) => void
}

const SiteTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey='sitename'
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
        title={t('common.field.site.name')}
        render={(value: SiteDto) => <a onClick={() => props.onEdit(value)}>{value.name}</a>}
      />
      <Column title={t('common.field.phoneNumber')} dataIndex='phoneNumber' key='phoneNumber' />
      <Column title={t('common.field.province')} dataIndex='province' key='province' />
      <Column title={t('common.field.district')} dataIndex='district' key='district' />
      <Column title={t('common.field.ward')} dataIndex='ward' key='ward' />
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

export default SiteTable
