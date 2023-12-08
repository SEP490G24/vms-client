import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomerDto, InfoModalData, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { CustomerInfo } from './Info'
import { CustomerFilter } from './Filter'
import { CustomerTable } from './Table'
import { CustomerFilterPayload, customerService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { PageWrapper } from '~/themes'

const Customer = () => {
  const { t } = useTranslation()
  const [tableData, setTableData] = useState<TableData<CustomerDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<CustomerDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<CustomerFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)

  useEffect(() => {
    fetchCustomers()
  }, [filterPayload, tableAction])

  const fetchCustomers = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload
    } as CustomerFilterPayload
    customerService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: CustomerFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setInfoModalData({ ...infoModalData, confirmLoading: true })
    let request = !!infoModalData.entitySelected ? customerService.update(infoModalData.entitySelected.id, payload) : customerService.insert(payload)
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

  const openEdit = (customerDto: CustomerDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: customerDto, openModal: true })
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
          <h2>{t('customer.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_CUSTOMER_FILTER) && (
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <CustomerFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('customer.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  {/*<SharedButton*/}
                  {/*  // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}*/}
                  {/*  type='default'*/}
                  {/*  onClick={() => setInfoModalData({*/}
                  {/*    ...infoModalData,*/}
                  {/*    entitySelected: undefined,*/}
                  {/*    openModal: true*/}
                  {/*  })}*/}
                  {/*>*/}
                  {/*  {t('common.label.create')}*/}
                  {/*</SharedButton>*/}
                  {/*<Spin spinning={false}>*/}
                  {/*  <SharedButton onClick={exportData} type={'primary'}>*/}
                  {/*    {t('common.label.export_data')}*/}
                  {/*  </SharedButton>*/}
                  {/*</Spin>*/}
                </Space>
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <CustomerTable
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
              <CustomerInfo customer={infoModalData.entitySelected} onSave={onSave} />
            </Modal>
          </Row>
        )}
      </Space>
    </PageWrapper>
  )
}

export default Customer
