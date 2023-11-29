// @ts-ignore
import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange } from '~/interface'
import { AuditLogFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'
import { AuthSection } from '~/auth'
import { SCOPE_ROLE_MAP } from '~/role'

interface FilterArgs {
  onFilter: (filterPayload: AuditLogFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const [disable, setDisable] = useState<boolean>(true)
  const [siteId, setSiteId] = useState<string>()

  const onFinish = (values: any) => {
    const payload: AuditLogFilterPayload = {
      keyword: values['keyword'],
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.START_DAY),
      siteId: siteId,
      auditType: values['type'],
    }
    args.onFilter(payload)
  }

  const onFieldsChange = (value: any) => {
    if (value) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const onReset = () => {
    setValueDate(undefined)
    setDisable(true)
    form.resetFields()
    args.onFilter({})
  }
  const onChangeSite = (siteId: string) => {
    setSiteId(siteId)
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
            disabled={disable}
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
        onFieldsChange={onFieldsChange}
      >
        <Form.Item className={'mb-3'} label={t('common.label.audit-log')} name='keyword'>
          <SharedInput
            placeholder={t('common.placeholder.keyword')}
          />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <SharedFilterScope onChangeSite={onChangeSite} />
        </AuthSection>
        <Form.Item className={'mb-3'} label={t('common.field.type')} name='type'>
          <SharedSelect
            options={[{ label: 'CREATE', value: 'CREATE' }, { label: 'UPDATE', value: 'UPDATE' }, {
              label: 'DELETE',
              value: 'DELETE',
            }]}
            placeholder={t('common.placeholder.type')} />
        </Form.Item>

        <SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate} hiddenRadio={true}
                            setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
