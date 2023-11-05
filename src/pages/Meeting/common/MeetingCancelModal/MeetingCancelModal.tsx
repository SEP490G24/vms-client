import React from 'react'
import { Form, Modal, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { MeetingDto } from '~/interface'
import { SharedInput, SharedModal, SharedSelect } from '~/common'
import { useTranslation } from 'react-i18next'

interface MeetingCancelModalProps {
  openModal: boolean
  meeting: MeetingDto,
  onClose: () => void,
  onOk: (values: any) => void
}

export const MeetingCancelModals: React.FC<MeetingCancelModalProps> = React.memo((props) => {

  const { t } = useTranslation()
  const [cancelForm] = Form.useForm()
  const reason = Form.useWatch('reason', cancelForm)

  return (
    <Modal title={null} open={props.openModal} closable={false}
           footer={null}
           width={550}
           onCancel={props.onClose}>
      <SharedModal
        title={<Space><ExclamationCircleOutlined className={'text-[#faad14] text-xl'} /> Cancel Meeting</Space>}
        onOk={cancelForm.submit}
        onCancel={props.onClose}>
        <Form layout={'vertical'} size={'large'}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              form={cancelForm}
              initialValues={{ layout: 'horizontal' }}
              style={{ width: '100%' }}
              colon={false}
              onFinish={props.onOk}
              labelAlign='left'>
          <Form.Item label={t('common.field.reason')} name={'reason'} rules={[{ required: true }]}>
            <SharedSelect className={'w-full'}
                          options={[
                            { label: 'Reason 1', value: 'R01' },
                            { label: 'Reason 1', value: 'R02' },
                            { label: 'OTHER', value: 'OTHER' }]}
                          placeholder={t('common.placeholder.reason')}
            />
          </Form.Item>
          {reason === 'OTHER' &&
            <Form.Item label={t('common.field.reasonOther')} name={'reasonOther'}
                       rules={[{ required: true }]}>
              <SharedInput placeholder={t('common.placeholder.reasonOther')} />
            </Form.Item>}
        </Form>
      </SharedModal>
    </Modal>
  )
})
