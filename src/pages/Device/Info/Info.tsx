import { Card, Form, Space } from 'antd'
import React from 'react'
import { DeviceDto } from '~/interface'
import { SharedButton } from '~/common'
import { InfoWrapper } from './styles.ts'
import { ModalGlobalStyle } from '~/themes'
import { useTranslation } from 'react-i18next'
import { DeviceForm } from './FormData'
import { CreateDeviceInfo } from '~/service'

interface CreateDeviceFormArgs {
  department?: DeviceDto
  onSave: (department: CreateDeviceInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateDeviceFormArgs> = (args) => {
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
        title={t(!!args.department ? 'organization.department.popup.title-edit' : 'organization.department.popup.title-add')}
        extra={
          <Space>
            <SharedButton onClick={onClose}>{t('common.label.close')}</SharedButton>
            <SharedButton
              // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
              type='primary' onClick={form.submit}>
              {t(`organization.department.popup.${!!args.department ? 'btn-edit' : 'btn-save'}`)}
            </SharedButton>
          </Space>
        }
        style={{ padding: '10px' }}
      >
        <DeviceForm department={args.department} form={form} onFinish={onFinish} />
      </Card>
    </InfoWrapper>
  )
}

export default Info
