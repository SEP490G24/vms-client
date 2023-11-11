import { DepartmentWrapper } from './styles.ts'

import { Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { DepartmentDto, PageableResponse, SortDirection, SortDirectionType, TableAction } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission, resetTableAction } from '~/utils'
import { DepartmentInfo } from './Info'
import { DepartmentFilter } from './Filter'
import { DepartmentTable } from './Table'
import { DepartmentFilterPayload, departmentService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'

const Department = () => {

  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<DepartmentDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [department, setDepartment] = useState<DepartmentDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<DepartmentFilterPayload>({})
  const [tableAction, setTableAction] = useState<TableAction>({})

  useEffect(() => {
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as DepartmentFilterPayload
    departmentService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: tableAction.sorter?.order ? `${tableAction.sorter?.columnKey},${SortDirection[tableAction.sorter?.order as SortDirectionType]}` : undefined
    }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload,tableAction])

  const onFilter = (filterPayload: DepartmentFilterPayload) => {
    setTableAction(resetTableAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    const request = !!department ? departmentService.update(department.id, payload) : departmentService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setTableAction(resetTableAction(tableAction))
          setConfirmLoading(false)
          setDepartment(undefined)
          departmentService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
            setPageableResponse(response?.data)
          })
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
        }
      })
      .catch(async () => {
        await message.error(t('common.message.error'))
      })
  }

  const openEdit = (departmentDto: DepartmentDto) => {
    setDepartment(departmentDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setDepartment(undefined)
    setOpenModal(false)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setCurrentPage(pagination.current ?? 1)
    setTableAction({ pagination, filters, sorter })
  }

  return (
    <DepartmentWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.department.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <DepartmentFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.department.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('common.label.create')}
                  </SharedButton>
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <DepartmentTable onChangeTable={handleChangeTable} pageableResponse={pageableResponse}
                               currentPage={currentPage} onEdit={openEdit} />
            </Col>
            {openModal && (
              <Modal
                open={openModal}
                closable={false}
                title={null}
                footer={null}
                confirmLoading={confirmLoading}
                width={750}
                onCancel={onClose}
              >
                <DepartmentInfo onClose={onClose} department={department} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </DepartmentWrapper>
  )
}

export default Department
