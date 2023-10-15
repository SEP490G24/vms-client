import { SiteWrapper } from './styles.ts'

import { Col, Divider, message, Row, Space, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { PageableResponse, SiteDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'
import { SiteInfo } from './Info'
import { SiteFilter } from './Filter'
import { SiteFilterPayload, siteService } from '~/service'

const Site = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<SiteDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [site, setSite] = useState<SiteDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<SiteFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    siteService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: SiteFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!site ? siteService.update(site.id, payload) : siteService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setSite(undefined)
          siteService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
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

  const openEdit = (siteDto: SiteDto) => {
    setSite(siteDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setSite(undefined)
    setOpenModal(false)
  }

  // const exportData = async () => {
  // }


  return (
    <SiteWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.site.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} style={{ width: 450 }}>
              <SiteFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.site.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.site.table.btn-add')}
                  </SharedButton>
                  {/*<Spin spinning={false}>*/}
                  {/*  <SharedButton onClick={exportData} type={'primary'}>*/}
                  {/*    {t('common.label.export_data')}*/}
                  {/*  </SharedButton>*/}
                  {/*</Spin>*/}
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <Table
                dataSource={pageableResponse?.content}
                rowKey='sitename'
                pagination={{
                  current: currentPage,
                  total: pageableResponse?.totalElements as number,
                  onChange: setCurrentPage,
                  pageSize: pageableResponse?.pageable?.pageSize as number,
                  showSizeChanger: false,
                  position: ['bottomCenter']
                }}
                className='vms-table no-bg'
                scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
                size='middle'
              >
                <Column
                  title={t('common.field.site.name')}
                  render={(value: SiteDto) => <a onClick={() => openEdit(value)}>{value.name}</a>}
                />
                <Column title={t('common.field.phoneNumber')} dataIndex='phoneNumber' key='phoneNumber' />
                <Column title={t('common.field.province')} dataIndex='province' key='province' />
                <Column title={t('common.field.district')} dataIndex='district' key='district' />
                <Column title={t('common.field.ward')} dataIndex='ward' key='ward' />
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
                width={650}
                onCancel={onClose}
              >
                <SiteInfo onClose={onClose} site={site} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </SiteWrapper>
  )
}

export default Site
