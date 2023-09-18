import React, { useState } from 'react'
import { DateRangeWrapper } from './styles'

import { DatePicker, DatePickerProps, Space } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'

const { RangePicker } = DatePicker

import { Dayjs } from 'dayjs'

interface SharedDateRangeProps {
  format?: string
  onChange: (rangeValue: [string, string]) => void,
  theme?: 'outline' | 'inline'
}

export const SharedDateRange: React.FC<SharedDateRangeProps> = React.memo(
  ({
     format,
     onChange,
     theme
   }) => {
    const [rangeValueString, setRangeValueString] = useState<[string, string]>(['', ''])
    const [rangeValue, setRangeValue] = useState<[Dayjs | null, Dayjs | null]>([null, null])
    const dateFormat = format ?? 'YYYY/MM/DD'


    const handleOnDateRangeChange: RangePickerProps['onChange'] = (_, rangeString) => {
      setRangeValueString(rangeString)
      onChange(rangeValueString)
    }

    const handleOnStartDateChange: DatePickerProps['onChange'] = (_, valueString) => {
      setRangeValueString([valueString, rangeValueString[1]])
      setRangeValue([_, rangeValue[1]])
      onChange([valueString, rangeValueString[1]])
    }

    const handleOnEndDateChange: DatePickerProps['onChange'] = (_, valueString) => {
      setRangeValueString([rangeValueString[0], valueString])
      setRangeValue([rangeValue[0], _])
      onChange([rangeValueString[0], valueString])
    }

    switch (theme) {
      case 'outline' :
        return (
          <Space>
            <DatePicker onChange={handleOnStartDateChange} format={dateFormat}
              // @ts-ignore
                        disabledDate={(picker: Dayjs) => picker && rangeValue[1] && picker > rangeValue[1].endOf('day')} />
            <span>~</span>
            <DatePicker onChange={handleOnEndDateChange} format={dateFormat}
              // @ts-ignore
                        disabledDate={(picker: Dayjs) => picker && rangeValue[0] && picker < rangeValue[0].endOf('day')} />
          </Space>
        )
      default:
      case 'inline':
        return (
          <DateRangeWrapper>
            <RangePicker
              changeOnBlur
              onChange={handleOnDateRangeChange}
              format={dateFormat} />
          </DateRangeWrapper>
        )
    }
  }
)
