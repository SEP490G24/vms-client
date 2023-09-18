import React, { memo } from 'react'
import type { TimePickerProps } from 'antd'
import { TimePicker } from 'antd'
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
    const handleChangeDate: TimePickerProps['onChange'] = (_, timeString) => {
      onChange(timeString)
    }

    return (
      <TimePicker
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
