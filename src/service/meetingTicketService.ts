import httpService from './httpServices'
import authService from './authService'
import { TICKET } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'
import { CreateCustomerInfo } from '~/service/customerService.ts'

export interface CreateMeetingInfo {
  name: string;
  startTime?: string | Date;
  endTime?: string | Date;
  roomId?: string
  templateId?: string
  newCustomers: CreateCustomerInfo[];
  oldCustomers: string[];
  draft?: boolean
  description?: string
  purpose: string;
  purposeNote?: string;
}

export interface UpdateMeetingInfo {
  id: string;
  name: string;
  startTime?: string | Date;
  endTime?: string | Date;
  roomId?: string
  customers: CreateCustomerInfo[];
}

export interface MeetingFilterPayload {
  usernames?: string[];
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  createBy?: string;
  siteId?: string;
  query?: string;
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(TICKET.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(TICKET.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const findByQRCode = async (id: string, customerId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(TICKET.FIND_BY_QR.replace('{ticketId}', id)
    .replace('{customerId}', customerId))
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateMeetingInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(TICKET.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateMeetingInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(TICKET.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(TICKET.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: MeetingFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(TICKET.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
  return httpService.handleResponseStatus(response)
}

// const getMyMeetings = async () => {
//   httpService.attachTokenToHeader(authService.getToken() as string)
//   const response = await httpService.get(TICKET.MY_TICKET)
//   return httpService.handleResponseStatus(response)
// }
//
// const createMyMeeting = async (payload: any) => {
//   httpService.attachTokenToHeader(authService.getToken() as string)
//   const response = await httpService.post(TICKET.MY_TICKET, payload)
//   return httpService.handleResponseStatus(response)
// }

const meetingTicketService = {
  findAll,
  findById,
  findByQRCode,
  insert,
  update,
  remove,
  filter
}

export default meetingTicketService
