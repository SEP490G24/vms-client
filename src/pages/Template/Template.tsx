import { PageWrapper } from '~/themes'
import { Col, message, Row, Space, Spin } from 'antd'
import { PERMISSION_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { TemplateItem } from './TemplateItem'
import { TemplateFilterPayload, templateService } from '~/service'
import { InfoModalData, TemplateDto } from '~/interface'
import { useEffect, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import { TemplateInfo } from './Info'
import { SharedButton } from '~/common'
import { TemplateFilter } from './Filter'
import { AuthSection } from '~/auth'

const Template = () => {
  const { t } = useTranslation()
  const [templatesState, setTemplatesState] = useState<{
    templates?: TemplateDto[],
    loading: boolean
  }>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<TemplateDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterPayload, setFilterPayload] = useState<TemplateFilterPayload>({})

  useEffect(() => {
    fetchTemplates({}, 1)
  }, [])

  const fetchTemplates = (_filterPayload: TemplateFilterPayload, _currentPage: number, append?: boolean) => {
    setTemplatesState({
      ...templatesState,
      loading: true
    })
    templateService.filter(_filterPayload, true, { page: _currentPage - 1, size: 10 })
      .then((response) => {
        setTemplatesState({
          loading: false,
          templates: append ? templatesState.templates?.concat(response.data?.content) : response.data?.content
        })
      }).catch(() => {
      setTemplatesState({
        ...templatesState,
        loading: false
      })
    })
  }

  const onFilter = (filterPayload: TemplateFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
    fetchTemplates(filterPayload, 1)
  }

  const onShowMore = () => {
    setCurrentPage(currentPage + 1)
    fetchTemplates(filterPayload, currentPage + 1, true)
  }

  const onSave = (payload: any) => {
    setInfoModalData({ ...infoModalData, confirmLoading: true })
    let request = !!infoModalData.entitySelected ? templateService.update(infoModalData.entitySelected.id, payload) : templateService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setInfoModalData({ openModal: false, confirmLoading: false, entitySelected: undefined })
          fetchTemplates(filterPayload, 1)
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
        }
      })
      .catch(async () => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(t('common.message.error'))
      })
  }

  const openEdit = (templateDto: TemplateDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: templateDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  return (
    <PageWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space className={'w-full justify-between'}>
          <h2>{t('organization.template.title')}</h2>
          <SharedButton
            permissions={PERMISSION_ROLE_MAP.R_TEMPLATE_CREATE}
            type='default'
            onClick={() => setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: true })}
          >
            {t('common.label.create')}
          </SharedButton>
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_TEMPLATE_FIND}>
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <TemplateFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Spin spinning={templatesState.loading}>
                <Space className={'w-full mb-4'} direction={'vertical'} size={24} align={'center'}>
                  <div className={'grid w-full sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2'}>
                    {
                      templatesState.templates?.map((template, index) => (
                        <TemplateItem key={index} templateDto={template} onEdit={openEdit}></TemplateItem>
                      ))
                    }
                  </div>
                  {!!templatesState.templates?.length && <SharedButton onClick={onShowMore}>Show more</SharedButton>}
                </Space>
              </Spin>
            </Col>
          </Row>
        </AuthSection>
      </Space>
      <Modal
        open={infoModalData.openModal}
        closable={false}
        title={null}
        footer={null}
        confirmLoading={infoModalData.confirmLoading}
        width={750}
        onCancel={onClose}
      >
        <TemplateInfo onClose={onClose} template={infoModalData.entitySelected} onSave={onSave} />
      </Modal>
    </PageWrapper>
  )
}

export default Template
