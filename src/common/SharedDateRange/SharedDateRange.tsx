import React, { useState } from 'react'
import { DateRangeWrapper } from './styles'

import { Col, DatePicker, DatePickerProps, Row } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

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
          <Row className={'w-full'} align={'middle'}>
            <Col flex={1}>
              <DatePicker className={'w-full'} onChange={handleOnStartDateChange} format={dateFormat}
                // @ts-ignore
                          disabledDate={(picker: Dayjs) => picker && rangeValue[1] && picker > rangeValue[1].endOf('day')} />
            </Col>
            <Col span={2}><span>~</span></Col>
            <Col flex={1}>
              <DatePicker className={'w-full'} onChange={handleOnEndDateChange} format={dateFormat}
                // @ts-ignore
                          disabledDate={(picker: Dayjs) => picker && rangeValue[0] && picker < rangeValue[0].endOf('day')} />
            </Col>
          </Row>
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
