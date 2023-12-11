import React from 'react'
import Column from 'antd/es/table/Column'
import { PageableResponse, DeviceDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Table, TablePaginationConfig, Tooltip } from 'antd'
import { SharedStatus } from '~/common'
import { FilterValue } from 'antd/es/table/interface'
import { SharedActionDelete } from '~/common/SharedActionDelete'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<DeviceDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: DeviceDto) => void
  onDelete: (id: string) => void
}

const DeviceTable: React.FC<MeetingItemProps> = (props) => {

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
              render={(value: DeviceDto) => <a onClick={() => props.onEdit(value)}>{value.code}</a>} />
      <Column
        title={t('common.field.name')}
        sorter={true}
        key='name'
        dataIndex='name'
      />
      <Column title={t('common.field.macIp')} dataIndex='macIp' key='macIp' />
      <Column title={t('common.field.deviceType')} dataIndex='deviceType' key='deviceType' />
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
      <Column title={t('common.field.description')} dataIndex='description'
              key='description' render={(value) => <Tooltip placement={'topLeft'} title={value} arrow={true}><span
        className={'truncate w-[300px] block'}>{value}</span></Tooltip>} />
      <Column title={t('common.field.registration_date')} key='createdOn' sorter={true}
              render={(value: DeviceDto) => moment(value.createdOn).format('L')} />
      <Column title={t('common.field.action')} key='operation' fixed={'right'} width={80}
              render={(value: DeviceDto) =>
                <>
                  <SharedActionDelete onDelete={props.onDelete} id={value.id}
                                      directionIcon={'vertical'} />

                </>

              } />
    </Table>
  )
}

export default DeviceTable
