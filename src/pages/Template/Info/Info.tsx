import { Card, Form, Space } from 'antd'
import React from 'react'
import { TemplateDto } from '~/interface'
import { SharedButton } from '~/common'
import { InfoWrapper } from './styles.ts'
import { ModalGlobalStyle } from '~/themes'
import { useTranslation } from 'react-i18next'
import { TemplateForm } from './FormData'
import { CreateTemplateInfo } from '~/service'

interface CreateTemplateFormArgs {
  template?: TemplateDto
  onSave: (template: CreateTemplateInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateTemplateFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper>
      <ModalGlobalStyle />
      <Card
        title={t(!!props.template ? 'organization.template.popup.title-edit' : 'organization.template.popup.title-add')}
        extra={
          <Space>
            <SharedButton onClick={onClose}>{t('common.label.close')}</SharedButton>
            <SharedButton
              // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
              type='primary' onClick={form.submit}>
              {t(`organization.template.popup.${!!props.template ? 'btn-edit' : 'btn-save'}`)}
            </SharedButton>
          </Space>
        }
        style={{ padding: '10px' }}
      >
        <TemplateForm template={props.template} form={form} onFinish={props.onSave} />
      </Card>
    </InfoWrapper>
  )
}

export default Info
