import React, { useEffect } from 'react'
import { InfoWrapper } from './style.ts'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import Password from 'antd/es/input/Password'
import { ChangePasswordPayload } from '~/service'

interface Props {
  open: boolean
  confirmLoading?: boolean
  onSave: (payload: ChangePasswordPayload) => void
  onClose: () => void
}

const ChangePasswordModal: React.FC<Props> = (props) => {

  const { t } = useTranslation()
  const [form] = Form.useForm()

  useEffect(() => {
    if (props.open) {
      form.resetFields()
    }
  }, [props.open])

  const onFinish = (values: any) => {
    props.onSave({
      oldPassword: values['oldPassword'],
      newPassword: values['newPassword']
    })
  }

  return (
    <InfoWrapper
      className={'user-modal'}
      open={props.open}
      confirmLoading={props.confirmLoading}
      closable={false}
      footer={null}
      width={664}
      onCancel={props.onClose}
      onOk={form.submit}
      centered={true}
      title={t('user.security.change_password')}
    >
      <div className={'bg-body p-8 rounded-2xl'}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          colon={false}
          form={form}
          labelAlign='left'
          layout='horizontal'
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item className={'mb-3'} label={t('common.field.current_password')} name={'oldPassword'}
                     rules={[{ required: true }]}>
            <Password size={'large'} placeholder={t('common.placeholder.current_password')} />
          </Form.Item>
          <Form.Item
            className={'mb-3'}
            label={t('common.field.new_password')}
            name={'newPassword'}
            rules={[{ required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('oldPassword') === value) {
                    return Promise.reject(new Error('The new password that you entered matching current password'))
                  }
                  return Promise.resolve()
                }
              })]}
          >
            <Password size={'large'} placeholder={t('common.placeholder.current_password')} />
          </Form.Item>
          <Form.Item
            className={'mb-3'}
            label={t('common.field.confirm_password')}
            name={'cPassword'}
            rules={[{ required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'))
                }
              })]}
          >
            <Password size={'large'} placeholder={t('common.placeholder.current_password')} />
          </Form.Item>
        </Form>
      </div>
    </InfoWrapper>
  )
}

export default ChangePasswordModal
