import { Col, Divider, message, Row, Space, Spin, Table, TablePaginationConfig, Tag, Upload } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { PageableResponse, TemplateDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { checkPermission } from '~/utils'
import { TemplateInfo } from './Info'
import { TemplateFilter } from './Filter'
import { TemplateFilterPayload, templateService } from '~/service'
import moment from 'moment'
import { FilterValue } from 'antd/es/table/interface'
import { RcFile } from 'antd/es/upload'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'

const Template = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<TemplateDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [template, setTemplate] = useState<TemplateDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<TemplateFilterPayload>({})


  useEffect(() => {
    templateService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: TemplateFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!template ? templateService.update(template.templatename, payload) : templateService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setTemplate(undefined)
          templateService.filter(filterPayload, true, { page: currentPage, size: 10 }).then((response) => {
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

  const openEdit = (templateDto: TemplateDto) => {
    setTemplate(templateDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setTemplate(undefined)
    setOpenModal(false)
  }
  const handleChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    console.log(pagination, filters, sorter)
  }

  return (
    <PageWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.template.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <TemplateFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.template.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type={'primary'}
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.template.table.btn-add')}
                  </SharedButton>
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <Table
                dataSource={pageableResponse?.content}
                rowKey='templatename'
                pagination={{
                  current: currentPage,
                  total: pageableResponse?.totalElements as number,
                  onChange: setCurrentPage,
                  pageSize: pageableResponse?.pageable?.pageSize as number,
                  showSizeChanger: false,
                  position: ['bottomCenter']
                }}
                onChange={handleChange}
                className='vms-table no-bg'
                scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
                size='middle'
              >
                <Column
                  title={t('common.field.name')}
                  render={(value) => <a onClick={() => openEdit(value)}>{value.name}</a>}
                />
                <Column title={t('common.field.code')} dataIndex='code' key='code' sorter={true} />
                <Column title={t('common.field.type')} dataIndex='type' key='type' />
                <Column
                  title={t('common.field.status')}
                  dataIndex='enable'
                  key='enable'
                  filters={[
                    { text: t('common.label.enable'), value: true },
                    { text: t('common.label.disable'), value: false }
                  ]}
                  filterMultiple={false}
                  render={(enable) =>
                    enable ? <Tag color='#87d068'>{t('common.label.enable')}</Tag> :
                      <Tag color='#f50'>{t('common.label.disable')}</Tag>
                  }
                />
                <Column title={t('common.field.registration_date')} key='createdOn'
                        render={(value: TemplateDto) => moment(value.createdOn).format('L')} />
                <Column title={t('common.field.modification_date')} key='lastUpdatedOn'
                        render={(value: TemplateDto) => moment(value.lastUpdatedOn ?? value.createdOn).format('L')} />
                {/*<Column title={t('common.label.action')} fixed={'right'} key='action' width={70}*/}
                {/*        render={() => <DeleteOutlined className={'text-[#f50]'}/>} />*/}
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
                <TemplateInfo onClose={onClose} template={template} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </PageWrapper>
  )
}

export default Template
