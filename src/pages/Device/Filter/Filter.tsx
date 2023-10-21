import { Card, DatePicker, Form, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedInput, SharedRadio } from '~/common'
import { DateRadioRange, getDataRangeOptions, getDateRangeValue } from '~/interface'
import { DeviceFilterPayload } from '~/service'

interface FilterArgs {
  onFilter: (filterPayload: DeviceFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange | null>()
  const { RangePicker } = DatePicker
  const [disable, setDisable] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    if ((valueDate?.date?.['0'] && valueDate?.date?.['1']) || keyword.trim()) setDisable(false)
    else setDisable(true)
  }, [valueDate,keyword])

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValueDate({ key: value, date: getDateRangeValue(value) })
  }

  const onFinish = (values: any) => {
    const payload: DeviceFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.toDate(),
      createdOnEnd: valueDate?.date?.['1']?.toDate(),
    }
    if (values?.query?.trim()) payload.keyword = values?.query?.trim()
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(null)
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('organization.device.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={BUTTON_ROLE_MAP.R_USER_FIND}
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
        <Form.Item label={t('common.label.period')}>
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
        <Form.Item label={t('organization.device.search.counselor')} name="query">
          <SharedInput
            placeholder={t('organization.device.search.counselor_placeholder')}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default Filter
