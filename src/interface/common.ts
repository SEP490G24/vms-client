import dayjs, { Dayjs } from 'dayjs'
import moment from 'moment'
import { TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { PageableResponse } from '~/interface/PageableResponse.ts'

export enum Purpose {
  CONFERENCES, INTERVIEW, MEETING, WORKING, OTHERS
}

export enum TemplateVariable {
  customerName,
  meetingName,
  startTime,
  endTime,
  address,
  roomName
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum TemplateType {
  EMAIL = 'EMAIL',
  SMS = 'SMS'
}

export enum StatusTicket {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  CANCEL = 'CANCEL',
  REJECT = 'REJECT'
}

export const Status = {
  ENABLE: true,
  DISABLE: false
}

export interface OptionItem {
  label: string
  value: any
  disabled?: boolean
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

export const durationOption = {
  'TODAY': 'common.durationOption.today',
  '1WEEK': 'common.durationOption.1week',
  '1MONTH': 'common.durationOption.1month',
  '3MONTHS': 'common.durationOption.3months'
}

export type SortDirectionType = 'ascend' | 'descend'

export const SortDirection = {
  'ascend': 'asc',
  'descend': 'desc'
}

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

export interface DateRadioRange {
  key?: string
  date?: RangeValue
}

export const getDataRangeOptions = (t: any) => {
  const options: OptionItem[] = []
  const entries = Object.entries(durationOption)
  entries.forEach(([key, value]) => {
    options.push({ label: t(value), value: key })
  })
  return options
}

/**
 * Get RangeValue
 * @param key as TODAY, 1WEEK, 1MONTH, 3MONTHS
 */
export const getDateRangeValue = (key: string): RangeValue => {
  const today = new Date(moment().format('yyyy/MM/DD'))
  switch (key) {
    case 'TODAY':
      return [dayjs(today), dayjs(today).add(+1, 'day')]
    case '1WEEK':
      return [dayjs(today).add(-1, 'week'), dayjs(today)]
    case '1MONTH':
      return [dayjs(today).add(-1, 'month'), dayjs(today)]
    case '3MONTHS':
      return [dayjs(today).add(-3, 'months'), dayjs(today)]
  }
  return null
}
