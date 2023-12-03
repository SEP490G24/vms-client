import { Card, DatePicker, Form, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedInput, SharedRadio, SharedSelect } from '~/common'
import { DateRadioRange } from '~/interface'
import { DeviceFilterPayload } from '~/service'
import {getDataRangeOptions, getDateRangeValue} from "~/utils";
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { SCOPE_ROLE_MAP } from '~/role'
import { AuthSection } from '~/auth'

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
  const { sites } = useSelector(sitesSelector)

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValueDate({ key: value, date: getDateRangeValue(value) })
  }

  const onFinish = (values: any) => {
    const payload: DeviceFilterPayload = {
      keyword: values['keyword'],
      createdOnStart: valueDate?.date?.['0']?.toDate(),
      createdOnEnd: valueDate?.date?.['1']?.toDate(),
      siteId: [values['siteId']]
    }
    args.onFilter(payload)
  }

  const onFieldsChange = () => {
    setDisable(false)
  }

  const onReset = () => {
    setValueDate(null)
    setDisable(true)
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
        <Form.Item className={'mb-3'} label={t('common.label.period')}>
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
        <Form.Item className={'mb-3'} label={t('organization.device.search.counselor')} name="keyword">
          <SharedInput
            placeholder={t('organization.device.search.counselor_placeholder')}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId' >
            <SharedSelect
              options={sites.map((site) => {
                return { label: site.name, value: site.id, key: site.id }
              }) ?? []}
              placeholder={t('common.placeholder.site')}
            ></SharedSelect>
          </Form.Item>
        </AuthSection>
        <Form.Item className={'mb-3'} label={<span></span>} name="duration">
          <SharedRadio
            options={getDataRangeOptions(t)}
            onChange={onChange}
            value={valueDate?.key}
            optionType="button"
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default Filter
