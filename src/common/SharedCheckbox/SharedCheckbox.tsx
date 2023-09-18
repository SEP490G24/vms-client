import React from 'react'
import { Checkbox } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { CheckboxWrapper } from './styles'

interface SharedCheckboxProps {
  onChange?: (e: CheckboxChangeEvent) => void
  disabled?: boolean
  defaultChecked?: boolean
  title?: string
  circle?: boolean
  className?: string;
}

export const SharedCheckbox: React.FC<SharedCheckboxProps> = React.memo((props) => {
  return (
    <CheckboxWrapper circle={props.circle}>
      <Checkbox className={props.className} onChange={props.onChange} defaultChecked={props.defaultChecked}
                disabled={props.disabled} />
      {props.title && <span className='checkbox-title'>{props.title}</span>}
    </CheckboxWrapper>
  )
})
