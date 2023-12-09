// @ts-ignore
import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange } from '~/interface'
import { AuditLogFilterPayload } from '~/service'
import { AuditAction, DATE_TIME } from '~/constants'
import { AuthSection } from '~/auth'
import { SCOPE_ROLE_MAP } from '~/role'
import { enumToArray } from '~/utils'

interface FilterArgs {
  onFilter: (filterPayload: AuditLogFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()

  const onFinish = (values: any) => {
    const payload: AuditLogFilterPayload = {
      keyword: values['keyword'],
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.END_DAY),
      auditType: values['type'],
      siteId:values["siteId"] ? [values['siteId']] : []
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
      title={t('common.label.search')}
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
        <Form.Item className={'mb-3'} label={t('common.label.audit-log')} name='keyword'>
          <SharedInput
            placeholder={t('common.placeholder.keyword')}
          />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <SharedFilterScope />
        </AuthSection>
        <Form.Item className={'mb-3'} label={t('common.field.type')} name='type'>
          <SharedSelect
            options={enumToArray(AuditAction).map((item) => {
              return {label: item.key, value: item.value}
            })}
            placeholder={t('common.placeholder.type')} />
        </Form.Item>

        <SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate} hiddenRadio={true}
                            setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
