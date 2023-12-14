import { PageWrapper } from '~/themes'
import { Col, Flex, message, Row, Space, Spin } from 'antd'
import { PERMISSION_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { TemplateItem } from './TemplateItem'
import { TemplateFilterPayload, templateService } from '~/service'
import { InfoModalData, TemplateDto } from '~/interface'
import { useEffect, useState } from 'react'
import { SharedButton } from '~/common'
import { TemplateFilter } from './Filter'
import { AuthSection } from '~/auth'
import { TemplateInfoModal } from '~/pages/Template/Info'

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
  const [showMore, setShowMore] = useState(true)

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
        setShowMore(currentPage < response.data.totalElements)
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
      .then(async () => {
          setInfoModalData({ openModal: false, confirmLoading: false, entitySelected: undefined })
          fetchTemplates(filterPayload, 1)
          await message.success(t('common.message.success.save'))
      })
      .catch(async (error) => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(error.data.message)
      })
  }

  const openEdit = (templateDto: TemplateDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: templateDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const onDelete = (id: string) => {
    templateService.remove(id).then(() => {
      message.success(t('common.message.success.delete'))
      fetchTemplates({}, currentPage)
    }).catch(() => {
      message.error(t('common.message.error.delete'))
    })
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
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_TEMPLATE_FILTER}>
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <TemplateFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Spin spinning={templatesState.loading}>
                <Flex className={'w-full mb-4'} gap={'middle'} vertical={true} align={'center'}>
                  <div className={'grid w-full sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2'}>
                    {
                      templatesState.templates?.map((template, index) => (
                        <TemplateItem key={index} templateDto={template} onEdit={openEdit} onDelete={onDelete}></TemplateItem>
                      ))
                    }
                  </div>
                  {showMore && <SharedButton onClick={onShowMore}>Show more</SharedButton>}
                </Flex>
              </Spin>
            </Col>
          </Row>
        </AuthSection>
      </Space>
      <TemplateInfoModal open={infoModalData.openModal} confirmLoading={infoModalData.confirmLoading} width={750}
                         onClose={onClose} template={infoModalData.entitySelected} onSave={onSave} />
    </PageWrapper>
  )
}

export default Template
