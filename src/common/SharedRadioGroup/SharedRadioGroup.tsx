import React from 'react'
import { RadioGroupWrapper } from './styles'
import { Radio } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { DisabledType } from 'antd/es/config-provider/DisabledContext'
import { RadioChangeEvent } from 'antd/es/radio/interface'
import { CheckboxOptionType } from 'antd/es/checkbox/Group'

interface SharedRadioGroupProps {
  defaultValue?: any;
  value?: any;
  onChange?: (e: RadioChangeEvent) => void;
  size?: SizeType;
  disabled?: DisabledType;
  name?: string;
  className?: string;
  rootClassName?: string;
  options?: Array<CheckboxOptionType | string | number>;
}

export const SharedRadioGroup: React.FC<SharedRadioGroupProps> = React.memo((props) => {

  return (
    <RadioGroupWrapper>
      <Radio.Group
        className={'flex gap-2 ' + props.className}
        defaultValue={props.defaultValue}
        size={props.size}
        disabled={props.disabled}
        name={props.name}
        rootClassName={props.rootClassName}
        options={props.options}
        optionType={'button'}
        buttonStyle={'solid'}
        onChange={props.onChange}

      >
      </Radio.Group>
    </RadioGroupWrapper>
  )
})
