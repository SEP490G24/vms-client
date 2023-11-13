import { HistoryWrapper } from './styles.ts'

import { Card, Col, Divider, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { InfoModalData, HistoryDto, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { HistoryInfo } from './Info'
import { HistoryFilter } from './Filter'
import { HistoryTable } from './Table'
import { HistoryFilterPayload, historyService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'

const History = () => {
  const { t } = useTranslation()


  const [tableData, setTableData] = useState<TableData<HistoryDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<HistoryDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<HistoryFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    fetchHistorys()
  }, [filterPayload, tableAction])

  const fetchHistorys = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as HistoryFilterPayload
    historyService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: HistoryFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }


  const openEdit = (historyDto: HistoryDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: historyDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }


  return (
    <HistoryWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.history.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_USER_FIND) && (
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <HistoryFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.history.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setInfoModalData({
                      ...infoModalData,
                      entitySelected: undefined,
                      openModal: true
                    })}
                  >
                    {t('common.label.create')}
                  </SharedButton>
                </Space>
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <HistoryTable
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
              <HistoryInfo history={infoModalData.entitySelected} onClose={onClose} />
            </Modal>
          </Row>
        )}
      </Space>
    </HistoryWrapper>
  )
}

export default History
