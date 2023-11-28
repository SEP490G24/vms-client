import { RoleWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { InfoModalData, RoleDto, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { formatSortParam, resetCurrentPageAction } from '~/utils'
import { RoleInfo } from './Info'
import { RoleFilter } from './Filter'
import { RoleTable } from './Table'
import { CreateRolePayload, RoleFilterPayload, roleService, UpdateRolePayload } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { AuthSection } from '~/auth'
import { RoleFilterData } from '~/pages/Role/Filter/Filter.tsx'

const Role = () => {
  const { t } = useTranslation()


  const [tableData, setTableData] = useState<TableData<RoleDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<RoleDto>>({
    openModal: false,
    confirmLoading: false,
    entitySelected: undefined
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<RoleFilterPayload>({attributes: {
      name: [],
      siteId: []
    }})

  useEffect(() => {
    fetchRoles()
  }, [filterPayload, tableAction])

  const fetchRoles = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload
    } as RoleFilterPayload
    roleService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: RoleFilterData) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload({
      code: filterPayload.code,
      attributes: {
        name: filterPayload.name ? [filterPayload.name] : [],
        siteId: filterPayload.siteId ? [filterPayload.siteId] : []
      }
    })
  }

  const onSave = (payload: any) => {
    const _payload = {
      code: payload['suffixCode'],
      description: payload['description'],
      attributes: {
        name: [payload['name']],
        site_id: payload['siteId'] ? [payload['siteId']] : []
      }
    } as CreateRolePayload | UpdateRolePayload
    let request = !!infoModalData.entitySelected ? roleService.update(infoModalData.entitySelected.code, _payload) : roleService.create(_payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setInfoModalData({ confirmLoading: false, openModal: false, entitySelected: undefined })
          setTableAction(resetCurrentPageAction(tableAction))
          await message.success(t('common.message.success.save'))
        }
      })
      .catch(async () => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(t('common.message.error.save'))
      })
  }

  const openEdit = (roleDto: RoleDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: roleDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }

  return (
    <RoleWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.role.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_ROLE_FILTER}>
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <RoleFilter className={'w-[395px]'} onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.role.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    permissions={PERMISSION_ROLE_MAP.R_ROLE_CREATE}
                    type='default'
                    onClick={() => {
                      setInfoModalData({
                        ...infoModalData,
                        entitySelected: undefined,
                        openModal: true
                      })
                    }}
                  >
                    {t('common.label.create')}
                  </SharedButton>
                </Space>
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <RoleTable
                  loading={tableData.loading}
                  pageableResponse={tableData.pageableResponse}
                  currentPage={tableAction.pagination?.current}
                  onChangeTable={handleChangeTable}
                  onEdit={openEdit} />
              </Card>
            </Col>
            <Modal
              open={infoModalData.openModal}
              closable={false}
              title={null}
              footer={null}
              confirmLoading={infoModalData.confirmLoading}
              width={650}
              onCancel={onClose}
            >
              <RoleInfo role={infoModalData.entitySelected} onClose={onClose} onSave={onSave} />
            </Modal>
          </Row>
        </AuthSection>
      </Space>
    </RoleWrapper>
  )
}

export default Role
