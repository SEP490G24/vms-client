import { DepartmentWrapper } from './styles.ts'

import { Col, Divider, message, Row, Space, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { DepartmentDto, DepartmentFilterPayload, PageableResponse } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'
import { DepartmentInfo } from './Info'
import { DepartmentFilter } from './Filter'
import { departmentService } from '~/service'

const Department = () => {

  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<DepartmentDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [department, setDepartment] = useState<DepartmentDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<DepartmentFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    departmentService.filter(filterPayload).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setFilterPayload({ ...filterPayload, pageNumber: page - 1 })
  }

  const onFilter = (filterPayload: DepartmentFilterPayload) => {
    setCurrentPage(1)
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
          setConfirmLoading(false)
          setDepartment(undefined)
          departmentService.filter(filterPayload).then((response) => {
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

  return (
    <DepartmentWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.department.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} style={{ width: 450 }}>
              <DepartmentFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <span> {t('organization.department.table.title', { count: pageableResponse?.totalElements ?? 0 })}</span>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.department.table.btn-add')}
                  </SharedButton>
                  {/*<Spin spinning={exportEx}>*/}
                  {/*  <SharedButton onClick={exportData} type={'primary'}>*/}
                  {/*    {t('common.label.export_data')}*/}
                  {/*  </SharedButton>*/}
                  {/*</Spin>*/}
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <Table
                dataSource={pageableResponse?.content}
                rowKey='id'
                pagination={{
                  current: currentPage,
                  total: pageableResponse?.totalElements as number,
                  onChange: handlePageChange,
                  pageSize: pageableResponse?.pageable?.pageSize as number,
                  showSizeChanger: false,
                  position: ['bottomCenter']
                }}
                className='vms-table no-bg'
                scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
                size='middle'
              >
                <Column
                  title={t('common.field.department')}
                  render={(value: DepartmentDto) => <a onClick={() => openEdit(value)}>{value.name}</a>}
                />
                <Column title={t('common.field.code')} dataIndex='code' key='code' />
                <Column
                  title={t('common.field.used')}
                  dataIndex='enable'
                  key='enable'
                  render={(enable) =>
                    enable ? t('common.label.use') : t('common.label.not_use')
                  }
                />
                <Column title={t('common.field.registration_date')} dataIndex='createdOn' key='createdOn' />
                <Column title={t('common.field.modification_date')} dataIndex='lastUpdatedOn' key='lastUpdatedOn' />
              </Table>
            </Col>
            {openModal && (
              <Modal
                open={openModal}
                closable={false}
                title={null}
                footer={null}
                confirmLoading={confirmLoading}
                width={550}
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
