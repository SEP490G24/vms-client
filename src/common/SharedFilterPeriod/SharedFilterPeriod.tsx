import React, { memo } from 'react'
import { SharedRadio } from '~/common'
import { DatePicker, Form, RadioChangeEvent } from 'antd'
import { useTranslation } from 'react-i18next'
import { DateRadioRange } from '~/interface'
import {getDataRangeOptions, getDateRangeValue} from "~/utils";

interface SharedFilterScopeProps {
  valueDate?: DateRadioRange
  setValueDate: (value?: DateRadioRange) => void
  hiddenRadio?: boolean,
  showTime?: boolean
  format: string
  label: string
  name?: string
}

export const SharedFilterPeriod: React.FC<SharedFilterScopeProps> = memo((props) => {

  const { t } = useTranslation()
  const { RangePicker } = DatePicker

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    props.setValueDate({ key: value, date: getDateRangeValue(value) })
  }

  return (
    <>
      <Form.Item className={'mb-3'} label={t( props.label)} name={props.name} key='date'>
        <RangePicker
          format={props.format}
          value={props.valueDate?.date}
          onChange={(val) => {
            props.setValueDate({ key: undefined, date: val })
          }}
          changeOnBlur
          className='vms-picker'
          style={{ width: '100%' }}
          showTime = {props.showTime}
          placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
        />
      </Form.Item>
      <Form.Item className={'mb-3'} label={<span></span>} name='duration' hidden={props.hiddenRadio}>
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
