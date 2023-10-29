import React from 'react'
import Column from 'antd/es/table/Column'
import { PageableResponse, RoomDto, UserDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { SharedStatus } from '~/common'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<RoomDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage: number
  onEdit: (value: RoomDto) => void
}

const RoomTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey='roomname'
      pagination={{
        current: props.currentPage,
        total: props.pageableResponse?.totalElements as number,
        pageSize: props.pageableResponse?.pageable?.pageSize as number,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      onChange={props.onChangeTable}
      className='vms-table no-bg'
      scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
      size='middle'
    >
      <Column
        title={t('common.field.room')}
        sorter={true}
        render={(value: RoomDto) => <a onClick={() => props.onEdit(value)}>{value.name}</a>}
      />
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
        render={(enable) =>
          <SharedStatus status={enable} />
        }
      />
      <Column title={t('common.field.registration_date')} key='createdOn' sorter={true}
              render={(value: UserDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.modification_date')} key='lastUpdatedOn' sorter={true}
              render={(value: UserDto) => value.lastUpdatedOn ? moment(value.lastUpdatedOn).format('L') : null} />
    </Table>
  )
}

export default RoomTable
