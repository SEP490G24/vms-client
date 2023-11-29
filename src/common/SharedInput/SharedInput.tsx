import React, { CSSProperties, Ref } from 'react'
import { Input } from 'antd'
import { InputWrapper } from './styles'

interface SharedInputProps {
  myRef?: Ref<any> | undefined
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPressEnter?: () => void
  onKeyUp?: () => void
  status?: 'error' | 'warning'
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
  readonly?: boolean
  showCount?: boolean
  size?: 'large' | 'middle' | 'small'
  placeholder?: string
  title?: string
  inputClassName?: string
  name?: string
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined
  maxLength?: number
  style?: CSSProperties | undefined
  hasActionBtn?: boolean
  labelBtn?: string | React.ReactNode
  onInnerClick?: () => void
}
export const SharedInput: React.FC<SharedInputProps> = React.memo(
  ({
    myRef,
    value,
    defaultValue,
    onChange,
    onPressEnter,
    onKeyUp,
    status,
    prefix,
    suffix,
    disabled,
    showCount,
    hidden,
    readonly,
    size,
    placeholder,
    title,
    inputClassName,
    inputMode,
    maxLength,
    style,
    hasActionBtn,
    labelBtn,
    onInnerClick,
    ...rest
  }) => {
    return (
      <InputWrapper hasActionBtn={hasActionBtn}>
        {title && <p className="input-label">{title}</p>}
        <Input
          ref={myRef}
          value={value}
          defaultValue={defaultValue}
          readOnly={readonly}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onPressEnter={onPressEnter}
          status={status}
          prefix={prefix}
          suffix={suffix}
          disabled={disabled}
          hidden={hidden}
          size={size}
          showCount={showCount}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={placeholder}
          className={hasActionBtn ? '' : inputClassName ? inputClassName + ' vms-input' : 'vms-input'}
          style={style}
          bordered={hasActionBtn ? false : true}
          {...rest}
        />
        {hasActionBtn && (
          <div className="btn-label-inner" onClick={onInnerClick}>
            {labelBtn}
          </div>
        )}
      </InputWrapper>
    )
  },
)

// export const SharedInputInLined: React.FC<SharedInputProps> = React.memo(
//   ({
//      value,
//      onChange,
//      onPressEnter,
//      status,
//      prefix,
//      suffix,
//      disabled,
//      size,
//      placeholder,
//      title,
//      inputClassName,
//      className,
//      name,
//      ...rest
//    }) => {
//     return (
//       <SharedInput
//         name={name}
//         value={value}
//         onChange={onChange}
//         onPressEnter={onPressEnter}
//         status={status}
//         prefix={prefix}
//         suffix={suffix}
//         disabled={disabled}
//         size={size}
//         placeholder={placeholder}
//         className={'w-20 ' + className}
//         inputClassName={'text-center ' + inputClassName}
//         {...rest}
//       />
//     )
//   }
// )
