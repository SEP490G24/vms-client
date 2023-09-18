import React from 'react'
import { Input } from 'antd'
import { InputWrapper } from './styles'

interface SharedInputProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPressEnter?: () => void
  status?: 'error' | 'warning'
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  disabled?: boolean
  size?: 'large' | 'middle' | 'small'
  placeholder?: string
  title?: string
  inputClassName?: string
  className?: string
  name?: string
  maxLength?: number
  showCount?: boolean
}

export const SharedInput: React.FC<SharedInputProps> = React.memo(
  ({
     value,
     onChange,
     onPressEnter,
     status,
     prefix,
     suffix,
     disabled,
     size,
     placeholder,
     title,
     inputClassName,
     className,
     name,
     maxLength,
     showCount,
     ...rest
   }) => {
    return (
      <InputWrapper className={className}>
        {title && <p className='input-label'>{title}</p>}
        <Input
          name={name}
          value={value}
          onChange={onChange}
          onPressEnter={onPressEnter}
          status={status}
          prefix={prefix}
          suffix={suffix}
          disabled={disabled}
          size={size}
          placeholder={placeholder}
          className={inputClassName}
          showCount={showCount}
          maxLength={maxLength}
          {...rest}
        />
      </InputWrapper>
    )
  }
)

export const SharedInputInLined: React.FC<SharedInputProps> = React.memo(
  ({
     value,
     onChange,
     onPressEnter,
     status,
     prefix,
     suffix,
     disabled,
     size,
     placeholder,
     title,
     inputClassName,
     className,
     name,
     ...rest
   }) => {
    return (
      <SharedInput
        name={name}
        value={value}
        onChange={onChange}
        onPressEnter={onPressEnter}
        status={status}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        size={size}
        placeholder={placeholder}
        className={'w-20 ' + className}
        inputClassName={'text-center ' + inputClassName}
        {...rest}
      />
    )
  }
)
