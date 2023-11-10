import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange, TemplateType } from '~/interface'
import { TemplateFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'
import { enumToArray } from '~/utils'

interface FilterArgs {
  onFilter: (filterPayload: TemplateFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const [siteFilter, setSiteFilter] = useState('')

  const onFinish = (values: any) => {
    const payload: TemplateFilterPayload = {
      siteId: values['siteId'] ? [values['siteId']] : undefined,
      type: values['type'],
      keyword: values['keyword'],
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.START_DAY)
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
      title={t('organization.template.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            type={'primary'}
            // permissions={BUTTON_ROLE_MAP.R_USER_FIND}
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
        <SharedFilterScope siteId={siteFilter} onChangeSite={setSiteFilter} />
        <Form.Item label={t('common.field.type')} name='type'>
          <SharedSelect
            options={enumToArray(TemplateType).map(item => {
              return { label: item.key, value: item.value }
            })}
            placeholder={t('common.placeholder.type')} />
        </Form.Item>
        <Form.Item label={t('organization.template.search.counselor')} name='keyword'>
          <SharedInput
            placeholder={t('organization.template.search.counselor_placeholder')}
          />
        </Form.Item>
        <SharedFilterPeriod valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
