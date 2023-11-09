import { PageWrapper } from '~/themes'
import { Col, Divider, List, message, Row, Space } from 'antd'
import { checkPermission } from '~/utils'
import { BUTTON_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { TemplateItem } from '~/pages/Template/TemplateItem'
import { TemplateFilterPayload, templateService } from '~/service'
import { TemplateDto } from '~/interface'
import { useEffect, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import { TemplateInfo } from '~/pages/Template/Info'
import { SharedButton } from '~/common'
import { TemplateFilter } from '~/pages/Template/Filter'

const Template = () => {
  const { t } = useTranslation()
  const [templates, setTemplates] = useState<TemplateDto[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [template, setTemplate] = useState<TemplateDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<TemplateFilterPayload>({})
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  useEffect(() => {
    templateService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      console.log(response.data?.content)
      setTemplates([...templates, ...response.data?.content])
      message.success(t('common.message.success.save')).then()
    })
  }, [currentPage])

  useEffect(() => {
    templateService.filter(filterPayload, true, { page: 0, size: 10 }).then((response) => {
      setTemplates(response.data?.content)
    })
  }, [filterPayload])

  const onFilter = (filterPayload: TemplateFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!template ? templateService.update(template.id, payload) : templateService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setTemplate(undefined)
          setFilterPayload({})
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
        }
      })
      .catch(async () => {
        await message.error(t('common.message.error'))
      })
  }

  const onShowMore = () => {
    setCurrentPage(currentPage + 1)
  }

  const openEdit = (templateDto?: TemplateDto) => {
    setTemplate(templateDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setTemplate(undefined)
    setOpenModal(false)
  }


  return (
    <PageWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.template.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <SharedButton
          type='default'
          onClick={() => setOpenModal(true)}
        >
          {t('common.label.create')}
        </SharedButton>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <TemplateFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space className={'w-full mb-4'} direction={'vertical'} size={24} align={'center'}>
                <List grid={{ column: 3, gutter: 12 }}
                      dataSource={templates}
                      renderItem={(template) => (<List.Item>
                        <TemplateItem templateDto={template} onEdit={openEdit}></TemplateItem>
                      </List.Item>)}
                >
                </List>
                {!!templates.length && <SharedButton onClick={onShowMore}>Show more</SharedButton>}
              </Space>
            </Col>
          </Row>
        )}
      </Space>
      {openModal && (
        <Modal
          open={openModal}
          closable={false}
          title={null}
          footer={null}
          confirmLoading={confirmLoading}
          width={750}
          onCancel={onClose}
        >
          <TemplateInfo onClose={onClose} template={template} onSave={onSave} />
        </Modal>
      )}
    </PageWrapper>
  )
}

export default Template
