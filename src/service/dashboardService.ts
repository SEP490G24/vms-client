import httpService from './httpServices'
import authService from './authService'
import {DASHBOARD} from '~/constants/api.ts'
import {StatusTicket} from "~/interface";

export interface DashboardFilterPayload {
  year?: number
  month?: number
  siteId?: string[]
  status?: StatusTicket[]
}

const countTicketsByPurposeWithPie = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_PURPOSE_WITH_PIE, payload)
  return httpService.handleResponseStatus(response)
}

const countTicketsByPurposeByWithMultiLine = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_PURPOSE_BY_WITH_MULTI_LINE, payload)
  return httpService.handleResponseStatus(response)
}

const countTicketsByStatus = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_STATUS, payload)
  return httpService.handleResponseStatus(response)
}

const countTicketsByStatusWithStackedColumn = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(DASHBOARD.COUNT_TICKETS_BY_STATUS_WITH_STACKED_COLUMN, payload)
  return httpService.handleResponseStatus(response)
}

const countVisitsByStatus = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(DASHBOARD.COUNT_VISITS_BY_STATUS, payload)
  return httpService.handleResponseStatus(response)
}

const countVisitsByStatusWithStackedColumn = async (payload: DashboardFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(DASHBOARD.COUNT_VISITS_BY_STATUS_WITH_STACKED_COLUMN, payload)
  return httpService.handleResponseStatus(response)
}


const cardService = {
  countTicketsByPurposeWithPie,
  countTicketsByPurposeByWithMultiLine,
  countTicketsByStatus,
  countTicketsByStatusWithStackedColumn,
  countVisitsByStatus,
  countVisitsByStatusWithStackedColumn,
}

export default cardService
