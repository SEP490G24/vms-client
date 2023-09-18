import React, { useState } from 'react'
import { TimeRangeWrapper } from './styles'

import { TimePicker, Space, TimePickerProps, TimeRangePickerProps } from 'antd'


import { Dayjs } from 'dayjs'

interface SharedDateRangeProps {
  format?: string
  className?: string
  onChangeTime: (rangeValue: [string, string]) => void,
  theme?: 'outline' | 'inline'
}

export const SharedTimeRange: React.FC<SharedDateRangeProps> = React.memo(
  ({
     format,
     className,
     onChangeTime,
     theme
   }) => {
    const [rangeValueString, setRangeValueString] = useState<[string, string]>(['', ''])
    const [rangeValue, setRangeValue] = useState<[Dayjs | null, Dayjs | null]>([null, null])
    const timeFormat = format ?? 'HH:mm:ss'


    const handleOnTimeRangeChange: TimeRangePickerProps['onChange'] = (_, rangeString) => {
      setRangeValueString(rangeString)
      onChangeTime(rangeValueString)
    }

    const handleOnStartTimeChange: TimePickerProps['onChange'] = (_, valueString) => {
      setRangeValueString([valueString, rangeValueString[1]])
      setRangeValue([_, rangeValue[1]])
      onChangeTime([valueString, rangeValueString[1]])
    }

    const handleOnEndTimeChange: TimePickerProps['onChange'] = (_, valueString) => {
      setRangeValueString([rangeValueString[0], valueString])
      setRangeValue([rangeValue[0], _])
      onChangeTime([rangeValueString[0], valueString])
    }

    switch (theme) {
      case 'outline' :
        return (
          <Space className={className}>
            <TimePicker onChange={handleOnStartTimeChange} format={timeFormat}/>
            <span>~</span>
            <TimePicker onChange={handleOnEndTimeChange} format={timeFormat}/>
          </Space>
        )
      default:
      case 'inline':
        return (
          <TimeRangeWrapper className={className}>
            <TimePicker.RangePicker
              className={'w-full'}
              changeOnBlur
              onChange={handleOnTimeRangeChange}
              format={timeFormat} />
          </TimeRangeWrapper>
        )
    }
  }
)
