import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedInput } from '~/common'
import { DateRadioRange } from '~/interface'


interface FilterArgs {
  onFilter: (ticketQRCodePayload?: any) => void
}

const Filter: React.FC<FilterArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const onFinish = (values: any) => {
    props.onFilter(values)
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
        <Form.Item className={'mb-3'} label={t('common.field.customer')} name='customerId'>
          <SharedInput
            placeholder={t('common.placeholder.customer')}
          />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.ticket')} name='ticketId'>
          <SharedInput
            placeholder={t('common.placeholder.ticket')}
          />
        </Form.Item>
        <SharedFilterPeriod valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
