import React from 'react'
import { SharedInput } from '~/common'
import { PhoneNumberWrapper } from './styles'

interface SharedInputProps {
  title?: string
  value?: string
  defaultValue?: string
  onChangePhone?: (e: any) => void
  placeholder?: string
}

export const SharedPhoneNumber: React.FC<SharedInputProps> = React.memo(
  ({ title, value, defaultValue, placeholder, onChangePhone }) => {

    return (
      <PhoneNumberWrapper>
        {title && <p className='input-label'>{title}</p>}
        <SharedInput
          value={value}
          defaultValue={defaultValue}
          inputMode={'tel'}
          placeholder={placeholder}
          maxLength={10}
          onChange={onChangePhone}
        />
      </PhoneNumberWrapper>
    )
  }
)
