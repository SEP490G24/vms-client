import { Dayjs } from 'dayjs'
import { TablePaginationConfig, UploadFile } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { PageableResponse } from '~/interface/PageableResponse.ts'
import { RcFile } from 'antd/es/upload'
import { Observable } from 'rxjs'
import { EventSourceMessage } from '@microsoft/fetch-event-source'

export interface RouteItem {
  path: string,
  component: any,
  layout?: any,
  role?: string[]
}

export interface MenuItem {
  key: string
  title: string
  icon?: any
  path?: string
  role?: string[]
  children: MenuItem[]
}

export interface OptionItem {
  label: string
  value: any
  disabled?: boolean
}

export interface EventSourceObserver {
  observer: Observable<EventSourceMessage>,
  close: () => void
}

export interface TableAction {
  pagination?: TablePaginationConfig,
  filters?: Record<string, FilterValue | null>,
  sorter?: any
}

export interface TableData<T> {
  pageableResponse?: PageableResponse<T>,
  loading: boolean
}

export interface InfoModalData<T> {
  entitySelected?: T,
  openModal: boolean,
  confirmLoading: boolean
}

export interface UploadFileData {
  file?: RcFile,
  content: UploadFile
}

export type SortDirectionType = 'ascend' | 'descend'

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

export interface DateRadioRange {
  key?: string
  date?: RangeValue
}

