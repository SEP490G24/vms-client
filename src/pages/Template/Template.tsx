import { PageWrapper } from '~/themes'
import { Divider, List, message, Space } from 'antd'
import { checkPermission } from '~/utils'
import { BUTTON_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { TemplateItem } from '~/pages/Template/TemplateItem'
import { templateService } from '~/service'
import { PageableResponse, TemplateDto } from '~/interface'
import { useEffect, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import { TemplateInfo } from '~/pages/Template/Info'
import { SharedButton } from '~/common'

const Template = () => {
  const { t } = useTranslation()
  const [_, setPageableResponse] = useState<PageableResponse<TemplateDto>>()
  const [currentPage] = useState<number>(1)
  const [template, setTemplate] = useState<TemplateDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  useEffect(() => {
    templateService.filter({}, true, { page: currentPage - 1, size: 10 }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [currentPage, currentPage])

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
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
        }
      })
      .catch(async () => {
        await message.error(t('common.message.error'))
      })
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
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Space className={'mb-4'} direction={'vertical'} size={24} align={'center'}>
            <List grid={{ column: 4, gutter: 12 }}
                  dataSource={[1, 2, 3, 4, 5, 6, 7, 8]}
                  renderItem={() => (<List.Item>
                    <TemplateItem onEdit={openEdit}></TemplateItem>
                  </List.Item>)}
            >
            </List>
            <SharedButton>Show more</SharedButton>
          </Space>
        )}
      </Space>
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
    </PageWrapper>
  )
}

export default Template
