import httpService from './httpServices'
import authService from './authService'
import { TICKET } from '~/constants/api.ts'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { EventSourceObserver, PageableRequest, StatusTicket } from '~/interface'
import { CreateCustomerInfo } from '~/service/customerService.ts'
import { Observable } from 'rxjs'
import { CHECK_IN_EVENT } from '~/constants'

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
  startTimeStart?: string;
  endTimeStart?: string;
  startTimeEnd?: string;
  endTimeEnd?: string;
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

const subscribeCheckIn = async (siteId?: string): Promise<EventSourceObserver> => {
  let url = TICKET.SUBSCRIBE_CHECK_IN
  if (!!siteId) {
    url += `?siteId=${siteId}`
  }
  const controller = new AbortController()
  return {
    observer: new Observable((observer) => {
      fetchEventSource(url, {
        method: 'GET',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        signal: controller.signal,
        onmessage: (message) => {
          if (message.event === CHECK_IN_EVENT) {
            observer.next(message)
          }
        },
        onerror: (error) => {
          observer.error(error)
        },
        onclose: () => {
          observer.complete()
        }
      })
    }),
    close: () => {
      controller.abort()
    }
  }
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
  subscribeCheckIn,
  findWithRoom,
  filter
}

export default meetingTicketService
