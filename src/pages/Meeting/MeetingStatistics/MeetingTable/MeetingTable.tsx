import React from 'react'
import Column from 'antd/es/table/Column'
import { MeetingDto, PageableResponse, Purpose, StatusTicket } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Space, Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { MeetingActions } from '~/pages/Meeting/common'
import { enumToArray } from '~/utils'

interface MeetingItemProps {
  loading: boolean
  pageableResponse?: PageableResponse<MeetingDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  onCancelMeeting: (meeting: MeetingDto) => void
  onEdit: (value: MeetingDto) => void
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
        position: ['bottomCenter']
      }}
      loading={props.loading}
      onChange={props.onChangeTable}
      className='vms-table no-bg'
      scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
      size='middle'
    >
      <Column
        title={t('common.field.name')}
        sorter={true}
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
      <Column title={t('common.field.room')} sorter={true} dataIndex='roomName' key='roomName' />
      <Column title={t('common.field.duration')} key='duration'
              render={(value: MeetingDto) => <Space direction={'horizontal'} size={4}>
                <strong>{moment(value.startTime).format('LTS')}</strong>
                <span>~</span>
                <strong>{moment(value.endTime).format('LTS')}</strong>
              </Space>} />
      <Column title={t('common.field.status')} dataIndex='status' key='status'
              filters={enumToArray(StatusTicket).map(item => {
                return { text: item.key, value: item.key }
              })}
              filterMultiple={true}
      />
      {/*<Column title={t('common.field.registration_date')} key='createdOn' sorter={true}*/}
      {/*        render={(value: MeetingDto) => moment(value.createdOn).format('L')} />*/}
      {/*<Column title={t('common.field.modification_date')} key='lastUpdatedOn' sorter={true}*/}
      {/*        render={(value: MeetingDto) => moment(value.lastUpdatedOn ?? value.createdOn).format('L')} />*/}
      <Column title={t('common.field.action')} key='operation' fixed={'right'} width={80}
              render={(value: MeetingDto) => <MeetingActions onCancel={props.onCancelMeeting} meeting={value}
                                                             directionIcon={'vertical'} />} />
    </Table>
  )
}

export default MeetingTable
