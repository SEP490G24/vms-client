import React from 'react'
import Column from 'antd/es/table/Column'
import { DepartmentDto, PageableResponse, SiteDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Space, Table, TablePaginationConfig } from 'antd'
import { SharedStatus } from '~/common'
import { FilterValue } from 'antd/es/table/interface'
import { SharedActionDelete } from '~/common/SharedActionDelete'
import { PERMISSION_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<SiteDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  loading: boolean
  onEdit: (value: SiteDto) => void
  onDelete: (id: string) => void
}

const SiteTable: React.FC<MeetingItemProps> = (props) => {

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
      <Column
        title={t('common.field.code')}
        sorter={true}
        key='code'
        render={(value: SiteDto) => <a onClick={() => props.onEdit(value)}>{value.code}</a>}
      />
      <Column title={t('common.field.name')} dataIndex='name' key='name' />

      <Column title={t('common.field.contact_number')} dataIndex='phoneNumber' key='phoneNumber' />
      <Column title={t('common.field.province')}
              render={(site: SiteDto) => site.provinceName ? <Space direction={'vertical'}>
                <strong>{site.provinceName}</strong>
                <span>{site.districtName} - {site.communeName}</span>
              </Space> : null}
      />
      <Column title={t('common.field.address')} dataIndex='address' key='address' />
      <Column title={t('common.field.tax_code')} dataIndex='taxCode' key='taxCode' />
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
              render={(value: SiteDto) => moment(value.createdOn).format('L')} />
      {checkPermission(PERMISSION_ROLE_MAP.R_SITE_DELETE) &&
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

export default SiteTable
