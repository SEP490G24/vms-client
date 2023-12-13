// @ts-ignore
import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedInput } from '~/common'
import { DateRadioRange } from '~/interface'
import { OrganizationFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'

interface FilterArgs {
  onFilter: (filterPayload: OrganizationFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()

  const onFinish = (values: any) => {
    const payload: OrganizationFilterPayload = {
      keyword: values['keyword'],
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.END_DAY)
    }
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(undefined)
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('organization.organization.search.title')}
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
        <Form.Item className={'mb-3'} label={t('organization.organization.search.counselor')} name='keyword'>
          <SharedInput
            placeholder={t('organization.organization.search.counselor_placeholder')}
          />
        </Form.Item>
        <SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
