import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedInput } from '~/common'
import { DateRadioRange } from '~/interface'
import { CustomerFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'

interface FilterArgs {
  onFilter: (filterPayload: CustomerFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const [keyword, setKeyword] = useState<string>('')
  const [siteId, setSiteId] = useState<string>('')

  const onFinish = (values: any) => {
    const payload: CustomerFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.END_DAY)
    }
    if (values?.query?.trim()) payload.keyword = values?.query?.trim()
    if (siteId) payload.siteId = siteId
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(undefined)
    setSiteId('')
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('customer.search.title')}
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
        {/*{checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && <SharedFilterScope onChangeSite={onChangeSite}/>}*/}
        <Form.Item className={'mb-3'} label={t('customer.search.counselor')} name='query'>
          <SharedInput
            placeholder={t('customer.search.counselor_placeholder')}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Form.Item>
        <SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate}
                            setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
