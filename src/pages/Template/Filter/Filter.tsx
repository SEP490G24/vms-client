import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange } from '~/interface'
import { TemplateType } from  '~/constants'
import { Status } from '~/constants'
import { TemplateFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'
import { checkPermission, enumToArray } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

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
      siteId: values['siteId'] ? [values['siteId']] : [],
      type: values['type'],
      keyword: values['keyword'],
      enable: values['enable'],
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
      title={t('organization.template.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            type={'primary'}
            // permissions={PERMISSION_ROLE_MAP.R_USER_FIND}
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
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
          <SharedFilterScope siteId={siteFilter} onChangeSite={setSiteFilter} />}
        <Form.Item className={'mb-3'} label={t('common.field.type')} name='type'>
          <SharedSelect
            options={enumToArray(TemplateType).map(item => {
              return { label: item.key, value: item.value }
            })}
            placeholder={t('common.placeholder.type')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.status')} name='enable'>
          <SharedSelect
            options={Object.entries(Status).map(item => {
              return { label: item[0], value: item[1] }
            })}
            placeholder={t('common.placeholder.type')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('organization.template.search.counselor')} name='keyword'>
          <SharedInput
            placeholder={t('organization.template.search.counselor_placeholder')}
          />
        </Form.Item>
        <SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
