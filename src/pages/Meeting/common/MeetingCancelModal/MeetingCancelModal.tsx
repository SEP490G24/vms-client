import React, { useEffect, useState } from 'react'
import { Form, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { SharedInput, SharedModal, SharedSelect } from '~/common'
import { useTranslation } from 'react-i18next'
import { Reason } from '~/constants'
import { ReasonDto } from '~/interface'
import { reasonService } from '~/service'

interface MeetingCancelModalProps {
  open: boolean
  onClose: () => void,
  onOk: (values: any) => void
  reasonType: Reason
}

export const MeetingCancelModals: React.FC<MeetingCancelModalProps> = React.memo((props) => {

  const { t, i18n } = useTranslation()
  const [cancelForm] = Form.useForm()
  const [reasons, setReasons] = useState<ReasonDto[]>([])

  useEffect(() => {
    reasonService.findAllByType(props.reasonType).then((response) => setReasons(response.data))
  }, [props.reasonType, i18n.language])

  useEffect(() => {
    if (props.open) {
      cancelForm.resetFields()
    }
  }, [props.open])

  return (
    <SharedModal
      open={props.open}
      closable={false}
      width={550}
      footer={null}
      title={<Space><ExclamationCircleOutlined
        className={'text-[#faad14] text-xl'} /> {props.reasonType === Reason.CANCEL ? t('ticket-result.cancel-meeting') : t('ticket-result.reject-customer')}
      </Space>}
      onOk={cancelForm.submit}
      onCancel={props.onClose}>
      <Form layout={'horizontal'}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={cancelForm}
            initialValues={{ layout: 'horizontal' }}
            style={{ width: '100%' }}
            colon={false}
            onFinish={props.onOk}
            labelAlign='left'>
        <Form.Item className={'mb-3'} label={t('common.field.reason')} name={'reasonId'} rules={[{ required: true }]}>
          <SharedSelect className={'w-full'}
                        options={reasons?.map((reason) => {
                          return { label: reason.name, value: reason.id }
                        }) ?? []}
                        placeholder={t('common.placeholder.reason')}
          />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.reasonNote')} name={'reasonNote'}>
          <SharedInput placeholder={t('common.placeholder.reasonNote')} />
        </Form.Item>
      </Form>
    </SharedModal>
  )
})
