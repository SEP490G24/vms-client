import React from 'react'
import Column from 'antd/es/table/Column'
import { MeetingDto, PageableResponse } from '~/interface'
import { Purpose, StatusTicketMeeting } from '~/constants'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Space, Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { MeetingActions } from '~/pages/Meeting/common'
import { enumToArray } from '~/utils'
import { MeetingBookMark } from '~/service'

interface MeetingItemProps {
  loading: boolean
  pageableResponse?: PageableResponse<MeetingDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  onCancelMeeting: (meeting: MeetingDto) => void
  onEdit: (value: MeetingDto) => void
  onBookmark: (payload: MeetingBookMark) => void
}

const MeetingTable: React.FC<MeetingItemProps> = (props) => {

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
        position: ['bottomCenter'],
      }}
      loading={props.loading}
      onChange={props.onChangeTable}
      scroll={{ x: 1200 }}
      className='vms-table no-bg'
      size='middle'
    >
      <Column
        title={t('common.field.name')}
        render={(value: MeetingDto) => <a onClick={() => props.onEdit(value)}>{value.name}</a>}
      />
      <Column title={t('common.field.purpose')}
              key='purpose'
              filters={enumToArray(Purpose).map(purpose => {
                return { text: purpose.key, value: purpose.key }
              })}
              filterMultiple={true}
              render={(value: MeetingDto) => <Space direction={'vertical'}>
                <strong>{value.purpose}</strong>
                <span>{value.purposeNote}</span>
              </Space>}
      />
      <Column title={t('common.field.participate')} key='participate'
              render={(value: MeetingDto) => value.customers && <>{value.customers.length} people</>} />
      <Column title={t('common.field.room')} dataIndex='roomName' key='roomName' />
      <Column title={t('common.field.duration')} key='duration'
              render={(value: MeetingDto) => <Space direction={'vertical'} size={4}>
                <strong>{moment(value.startTime).format('DD-MM-YYYY')}</strong>
                <Space direction={'horizontal'} size={4}>
                  <p>{moment(value.startTime).format('LTS')}</p>
                  <span>~</span>
                  <p>{moment(value.endTime).format('LTS')}</p>
                </Space>
              </Space>} />
      <Column title={t('common.field.status')} dataIndex='status' key='status'
              filters={enumToArray(StatusTicketMeeting).map(item => {
                return { text: item.key, value: item.key }
              })}
              filterMultiple={true}
      />
      <Column title={t('common.field.createdBy')} dataIndex='createdBy' key='createdBy' />
      <Column title={t('common.field.created_on')} key='createdOn'
              render={(value: MeetingDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.action')} key='operation' fixed={'right'} width={80}
              render={(value: MeetingDto) =>
                <>
                  <MeetingActions onCancel={props.onCancelMeeting} meeting={value}
                                  directionIcon={'vertical'} onBookMark={props.onBookmark}/>

                </>

      } />
</Table>
)
}

export default MeetingTable
