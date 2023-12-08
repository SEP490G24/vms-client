import React, {useMemo, useRef, useState} from 'react'
import {SharedSelect} from '..'
import {debounce} from 'lodash'
import {Spin} from 'antd'
import {OptionItem} from "~/interface";

interface Props {
  options?: OptionItem[]
  defaultValue?: string | any
  onChange?: (value: any) => void
  className?: string
  value?: string
  placeholder?: string
  filterOption?: boolean
  onSearch?: any
  notFoundContent?: any
  showSearch?: boolean
  maxTagCount?: number
  labelInValue?: boolean
  style?: any
  mode?: 'multiple' | 'tags';
  allowClear?: boolean
  onSelect?: any
  suffixIcon?: any
  disabled?: boolean
  bordered?: boolean
  fetchOptions: (values?: any) => Promise<OptionItem[]>
  debounceTimeout: number
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
}

export const DebounceSelect: React.FC<Props> = (props) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<OptionItem[]>(props.options ?? [])
  const fetchRef = useRef(0)
  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value: any) => {
      fetchRef.current += 1
      const fetchId = fetchRef.current
      setOptions([])
      setFetching(true)
      props.fetchOptions(value).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          return
        }
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, 800)
  }, [props])

  return (
    <SharedSelect
      labelInValue
      maxTagCount={props.maxTagCount}
      placeholder={props.placeholder}
      showSearch={true}
      filterOption={false}
      options={options}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small'/> : null}
      dropdownRender={props.dropdownRender}
      {...props}
    ></SharedSelect>
  )
}
