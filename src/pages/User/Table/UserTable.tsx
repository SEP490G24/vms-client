import React from 'react'
import Column from 'antd/es/table/Column'
import { PageableResponse, UserDto } from '~/interface'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { Space, Table, TablePaginationConfig, Tag } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { SharedStatus } from '~/common'
import { SCOPE_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'

interface MeetingItemProps {
  loading: boolean
  pageableResponse?: PageableResponse<UserDto>
  onChangeTable?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void
  currentPage?: number
  onEdit: (value: UserDto) => void
}

const UserTable: React.FC<MeetingItemProps> = (props) => {

  const { t } = useTranslation()

  return (
    <Table
      dataSource={props.pageableResponse?.content}
      rowKey='username'
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
      <Column title={t('common.field.username')} key='username' sorter={true}
              render={(value: UserDto) => <a onClick={() => props.onEdit(value)}>{value.username}</a>}
      />
      <Column
        title={t('common.field.fullName')}
        render={(value: UserDto) => <>{value.firstName + ' ' + value.lastName}</>}
      />
      {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
        <Column title={t('common.field.site_name')} dataIndex='siteName'/>
      }
      <Column
        title={t('common.field.roles')}
        render={(value: UserDto) => <Space direction={'vertical'}>{value.roles?.map((item, index) =>
          <Tag key={index}>{item}</Tag>)}</Space>}
      />
      {/*<Column title={t('common.field.dob')} dataIndex='dateOfBirth' key='dateOfBirth' />*/}
      <Column title={t('common.field.department')} dataIndex={'departmentName'} key={'departmentName'} />
      <Column
        title={t('common.field.gender')}
        key={'gender'}
        dataIndex='gender'
      />
      <Column title={t('common.field.contact')}
              render={(user: UserDto) => <Space direction={'vertical'}>
                <strong>{user.phoneNumber}</strong>
                <span>{user.email}</span>
              </Space>}
      />
      <Column title={t('common.field.province')}
              render={(user: UserDto) => user.provinceName ? <Space direction={'vertical'}>
                <strong>{user.provinceName}</strong>
                <span>{user.districtName} - {user.communeName}</span>
              </Space> : null}
      />
      <Column title={t('common.field.address')} dataIndex='address' key='address' />
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
              render={(value: UserDto) => moment(value.createdOn).format('L')} />
    </Table>
  )
}

export default UserTable
