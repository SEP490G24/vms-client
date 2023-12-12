import { OrganizationWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { InfoModalData, OrganizationDto, TableAction, TableData } from '~/interface'
import { formatSortParam, resetCurrentPageAction } from '~/utils'
import { OrganizationInfo } from './Info'
import { OrganizationFilter } from './Filter'
import { OrganizationTable } from './Table'
import { departmentService, OrganizationFilterPayload, organizationService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'

const Organization = () => {
  const { t } = useTranslation()
  
  const [tableData, setTableData] = useState<TableData<OrganizationDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<OrganizationDto>>({
    openModal: false,
    confirmLoading: false,
    entitySelected: undefined
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<OrganizationFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    fetchOrganizations()
  }, [filterPayload, tableAction])

  const fetchOrganizations = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as OrganizationFilterPayload
    organizationService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: OrganizationFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    let request = !!infoModalData.entitySelected ? organizationService.update(infoModalData.entitySelected.id, payload) : organizationService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setInfoModalData({ confirmLoading: false, openModal: false, entitySelected: undefined })
          setTableAction(resetCurrentPageAction(tableAction))
          await message.success(t('common.message.success.save'))
        }
      })
      .catch(async (error) => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(error.data.message)
      })
  }

  const openEdit = (organizationDto: OrganizationDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: organizationDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const onDelete = (organizationId: string) => {
    departmentService.remove(organizationId).then( (response) => {
      if(response.status === 200){
        message.success(t('common.message.success.delete'))
        fetchOrganizations()
      }
    }).catch( async () => {
      await  message.error(t('common.message.error.delete'))
    })
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }


  return (
    <OrganizationWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.organization.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <Row className={'w-full m-0'} gutter={24} wrap={false}>
          <Col flex={'none'} span={12}>
            <OrganizationFilter onFilter={onFilter} />
          </Col>
          <Col flex={'auto'}>
            <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <strong> {t('organization.organization.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>
              <Space>
                <SharedButton
                  // permissions={PERMISSION_ROLE_MAP.R_SITE_CREATE}
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
              <OrganizationTable
                loading={tableData.loading}
                pageableResponse={tableData.pageableResponse}
                currentPage={tableAction.pagination?.current}
                onChangeTable={handleChangeTable}
                onEdit={openEdit} onDelete={onDelete} />
            </Card>
          </Col>
          <OrganizationInfo open={infoModalData.openModal} confirmLoading={infoModalData.confirmLoading} width={650}
                         organization={infoModalData.entitySelected} onClose={onClose} onSave={onSave} />
        </Row>
      </Space>
    </OrganizationWrapper>
  )
}

export default Organization
