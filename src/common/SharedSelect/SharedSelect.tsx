import React, { memo } from 'react'
import { Select } from 'antd'
import { SelectWrapper } from './styles.ts'

export interface OptionItem {
  label: string
  value: string
  disabled?: boolean
}

interface SharedSelectProps {
  options: OptionItem[]
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
  selectClassName?: string
  value?: string
  placeholder?: string
  filterOption?: boolean
  onSearch?: any
  notFoundContent?: any
  showSearch?: boolean
  labelInValue?: boolean
}

export const SharedSelect: React.FC<SharedSelectProps> = memo(
  ({ options, onChange, defaultValue, className, selectClassName, value, placeholder, filterOption, onSearch, notFoundContent, showSearch, labelInValue }) => {
    return (
      <SelectWrapper className={className}>
        <Select
          className={selectClassName}
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          value={value}
          placeholder={placeholder}
          filterOption={filterOption}
          onSearch={onSearch}
          notFoundContent={notFoundContent}
          showSearch={showSearch}
          labelInValue={labelInValue}
        />
      </SelectWrapper>
    )
  }
)
