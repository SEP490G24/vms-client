import { Card, Form, Space } from 'antd'
import React from 'react'
import { RoomDto } from '~/interface'
import { SharedButton } from '~/common'
import { InfoWrapper } from './styles.ts'
import { ModalGlobalStyle } from '~/themes'
import { useTranslation } from 'react-i18next'
import { RoomForm } from './FormData'
import { CreateRoomInfo } from '~/service'

interface CreateRoomFormArgs {
  room?: RoomDto
  onSave: (room: CreateRoomInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateRoomFormArgs> = (args) => {
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
        title={t(!!args.room ? 'organization.room.popup.title-edit' : 'organization.room.popup.title-add')}
        extra={
          <Space>
            <SharedButton onClick={onClose}>{t('common.label.close')}</SharedButton>
            <SharedButton
              // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
              type='primary' onClick={form.submit}>
              {t(`organization.room.popup.${!!args.room ? 'btn-edit' : 'btn-save'}`)}
            </SharedButton>
          </Space>
        }
        style={{ padding: '10px' }}
      >
        <RoomForm room={args.room} form={form} onFinish={onFinish} />
      </Card>
    </InfoWrapper>
  )
}

export default Info
