import React, { useState } from 'react'
import { Dropdown, Form, MenuProps, Modal, Space } from 'antd'
import { EllipsisOutlined, ExclamationCircleOutlined, MoreOutlined } from '@ant-design/icons'
import { MeetingDto } from '~/interface'
import { SharedInput, SharedModal, SharedSelect } from '~/common'
import { useTranslation } from 'react-i18next'

interface MeetingActionProps {
  meeting: MeetingDto
  directionIcon?: 'horizontal' | 'vertical';
}

export const MeetingActions: React.FC<MeetingActionProps> = React.memo((props) => {

  const { t } = useTranslation()
  // const [reason, setReason] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [cancelForm] = Form.useForm()
  const reason = Form.useWatch('reason', cancelForm)


  const meetingActions: MenuProps['items'] = [
    {
      label: 'Cancel meeting',
      key: '1',
      danger: true,
      onClick: () => setOpenModal(true)
    }
  ]

  const onCancelMeeting = (value: any) => {
    console.log(value)
  }

  const onClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Dropdown menu={{ items: meetingActions }} placement='bottom'>
        {props.directionIcon === 'vertical' ? <MoreOutlined key='ellipsis' /> : <EllipsisOutlined key='ellipsis' />}
      </Dropdown>
      <Modal title={null} open={openModal} closable={false}
             footer={null}
             width={550}
             onCancel={onClose}>
        <SharedModal title={<Space><ExclamationCircleOutlined className={'text-[#faad14] text-xl'} /> Cancel Meeting</Space>}
                     onOk={cancelForm.submit}
                     onCancel={onClose}>
          <Form layout={'vertical'} size={'large'}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                form={cancelForm}
                initialValues={{ layout: 'horizontal' }}
                style={{ width: '100%' }}
                colon={false}
                onFinish={onCancelMeeting}
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
    </>
  )
})
