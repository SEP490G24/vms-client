import { AxiosRequestConfig } from 'axios'
import { OptionItem, RangeValue, SortDirectionType, TableAction } from '~/interface'
import { authService } from '~/service'
import { durationOption, SortDirection } from '~/constants'
import moment from 'moment/moment'
import dayjs from 'dayjs'

export const TICKET_STATE_LABELS: any = {
  PRE_CONSULTANT: 'common.ticketStatus.preConsultation',
  IN_PROGRESS: 'common.ticketStatus.inProgress',
  TRANSFER_COUNSELING: 'common.ticketStatus.transfer',
  FINISHED_COUNSELING: 'common.ticketStatus.finishedCounseling',
  COMPLETE: 'common.ticketStatus.complete'
}

export class PageRequest {
  page?: number = 0
  size?: number
  sort?: string

  constructor(page?: number, size?: number, sort?: string) {
    this.page = page
    this.size = size
    this.sort = sort
  }
}

export const createRequestOption = (req?: any): AxiosRequestConfig => {
  let config: AxiosRequestConfig = { params: {} }
  const params: any = {}
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort' && req[key] !== null && req[key] !== undefined) {
        params[key] = req[key]
      }
    })

    if (req.sort) {
      req.sort.forEach((val: string) => {
        params.append('sort', val)
      })
    }
  }
  config.params = params
  return config
}

export const AxiosMethod = {
  POST: 'post',
  PUT: 'put',
  GET: 'get',
  DEL: 'del'
}

export const parseJson = (jsonText: string) => {
  try {
    return JSON.parse(jsonText)
  } catch (error) {
    return undefined
  }
}

export const toHoursAndMinutes = (totalSeconds: any) => {

  const totalMinutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds % 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}h ${minutes}m ${seconds}s `
}

export const convertMsToTime = (milliseconds: any) => {
  const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, '0')
  }
  let seconds = Math.floor(milliseconds / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)

  seconds = seconds % 60
  minutes = minutes % 60
  hours = hours % 24
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

export function formatDate(date: Date | undefined) {
  if (!date) date = new Date()
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate())
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds())
    ].join(':')
  )
}

export function resetCurrentPageAction(tableAction: TableAction) {
  return {
    ...tableAction,
    pagination: {
      ...tableAction.pagination,
      current: 1
    }
  }
}

export const randomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function formatSortParam(sortField: string, sortOrder?: string) {
  return sortOrder ? `${sortField},${SortDirection[sortOrder as SortDirectionType]}` : undefined
}

export const checkPermission = (permissions: any): any => {
  return !permissions || authService.hasRole(permissions)
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



