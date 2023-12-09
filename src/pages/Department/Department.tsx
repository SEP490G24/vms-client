import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { DepartmentDto, InfoModalData, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { formatSortParam, resetCurrentPageAction } from '~/utils'
import { DepartmentInfoModal } from './Info'
import { DepartmentFilter } from './Filter'
import { DepartmentTable } from './Table'
import { DepartmentFilterPayload, departmentService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { AuthSection } from '~/auth'
import { PageWrapper } from '~/themes'

const Department = () => {

  const { t } = useTranslation()
  const [tableData, setTableData] = useState<TableData<DepartmentDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<DepartmentDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<DepartmentFilterPayload>({})

  useEffect(() => {
    fetchDepartments()
  }, [filterPayload, tableAction])

  const fetchDepartments = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as DepartmentFilterPayload
    departmentService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: DepartmentFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setInfoModalData({ ...infoModalData, confirmLoading: true })
    const request = !!infoModalData.entitySelected ? departmentService.update(infoModalData.entitySelected.id, payload) : departmentService.insert(payload)
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

  const onDelete = (departmentId: string) => {
    departmentService.remove(departmentId).then( (response) => {
      if(response.status === 200){
        message.success(t('common.message.success.delete'))
        fetchDepartments()
      }
    }).catch( async () => {
      await  message.error(t('common.message.error.delete'))
    })
  }

  const openEdit = (departmentDto: DepartmentDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: departmentDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }

  return (
    <PageWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.department.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_DEPARTMENT_FILTER}>
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <DepartmentFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card
                title={
                  <strong> {t('organization.department.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>}
                extra={<Space>
                  <SharedButton
                    permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setInfoModalData({
                      ...infoModalData,
                      entitySelected: undefined,
                      openModal: true
                    })}
                  >
                    {t('common.label.create')}
                  </SharedButton>
                </Space>}
              >
                <DepartmentTable
                  loading={tableData.loading}
                  pageableResponse={tableData.pageableResponse}
                  currentPage={tableAction.pagination?.current}
                  onChangeTable={handleChangeTable}
                  onEdit={openEdit}
                  onDelete={onDelete}
                />
              </Card>
            </Col>
            <DepartmentInfoModal open={infoModalData.openModal} confirmLoading={infoModalData.confirmLoading}
                                 width={750}
                                 onClose={onClose} department={infoModalData.entitySelected} onSave={onSave} />
          </Row>
        </AuthSection>
      </Space>
    </PageWrapper>
  )
}

export default Department
