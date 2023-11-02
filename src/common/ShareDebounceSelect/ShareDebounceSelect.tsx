import { useMemo, useRef, useState } from 'react'
import { SharedSelect } from '..'
import { debounce } from 'lodash'
import { Spin } from 'antd'

interface DebounceSelectProps {
  fetchOptions: (payload?: any) => Promise<any>;
  debounceTimeout: number,
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
  mode?: 'multiple' | 'tags';
  allowClear?: boolean
  onSelect?: any
  suffixIcon?: any
}

export const DebounceSelect = (props: DebounceSelectProps) => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
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
  }, [props.debounceTimeout, props.debounceTimeout])

  return (
    <SharedSelect
      labelInValue
      showSearch={true}
      filterOption={false}
      options={options}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      className={props.className ? props.className + ' vms-select' : 'vms-select'}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      allowClear={props.allowClear}
      style={props.style}
      mode={props.mode}
      onSelect={props.onSelect}
      suffixIcon={props.suffixIcon}
    ></SharedSelect>
  )
}
