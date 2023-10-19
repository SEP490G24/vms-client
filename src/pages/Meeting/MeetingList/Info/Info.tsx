import { Card, Form, Space } from 'antd'
import React from 'react'
import { MeetingDto } from '~/interface'
import { SharedButton } from '~/common'
import { InfoWrapper } from './styles.ts'
import { ModalGlobalStyle } from '~/themes'
import { useTranslation } from 'react-i18next'
import { CreateMeetingInfo } from '~/service'
import { MeetingForm } from './FormData'

interface MeetingInfoArgs {
  meeting?: MeetingDto
  onSave: (meeting: CreateMeetingInfo) => void
  onClose: () => void
}

const Info: React.FC<MeetingInfoArgs> = (args) => {
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
        title={t(!!args.meeting ? 'organization.meeting.popup.title-edit' : 'organization.meeting.popup.title-add')}
        extra={
          <Space>
            <SharedButton onClick={onClose}>{t('common.label.close')}</SharedButton>
            <SharedButton
              // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
              type='primary' onClick={form.submit}>
              {t(`organization.meeting.popup.${!!args.meeting ? 'btn-edit' : 'btn-save'}`)}
            </SharedButton>
          </Space>
        }
        style={{ padding: '10px' }}
      >
        <MeetingForm meeting={args.meeting} form={form} onFinish={onFinish} />
      </Card>
    </InfoWrapper>
  )
}

export default Info
