import React from 'react'
import Column from 'antd/es/table/Column'
import { PageableResponse, RoomDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { SharedStatus } from '~/common'
import { SharedActionDelete } from '~/common/SharedActionDelete'
import { PERMISSION_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<RoomDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: RoomDto) => void
  onDelete: (id: string) => void
}

const RoomTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey='id'
      loading={props.loading}
      pagination={{
        current: props.currentPage,
        total: props.pageableResponse?.totalElements,
        pageSize: props.pageableResponse?.pageable?.pageSize,
        showSizeChanger: false,
        position: ['bottomCenter']
      }}
      onChange={props.onChangeTable}
      scroll={{ x: 1200 }}
      className='vms-table no-bg'
      size='middle'
    >
      <Column title={t('common.field.code')} key='code'
              render={(value: RoomDto) => <a onClick={() => props.onEdit(value)}>{value.code}</a>}
      />
      <Column
        title={t('common.field.room')}
        sorter={true}
        key='name'
        dataIndex='name'
      />
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
        render={(enable) =>
          <SharedStatus status={enable} />
        }
      />
      <Column title={t('common.field.registration_date')} key='createdOn' sorter={true}
              render={(value: RoomDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.modification_date')} key='lastUpdatedOn' sorter={true}
              render={(value: RoomDto) => value.lastUpdatedOn ? moment(value.lastUpdatedOn).format('L') : undefined} />
      {checkPermission(PERMISSION_ROLE_MAP.R_ROOM_DELETE) &&
        <Column title={t('common.field.action')} key='operation' fixed={'right'} width={80}
                render={(value: RoomDto) =>
                  <>
                    <SharedActionDelete onDelete={props.onDelete} id={value.id}
                                        directionIcon={'vertical'} />

                  </>

                } />
      }
    </Table>
  )
}

export default RoomTable
