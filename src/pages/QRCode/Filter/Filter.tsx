import { Card, Form, Space } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedInput } from '~/common'


interface FilterArgs {
  onFilter: (checkInCode?: string) => void
}

const Filter: React.FC<FilterArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    props.onFilter(values['checkInCode'].trim())
  }

  const onReset = () => {
    form.resetFields()
    props.onFilter(undefined)
  }

  return (
    <Card
      title={t('customer.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={PERMISSION_ROLE_MAP.R_USER_FIND}
            type={'primary'}
            onClick={form.submit}
          >
            {t('common.label.search')}
          </SharedButton>
        </Space>
      }
      bordered={false}
      className='vms-card filter-card'
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        colon={false}
        labelAlign='left'
        className='vms-form'
        onFinish={onFinish}
      >
        <Form.Item className={'mb-3'} label={t('common.field.checkInCode')} name='checkInCode'>
          <SharedInput
            placeholder={t('common.placeholder.checkInCode')}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default Filter
