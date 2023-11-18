import httpService from './httpServices'
import authService from './authService'
import { TICKET } from '~/constants/api.ts'
import { PageableRequest, StatusTicket } from '~/interface'
import { CreateCustomerInfo } from '~/service/customerService.ts'

export interface CreateMeetingInfo {
  name: string;
  startTime: Date;
  endTime: Date;
  roomId?: string
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
  keyword?: string;
  purpose?: string;
  status?: string;
}

export interface CancelTicketPayload {
  reason: string;
  reasonNote?: string;
  ticketId: string;
}

export interface CheckInPayload {
  ticketId: string;
  customerId: string;
  checkInCode: string;
  status: StatusTicket;
  reasonId?: string;
  reasonNote?: string;
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

const findByQRCode = async (checkInCode: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(TICKET.FIND_BY_QR.replace('{checkInCode}', checkInCode))
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

const cancel = async (payload: CancelTicketPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(TICKET.CANCEL, payload)
  return httpService.handleResponseStatus(response)
}

const checkInCustomer = async (payload: CheckInPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(TICKET.CHECK_IN, payload)
  return httpService.handleResponseStatus(response)
}

const findWithRoom = async (payload: MeetingFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(TICKET.FIND_WITH_ROOM, payload)
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
  cancel,
  checkInCustomer,
  findWithRoom,
  filter
}

export default meetingTicketService
