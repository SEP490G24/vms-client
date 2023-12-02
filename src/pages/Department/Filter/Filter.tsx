import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput } from '~/common'
import { DateRadioRange} from '~/interface'
import { DepartmentFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'
import { checkPermission } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

interface FilterArgs {
  onFilter: (filterPayload: DepartmentFilterPayload) => void
}


const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const [disable, setDisable] = useState<boolean>(true)

  const onFinish = (values:any) => {
    const payload: DepartmentFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.START_DAY),
      keyword: values['keyword'],
      siteIds:values["siteId"] != null ? [values['siteId']] : undefined
    }
    args.onFilter(payload)
  }

  const onFieldsChange = () => {
    setDisable(false)
  }
  const onReset = () => {
    setValueDate(undefined)
    form.resetFields()
    args.onFilter({})
    setDisable(true)
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
        onFieldsChange={onFieldsChange}
      >

        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && <SharedFilterScope />}
        <Form.Item className={'mb-3'} label={t('organization.department.search.counselor')} name="keyword">
          <SharedInput
            placeholder={t('organization.department.search.counselor_placeholder')}
          />
        </Form.Item>
        <SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
