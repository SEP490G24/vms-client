import { CustomerWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { CustomerDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'
import { CustomerInfo } from './Info'
import { CustomerFilter } from './Filter'
import { CustomerTable } from './Table'
import { CustomerFilterPayload, customerService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { useAppDispatch } from '~/redux'
import { useSelector } from 'react-redux'
import { customersSelector, filterCustomers, setCustomerSelected } from '~/redux/slices/customerSlice.ts'

const Customer = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const { pageableResponse, customerSelected } = useSelector(customersSelector)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<CustomerFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    dispatch(filterCustomers({
      filterPayload,
      isPageable: true,
      pageableRequest: { page: currentPage - 1, size: 10 }
    }) as any)
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: CustomerFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!customerSelected ? customerService.update(customerSelected.id, payload) : customerService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          dispatch(setCustomerSelected({}))
          dispatch(filterCustomers({
            filterPayload,
            isPageable: true,
            pageableRequest: { page: currentPage - 1, size: 10 }
          }) as any)
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
        }
      })
      .catch(async () => {
        await message.error(t('common.message.error'))
      })
  }

  const openEdit = (customerDto: CustomerDto) => {
    dispatch(setCustomerSelected(customerDto))
    setOpenModal(true)
  }

  const onClose = () => {
    dispatch(setCustomerSelected({}))
    setOpenModal(false)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setCurrentPage(pagination.current ?? 1)
    console.log(pagination, filters, sorter)
  }


  return (
    <CustomerWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('customer.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <CustomerFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('customer.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('common.label.create')}
                  </SharedButton>
                  {/*<Spin spinning={false}>*/}
                  {/*  <SharedButton onClick={exportData} type={'primary'}>*/}
                  {/*    {t('common.label.export_data')}*/}
                  {/*  </SharedButton>*/}
                  {/*</Spin>*/}
                </Space>
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <CustomerTable onChangeTable={handleChangeTable} pageableResponse={pageableResponse}
                               currentPage={currentPage}
                               onEdit={openEdit} />
              </Card>
            </Col>
            {openModal && (
              <Modal
                open={openModal}
                closable={false}
                title={null}
                footer={null}
                confirmLoading={confirmLoading}
                width={650}
                onCancel={onClose}
              >
                <CustomerInfo onClose={onClose} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </CustomerWrapper>
  )
}

export default Customer
