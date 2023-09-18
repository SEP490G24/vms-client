import { ConfigProvider, Input } from 'antd'

import { TextAreaWrapper } from './styles'

const { TextArea } = Input

interface SharedTextAreaProps {
  placeholder?: string
  classNames?: string
  disabled?: boolean
  allowClear?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  minRows?: number
  maxRows?: number
  isResize?: boolean
  maxLength?: number
  showCount?: boolean
  name?: string
}

export const SharedTextArea: React.FC<SharedTextAreaProps> = ({
  value,
  onChange,
  allowClear,
  disabled,
  classNames,
  placeholder,
  maxRows,
  minRows,
  isResize = true,
  maxLength,
  showCount,
  name,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            controlHeight: 20,
          },
        },
      }}
    >
      <TextAreaWrapper>
        <TextArea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoSize={{ minRows, maxRows }}
          className={classNames}
          allowClear={allowClear}
          disabled={disabled}
          style={{ resize: isResize ? 'block' : 'none' }}
          maxLength={maxLength}
          showCount={showCount}
          name={name}
        />
      </TextAreaWrapper>
    </ConfigProvider>
  )
}
