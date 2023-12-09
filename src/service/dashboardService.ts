import httpService from './httpServices'
import authService from './authService'
import {DASHBOARD} from '~/constants/api.ts'
import { StatusTicketCustomer, StatusTicketMeeting } from '~/constants'

export interface DashboardFilterPayload {
  year?: number
  month?: number
  siteId?: string[]
  status?: StatusTicketMeeting[] | StatusTicketCustomer[]
}

const countTicketsByPurposeWithPie = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_PURPOSE_WITH_PIE, payload)
  return httpService.handleResponseStatus(response)
}

const countTicketsByPurposeByWithMultiLine = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_PURPOSE_BY_WITH_MULTI_LINE, payload)
  return httpService.handleResponseStatus(response)
}

const countTicketsByStatus = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_STATUS, payload)
  return httpService.handleResponseStatus(response)
}

const countTicketsByStatusWithStackedColumn = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_STATUS_WITH_STACKED_COLUMN, payload)
  return httpService.handleResponseStatus(response)
}

const countTicketsPeriod = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_PERIOD, payload)
  return httpService.handleResponseStatus(response)
}

const countVisitsByStatus = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DASHBOARD.COUNT_VISITS_BY_STATUS, payload)
  return httpService.handleResponseStatus(response)
}

const countVisitsByStatusWithStackedColumn = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DASHBOARD.COUNT_VISITS_BY_STATUS_WITH_STACKED_COLUMN, payload)
  return httpService.handleResponseStatus(response)
}


const cardService = {
  countTicketsByPurposeWithPie,
  countTicketsByPurposeByWithMultiLine,
  countTicketsByStatus,
  countTicketsByStatusWithStackedColumn,
  countTicketsPeriod,
  countVisitsByStatus,
  countVisitsByStatusWithStackedColumn,
}

export default cardService
