import { Card, DatePicker, Form, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedInput, SharedRadio } from '~/common'
import { DateRadioRange, getDataRangeOptions, getDateRangeValue, UserFilterPayload } from '~/interface'

interface FilterArgs {
  onFilter: (filterPayload: UserFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange | null>()
  const { RangePicker } = DatePicker
  const [disable, setDisable] = useState<boolean>(true)
  const [searchOr, setSearchOr] = useState<string>('')

  useEffect(() => {
    if ((valueDate?.date?.['0'] && valueDate?.date?.['1']) || searchOr.trim()) setDisable(false)
    else setDisable(true)
  }, [valueDate,searchOr])

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValueDate({ key: value, date: getDateRangeValue(value) })
  }

  const onFinish = (values: any) => {
    const payload: UserFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.toDate(),
      createdOnEnd: valueDate?.date?.['1']?.toDate(),
    }
    if (values?.query?.trim()) payload.searchOr = values?.query?.trim()
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(null)
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('organization.user.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('organization.user.search.reset')}</SharedButton>
          <SharedButton
            // permissions={BUTTON_ROLE_MAP.R_USER_FIND}
            onClick={form.submit}
            disabled={disable}
          >
            {t('organization.user.search.search')}
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
        <Form.Item label={t('organization.user.search.period')}>
          <RangePicker
            value={valueDate?.date}
            onChange={(val) => {
              setValueDate({ key: undefined, date: val })
            }}
            changeOnBlur
            className="vms-picker"
            style={{ width: '100%' }}
            placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
          />
        </Form.Item>
        <Form.Item label={<span></span>} name="duration">
          <SharedRadio
            options={getDataRangeOptions(t)}
            onChange={onChange}
            value={valueDate?.key}
            optionType="button"
          />
        </Form.Item>
        <Form.Item label={t('organization.user.search.counselor')} name="query">
          <SharedInput
            placeholder={t('organization.user.search.counselor_placeholder')}
            value={searchOr}
            onChange={(e: any) => setSearchOr(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default Filter
