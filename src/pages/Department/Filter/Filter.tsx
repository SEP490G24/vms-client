import { Card, Form, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput } from '~/common'
import { DateRadioRange} from '~/interface'
import { DepartmentFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'

interface FilterArgs {
  onFilter: (filterPayload: DepartmentFilterPayload) => void
}


const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const [disable, setDisable] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')
  const [siteId, setSiteId] = useState<string | null>('')

  useEffect(() => {
    if ((valueDate?.date?.['0'] && valueDate?.date?.['1']) || keyword.trim() || siteId) setDisable(false)
    else setDisable(true)
  }, [valueDate,keyword,siteId])

  const onFinish = (values: any) => {
    const payload: DepartmentFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.START_DAY),
    }
    if (values?.query?.trim()) payload.keyword = values?.query?.trim()
    if (siteId) payload.siteIds = [siteId]
    args.onFilter(payload)
  }

  const onChangeSite = (siteId:string) => {
    setSiteId(siteId);
  }

  const onReset = () => {
    setValueDate(undefined)
    setSiteId(null)
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('organization.department.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={PERMISSION_ROLE_MAP.R_USER_FIND}
            onClick={form.submit}
            disabled={disable}
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

        <SharedFilterScope onChangeSite={onChangeSite} />
        <Form.Item label={t('organization.department.search.counselor')} name="query">
          <SharedInput
            placeholder={t('organization.department.search.counselor_placeholder')}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Form.Item>
        <SharedFilterPeriod valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
