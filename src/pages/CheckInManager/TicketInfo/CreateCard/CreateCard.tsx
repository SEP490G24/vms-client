import { Form } from 'antd'
import React, { useEffect } from 'react'
import { SharedInput} from '~/common'
import { CreateCardWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateCardDto } from '~/service'

interface CreateCardFormArgs {
  checkInCode?: string
  onSave: (card: CreateCardDto) => void
  onClose: () => void

}

const CreateCard: React.FC<CreateCardFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()


  useEffect(() => {
      form.setFieldsValue({
          checkInCode: props.checkInCode,
      })
  }, [props.checkInCode])

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <CreateCardWrapper title={t('common.field.create_card')}
                 onOk={form.submit}
                 onCancel={onClose}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={props.onSave}
        labelAlign='left'
      >
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.checkInCode')} name='checkInCode'
                   rules={[{ required: true }]}>
          <SharedInput disabled= {true} placeholder={t('common.placeholder.site_name')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.cardId')} name='cardId'
                   rules={[{ required: true }]}>
          <SharedInput  placeholder={t('common.placeholder.cardId')} />
        </Form.Item>
      </Form>
    </CreateCardWrapper>
  )
}

export default CreateCard
