import React from 'react'
import { ParticipantsWrapper } from './styles.ts'
import { Form, FormInstance } from 'antd'
import { SharedInput } from '~/common'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'

interface ParticipantsArgs {
  form: FormInstance
  onFinish: (values: any) => void
}

const Participants: React.FC<ParticipantsArgs> = (props) => {
  const { t } = useTranslation()


  return (
    <ParticipantsWrapper>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={props.form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={props.onFinish}
        labelAlign='left'
      >
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.site_name')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description'>
          <TextArea
            showCount
            maxLength={200}
            className={'h-[200px] resize-none'}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
      </Form>
    </ParticipantsWrapper>
  )
}

export default Participants
