import React, { memo } from 'react'
import { SharedRadio } from '~/common'
import { DatePicker, Form, RadioChangeEvent } from 'antd'
import { useTranslation } from 'react-i18next'
import { DateRadioRange, getDataRangeOptions, getDateRangeValue } from '~/interface'

interface SharedFilterScopeProps {
  valueDate?: DateRadioRange
  setValueDate: (value?: DateRadioRange) => void
}

export const SharedFilterPeriod: React.FC<SharedFilterScopeProps> = memo((props) => {

  const { t } = useTranslation()
  const { RangePicker } = DatePicker

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    props.setValueDate({ key: value, date: getDateRangeValue(value) })
  }

  return (
    <>
      <Form.Item label={t('common.label.period')}>
        <RangePicker
          format={'YYYY-MM-DD'}
          value={props.valueDate?.date}
          onChange={(val) => {
            props.setValueDate({ key: undefined, date: val })
          }}
          changeOnBlur
          className='vms-picker'
          style={{ width: '100%' }}
          placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
        />
      </Form.Item>
      <Form.Item label={<span></span>} name='duration'>
        <SharedRadio
          options={getDataRangeOptions(t)}
          onChange={onChange}
          value={props.valueDate?.key}
          optionType='button'
        />
      </Form.Item>
    </>
  )
})
