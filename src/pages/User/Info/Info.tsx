import { Card, Form, Space } from 'antd'
import React from 'react'
import { UserDto, UserPayload } from '~/interface'
import { SharedButton } from '~/common'
import { InfoWrapper } from './styles.ts'
import { ModalGlobalStyle } from '~/themes'
import { useTranslation } from 'react-i18next'
import { UserForm } from './FormData'

interface CreateUserFormArgs {
  user?: UserDto
  onSave: (user: UserPayload) => void
  onClose: () => void
}

const Info: React.FC<CreateUserFormArgs> = (args) => {
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
        title={t(!!args.user ? 'organization.user.popup.title-edit' : 'organization.user.popup.title-add')}
        extra={
          <Space>
            <SharedButton onClick={onClose}>{t('common.label.close')}</SharedButton>
            <SharedButton
              // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
              type='primary' onClick={form.submit}>
              {t(`organization.user.popup.${!!args.user ? 'btn-edit' : 'btn-save'}`)}
            </SharedButton>
          </Space>
        }
        style={{ padding: '10px' }}
      >
        <UserForm user={args.user} form={form} onFinish={onFinish} />
      </Card>
    </InfoWrapper>
  )
}

export default Info
