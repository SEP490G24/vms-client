import { SiteWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { InfoModalData, SiteDto, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { formatSortParam, resetCurrentPageAction } from '~/utils'
import { SiteInfoModal } from './Info'
import { SiteFilter } from './Filter'
import { SiteTable } from './Table'
import { SiteFilterPayload, siteService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { AuthSection } from '~/auth'
import { findAllSitesInOrganization } from '~/redux'
import { useDispatch } from 'react-redux'

const Site = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [tableData, setTableData] = useState<TableData<SiteDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<SiteDto>>({
    openModal: false,
    confirmLoading: false,
    entitySelected: undefined,
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<SiteFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    fetchSites()
  }, [filterPayload, tableAction])

  const fetchSites = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0],
    } as SiteFilterPayload
    siteService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order),
    }).then((response) => {
      dispatch(findAllSitesInOrganization() as any)
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: SiteFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onDelete = (siteId: string) => {
    siteService.remove(siteId).then((response) => {
      if (response.status === 200) {
        message.success(t('common.message.success.delete'))
        fetchSites()
      }
    }).catch(async () => {
      await message.error(t('common.message.error.delete'))
    })
  }

  const onSave = (payload: any) => {
    let request = !!infoModalData.entitySelected ? siteService.update(infoModalData.entitySelected.id, payload) : siteService.insert(payload)
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

  const openEdit = (siteDto: SiteDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: siteDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }


  return (
    <SiteWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.site.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_SITE_FILTER}>
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <SiteFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.site.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    permissions={PERMISSION_ROLE_MAP.R_SITE_CREATE}
                    type='default'
                    onClick={() => {
                      setInfoModalData({
                        ...infoModalData,
                        entitySelected: undefined,
                        openModal: true,
                      })
                    }}
                  >
                    {t('common.label.create')}
                  </SharedButton>
                </Space>
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <SiteTable
                  loading={tableData.loading}
                  pageableResponse={tableData.pageableResponse}
                  currentPage={tableAction.pagination?.current}
                  onChangeTable={handleChangeTable}
                  onEdit={openEdit}
                  onDelete={onDelete}
                />
              </Card>
            </Col>
            <SiteInfoModal open={infoModalData.openModal} confirmLoading={infoModalData.confirmLoading} width={750}
                           site={infoModalData.entitySelected} onClose={onClose} onSave={onSave} />
          </Row>
        </AuthSection>
      </Space>
    </SiteWrapper>
  )
}

export default Site
