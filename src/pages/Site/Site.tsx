import { SiteWrapper } from './styles.ts'

import { Col, Divider, message, Row, Space, Spin, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExcelTitle, ExportProps, SharedButton, ShareExportExcel } from '~/common'
import { PageableResponse, SiteDto, SiteFilterPayload } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { checkPermission } from '~/utils'
import { SiteInfo } from './Info'
import { SiteFilter } from './Filter'
import { siteService } from '~/service'

const Site = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<SiteDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [site, setSite] = useState<SiteDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<SiteFilterPayload>({})
  const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    siteService.filter(filterPayload).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setFilterPayload({ ...filterPayload, pageNumber: page - 1 })
  }

  const onFilter = (filterPayload: SiteFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request
    if (!!site) {
      request = siteService.update(payload.sitename, payload)
    } else {
      request = siteService.insert(payload)
    }
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setSite(undefined)
          siteService.filter(filterPayload).then((response) => {
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

  const exportData = async () => {
    setExportEx(true)
    // const dataExport = await siteService.filter({}).then((res) => {
    //   return res?.data
    // })
    const titles: ExcelTitle[] = [
      {
        name: t('common.field.sitename'),
        width: 20,
        field: 'id',
        textAlign: 'center',
      },
      {
        name: t('common.field.first_name'),
        width: 15,
        field: 'firstName',
        textAlign: 'center',
      },
      {
        name: t('common.field.last_name'),
        width: 15,
        field: 'lastName',
        textAlign: 'center',
      },
      {
        name: t('common.field.phoneNumber'),
        width: 15,
        field: 'phoneNumber',
        textAlign: 'center'
      },

      {
        name: t('common.field.email'),
        field: 'email',
        width: 30,
        textAlign: 'center'
      },
      {
        name: t('common.field.used'),
        width: 15,
        field: 'enable',
        textAlign: 'center'
      },
      {
        name: t('common.field.created_by'),
        width: 15,
        field: 'createdBy',
        textAlign: 'center'
      },
      {
        name: t('common.field.registration_date'),
        width: 30,
        field: 'createdOn',
        textAlign: 'center'
      },
      {
        name: t('common.field.modification_date'),
        width: 30,
        field: 'lastUpdatedOn',
        textAlign: 'center'
      }
    ]
    const exportProps: ExportProps = {
      fileName: t('organization.site.export.file_name', {time: Date.now()}),
      titles: titles,
      data: pageableResponse?.content ?? []
    }
    await ShareExportExcel(exportProps)
    setExportEx(false)
  }


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
                <span> {t('organization.site.table.title', { count: pageableResponse?.totalElements ?? 0 })}</span>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.site.table.btn-add')}
                  </SharedButton>
                  <Spin spinning={exportEx}>
                    <SharedButton onClick={exportData} type={'primary'}>
                      {t('common.label.export_data')}
                    </SharedButton>
                  </Spin>
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <Table
                dataSource={pageableResponse?.content}
                rowKey='sitename'
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
                  title={t('common.field.site')}
                  render={(value) => <a onClick={() => openEdit(value)}>{value.firstName + ' ' + value.lastName}</a>}
                />
                <Column title={t('common.field.phoneNumber')} dataIndex='phoneNumber' key='phoneNumber' />
                <Column title={t('common.field.email')} dataIndex='email' key='email' />
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
