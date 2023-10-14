import { Card, Form, Space } from 'antd'
import React from 'react'
import { SiteDto } from '~/interface'
import { SharedButton } from '~/common'
import { InfoWrapper } from './styles.ts'
import { ModalGlobalStyle } from '~/themes'
import { useTranslation } from 'react-i18next'
import { SiteForm } from './FormData'
import { CreateSiteInfo } from '~/service'

interface CreateSiteFormArgs {
  site?: SiteDto
  onSave: (site: CreateSiteInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateSiteFormArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    args.onSave(values)
  }

  const onClose = () => {
    args.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper>
      <ModalGlobalStyle />
      <Card
        title={t(!!args.site ? 'organization.site.popup.title-edit' : 'organization.site.popup.title-add')}
        extra={
          <Space>
            <SharedButton onClick={onClose}>{t('common.label.close')}</SharedButton>
            <SharedButton
              // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
              type='primary' onClick={form.submit}>
              {t(`organization.site.popup.${!!args.site ? 'btn-edit' : 'btn-save'}`)}
            </SharedButton>
          </Space>
        }
        style={{ padding: '10px' }}
      >
        <SiteForm site={args.site} form={form} onFinish={onFinish} />
      </Card>
    </InfoWrapper>
  )
}

export default Info
