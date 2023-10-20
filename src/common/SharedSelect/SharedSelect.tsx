import React, { memo } from 'react'
import { Select } from 'antd'

import { OptionItem } from '~/interface/common'

interface SharedSelectProps {
  options: OptionItem[]
  defaultValue?: string | any
  onChange?: (value: string) => void
  className?: string
  value?: string
  placeholder?: string
  filterOption?: boolean
  onSearch?: any
  notFoundContent?: any
  showSearch?: boolean
  labelInValue?: boolean
  style?: any
  mode?: any
  onSelect?: any
  suffixIcon?: any
}

export const SharedSelect: React.FC<SharedSelectProps> = memo(
  ({
    options,
    onChange,
    defaultValue,
    className,
    value,
    placeholder,
    filterOption,
    onSearch,
    notFoundContent,
    showSearch,
    labelInValue,
    style,
    mode,
    onSelect,
    suffixIcon,
  }) => {
    return (
      <Select
        className={className ? className + ' vms-select' : 'vms-select'}
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
        style={style}
        mode={mode}
        onSelect={onSelect}
        suffixIcon={suffixIcon}
      />
    )
  },
)