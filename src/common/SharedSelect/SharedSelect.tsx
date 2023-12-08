import React, { memo } from 'react'
import { Select } from 'antd'

import { OptionItem } from '~/interface/common'

interface SharedSelectProps {
  options: OptionItem[]
  defaultValue?: string | any
  onChange?: (value: any) => void
  className?: string
  value?: any
  placeholder?: string
  filterOption?: boolean
  onSearch?: any
  notFoundContent?: any
  showSearch?: boolean
  labelInValue?: boolean
  style?: any
  mode?: 'multiple' | 'tags';
  allowClear?: boolean
  onSelect?: any
  suffixIcon?: any
  disabled?: boolean
  bordered?: boolean
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
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
     allowClear,
     mode,
     onSelect,
     suffixIcon,
     bordered,
     disabled,
    dropdownRender
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
        bordered={bordered}
        notFoundContent={notFoundContent}
        showSearch={showSearch}
        labelInValue={labelInValue}
        allowClear={allowClear}
        style={style}
        mode={mode}
        onSelect={onSelect}
        suffixIcon={suffixIcon}
        disabled={disabled}
        dropdownRender={dropdownRender}
      />
    )
  }
)
