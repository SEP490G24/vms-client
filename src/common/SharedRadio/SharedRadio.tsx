import React, { memo } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { OptionItem } from '~/interface/common'

interface SharedRadioProps {
  onChange?: (e: RadioChangeEvent) => void
  value?: string
  optionType?: 'default' | 'button'
  size?: 'large' | 'middle' | 'small'
  buttonStyle?: 'outline' | 'solid'
  name?: string
  options: OptionItem[] | any
  defaultValue?: string
  className?: string
}

export const SharedRadio: React.FC<SharedRadioProps> = memo(
  ({ onChange, value, optionType, buttonStyle, options, defaultValue, className }) => {
    return (
      <Radio.Group
        onChange={onChange}
        value={value}
        optionType={optionType}
        buttonStyle={buttonStyle}
        options={options}
        defaultValue={defaultValue}
        className={className ? className + ' vms-radio-group' : 'vms-radio-group'}
      />
    )
  },
)
