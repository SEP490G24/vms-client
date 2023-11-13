import React, { useEffect, useState } from 'react'
import { Form, Modal, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ReasonDto } from '~/interface'
import { SharedInput, SharedModal, SharedSelect } from '~/common'
import { useTranslation } from 'react-i18next'
import { reasonService } from '~/service'

interface MeetingCancelModalProps {
  openModal: boolean
  siteId: string,
  onClose: () => void,
  onOk: (values: any) => void
}

export const MeetingCancelModals: React.FC<MeetingCancelModalProps> = React.memo((props) => {

  const { t } = useTranslation()
  const [cancelForm] = Form.useForm()
  const [reasons, setReasons] = useState<ReasonDto[]>()
  useEffect(() => {
    cancelForm.resetFields()
    !!props.siteId && reasonService.findBySiteId(props.siteId).then((response) => setReasons(response.data))
  }, [props.siteId])

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
          <Form.Item label={t('common.field.reasonId')} name={'reasonId'} rules={[{ required: true }]}>
            <SharedSelect className={'w-full'}
                          options={reasons?.map((reason) => {
                            return { label: reason.name, value: reason.id }
                          }) ?? []}
                          placeholder={t('common.placeholder.reason')}
            />
          </Form.Item>
          <Form.Item label={t('common.field.reasonNote')} name={'reasonNote'}>
            <SharedInput placeholder={t('common.placeholder.reasonNote')} />
          </Form.Item>
        </Form>
      </SharedModal>
    </Modal>
  )
})
