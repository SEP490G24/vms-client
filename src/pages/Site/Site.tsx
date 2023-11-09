import { SiteWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { SiteDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission, isNullish } from '~/utils'
import { SiteInfo } from './Info'
import { SiteFilter } from './Filter'
import { SiteTable } from './Table'
import { SiteFilterPayload, siteService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { useAppDispatch } from '~/redux'
import { useSelector } from 'react-redux'
import { filterSites, setSiteSelected, sitesSelector } from '~/redux/slices/siteSlice.ts'

const Site = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const { pageableResponse, siteSelected } = useSelector(sitesSelector)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<SiteFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    dispatch(filterSites({
      filterPayload,
      isPageable: true,
      pageableRequest: { page: currentPage - 1, size: 10 }
    }) as any)
    // siteService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
    //   setPageableResponse(response?.data)
    // })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: SiteFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !isNullish(siteSelected) ? siteService.update(siteSelected.id, payload) : siteService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          dispatch(setSiteSelected({}))
          dispatch(filterSites({
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

  const openEdit = (siteDto: SiteDto) => {
    dispatch(setSiteSelected(siteDto))
    setOpenModal(true)
  }

  const onClose = () => {
    dispatch(setSiteSelected({}))
    setOpenModal(false)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setCurrentPage(pagination.current ?? 1)
    console.log(pagination, filters, sorter)
  }


  return (
    <SiteWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.site.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <SiteFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.site.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('common.label.create')}
                  </SharedButton>
                </Space>
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <SiteTable onChangeTable={handleChangeTable} pageableResponse={pageableResponse}
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
                <SiteInfo onClose={onClose} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </SiteWrapper>
  )
}

export default Site
