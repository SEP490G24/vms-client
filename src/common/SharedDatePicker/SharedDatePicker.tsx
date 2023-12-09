import React, { memo, useState } from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker, Input } from 'antd'
import { Dayjs } from 'dayjs'

interface SharedDatePickerProps {
  onChangeDate?: (value: string) => void
  value?: any
  className?: string
  placeholder?: string
  name?: string
  disabledDate?: (date: Dayjs) => boolean;
  format?: string
  defaultValue?: Dayjs | undefined
  style?: any
  showTime?:boolean
}

export const SharedDatePicker: React.FC<SharedDatePickerProps> = memo(
  ({ onChangeDate, value, className, name, format, disabledDate, defaultValue,style,showTime }) => {

    const [valueDate, setValueDate] = useState(value)

    const handleChangeDate: DatePickerProps['onChange'] = (day, dateString) => {
      onChangeDate && onChangeDate(dateString)
      setValueDate(day)
    }

    return (
      <>
        <Input className={'hidden'} hidden={true}></Input>
        <DatePicker
          className={className}
          value={valueDate}
          onChange={handleChangeDate}
          name={name}
          format={format}
          defaultValue={defaultValue}
          disabledDate={disabledDate}
          style={style}
          showTime={showTime}
        />
      </>
    )
  },
)

export const { RangePicker } = DatePicker;
