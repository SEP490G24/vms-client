import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import moment from 'moment'
import { TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'

export enum Purpose {
  CONFERENCES = 'CONFERENCES',
  INTERVIEW = 'INTERVIEW',
  MEETING = 'MEETING',
  WORKING = 'WORKING',
  OTHERS = 'OTHERS'
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

export interface OptionItem {
  label: string
  value: any
  disabled?: boolean
}

export type TargetKey = React.MouseEvent | React.KeyboardEvent | string

export interface TableAction {
  pagination?: TablePaginationConfig,
  filters?: Record<string, FilterValue | null>,
  sorter?: any
}

export interface ConsultationHistoryItem {
  ticketId: string
  customerName: string
  status: string
  issueDate: string
  isBot?: boolean
  livechatSessionId?: string
}

export interface ButtonItem {
  label: string
  action?: () => void
  isSelect?: boolean
  value?: string
}

export interface RateItem {
  content: string
  rateValue: number
  onChangeRate?: () => void
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
