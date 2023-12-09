import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput } from '~/common'
import { DateRadioRange } from '~/interface'
import { RoomFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'
import { checkPermission } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

interface FilterArgs {
  onFilter: (filterPayload: RoomFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const [keyword, setKeyword] = useState<string>('')
  const [siteId, setSiteId] = useState<string>('')

  const onFinish = (values: any) => {
    const payload: RoomFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.END_DAY),
    }
    if (values?.keyword?.trim()) payload.keyword = values?.keyword?.trim()
    if (siteId) payload.siteId = [siteId]
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(undefined)
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('organization.room.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={PERMISSION_ROLE_MAP.R_USER_FIND}
            onClick={form.submit}
            type={'primary'}
          >
            {t('common.label.search')}
          </SharedButton>
        </Space>
      }
      bordered={false}
      className="vms-card filter-card"
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        colon={false}
        labelAlign="left"
        className="vms-form"
        onFinish={onFinish}
      >
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && <SharedFilterScope onChangeSite={setSiteId} />}
        <Form.Item className={'mb-3'} label={t('organization.room.search.counselor')} name="keyword">
          <SharedInput
            placeholder={t('organization.room.search.counselor_placeholder')}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Form.Item>
        <SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
