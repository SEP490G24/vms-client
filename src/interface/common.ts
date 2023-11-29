import {Dayjs} from 'dayjs'
import {TablePaginationConfig, UploadFile} from 'antd'
import {FilterValue} from 'antd/es/table/interface'
import {PageableResponse} from '~/interface/PageableResponse.ts'
import {RcFile} from 'antd/es/upload'
import {Observable} from 'rxjs'
import {EventSourceMessage} from '@microsoft/fetch-event-source'

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

export enum MONTHS {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export enum TemplateType {
  CANCEL_MEETING_EMAIL = 'CANCEL_MEETING_EMAIL',
  CONFIRM_MEETING_EMAIL = 'CONFIRM_MEETING_EMAIL'
}

export enum StatusTicket {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  CANCEL = 'CANCEL',
  REJECT = 'REJECT'
}

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

