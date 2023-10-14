import { Card, Form, Space } from 'antd'
import React from 'react'
import { UserDto } from '~/interface'
import { SharedButton } from '~/common'
import { InfoWrapper } from './styles.ts'
import { ModalGlobalStyle } from '~/themes'
import { useTranslation } from 'react-i18next'
import { UserForm } from './FormData'
import { CreateUserInfo } from '~/service'

interface CreateUserFormArgs {
  user?: UserDto
  onSave: (user: CreateUserInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateUserFormArgs> = (props) => {
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
        title={t(!!props.user ? 'organization.user.popup.title-edit' : 'organization.user.popup.title-add')}
        extra={
          <Space>
            <SharedButton onClick={onClose}>{t('common.label.close')}</SharedButton>
            <SharedButton
              // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
              type='primary' onClick={form.submit}>
              {t(`organization.user.popup.${!!props.user ? 'btn-edit' : 'btn-save'}`)}
            </SharedButton>
          </Space>
        }
        style={{ padding: '10px' }}
      >
        <UserForm user={props.user} form={form} onFinish={props.onSave} />
      </Card>
    </InfoWrapper>
  )
}

export default Info
