import { AuditLogWrapper } from './styles.ts'

import { Card, Col, Divider, Row, Space, Spin, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuditLogDto, InfoModalData, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { exportFile, formatSortParam, resetCurrentPageAction } from '~/utils'
import { AuditLogInfo } from './Info'
import { AuditLogFilter } from './Filter'
import { AuditLogTable } from './Table'
import { AuditLogFilterPayload, auditLogService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { AuthSection } from '~/auth'
import { SharedButton } from '~/common'
import { DownloadOutlined } from '@ant-design/icons'

const AuditLog = () => {
  const { t } = useTranslation()


  const [tableData, setTableData] = useState<TableData<AuditLogDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<AuditLogDto>>({
    openModal: false,
    confirmLoading: false,
    entitySelected: undefined
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<AuditLogFilterPayload>({})
  const [exportEx, setExportEx] = useState<boolean>(false)

  useEffect(() => {
    fetchAuditLogs()
  }, [filterPayload, tableAction])

  const fetchAuditLogs = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as AuditLogFilterPayload
    auditLogService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: AuditLogFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }


  const openEdit = (auditLogDto: AuditLogDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: auditLogDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }

  const exportData = async () => {
    setExportEx(true)
    auditLogService.exportAuditLog(filterPayload).then((response) => {
      if (response.data) {
        exportFile(response.data, `${t('organization.audit-log.export.file_name', { time: Date.now() })}.xlsx`)
      }
    }).catch(() => setExportEx(false))

  }


  return (
    <AuditLogWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.audit-log.title')}</h2>

          <Divider type='vertical' />
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP['R_AUDIT-LOG_FILTER']}>
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <AuditLogFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.audit-log.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <Spin spinning={exportEx}>
                    <SharedButton onClick={exportData} icon={<DownloadOutlined />}>
                      {t('common.label.export_data')}
                    </SharedButton>
                  </Spin>
                </Space>
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <AuditLogTable
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
              width={950}
              onCancel={onClose}
            >
              <AuditLogInfo auditLog={infoModalData.entitySelected} onClose={onClose} />
            </Modal>
          </Row>
        </AuthSection>
      </Space>
    </AuditLogWrapper>
  )
}

export default AuditLog
