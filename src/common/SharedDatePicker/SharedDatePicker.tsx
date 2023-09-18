import React, { memo } from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import { Dayjs } from 'dayjs'

interface SharedDatePickerProps {
  onChange: (value: string) => void
  value?: any
  className?: string
  name?: string
  format?: string
  defaultValue?: Dayjs | undefined
}

export const SharedDatePicker: React.FC<SharedDatePickerProps> = memo(
  ({ onChange, value, className, name, format, defaultValue }) => {
    const handleChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
      onChange(dateString)
    }

    return (
      <DatePicker
        className={className}
        value={value}
        onChange={handleChangeDate}
        name={name}
        format={format}
        defaultValue={defaultValue}
      />
    )
  },
)
