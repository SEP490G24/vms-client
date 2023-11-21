import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RangePicker, SharedButton, SharedInput } from '~/common'
import { CheckInFilterPayload} from '~/service'
import { DateRadioRange } from '~/interface'
import { DATE_TIME_HOUR } from '~/constants'


interface FilterArgs {
  onFilter: (CheckInFilterPayLoad: CheckInFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDateStart, setValueDateStart] = useState<DateRadioRange>()
  const [valueDateEnd, setValueDateEnd] = useState<DateRadioRange>()
  const [disable, setDisable] = useState<boolean>(true)

  const onFinish = (values: any) => {
    const payload: CheckInFilterPayload = {
      keyword: values['keyword'],
      startTimeStart: valueDateStart?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      startTimeEnd: valueDateStart?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeStart: valueDateEnd?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeEnd: valueDateEnd?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY)
    }
    props.onFilter(payload)
  }
  const onFieldsChange = (value: any) => {
    if (value){
      setDisable(false);
    } else {
      setDisable(true)
    }
  }

  const onReset = () => {
    setValueDateStart(undefined)
    setValueDateEnd(undefined)
    setDisable(true)
    form.resetFields()
    props.onFilter({})
  }

  return (
    <Card
      title={t('customer.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={PERMISSION_ROLE_MAP.R_USER_FIND}
            type={'primary'}
            onClick={form.submit}
            disabled = {disable}
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
        <Form.Item className={'mb-3'} label={t('common.field.customer')} name='keyword'>
          <SharedInput
            placeholder={t('common.placeholder.customer_filer')}
          />
        </Form.Item>
        <Form.Item label={t('common.field.start_time')} name='startTime'>
          <RangePicker
            format={'DD-MM-YYYY HH:mm'}
            value={valueDateStart?.date}
            onChange={(val) => {
              setValueDateStart({ key: undefined, date: val })
            }}
            showTime
            changeOnBlur
            className='vms-picker'
            style={{ width: '100%' }}
            placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
          />
        </Form.Item>
        <Form.Item label={t('common.field.end_time')} name='endTime' >
          <RangePicker
            format={'DD-MM-YYYY HH:mm'}
            value={valueDateEnd?.date}
            onChange={(val) => {
              setValueDateEnd({ key: undefined, date: val })
            }}
            showTime
            changeOnBlur
            className='vms-picker'
            style={{ width: '100%' }}
            placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default Filter
