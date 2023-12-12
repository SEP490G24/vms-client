import httpService from './httpServices'
import authService from './authService'
import { TICKET } from '~/constants/api.ts'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { EventSourceObserver, PageableRequest } from '~/interface'
import { StatusTicketCustomer } from '~/constants'
import { CreateCustomerInfo } from '~/service/customerService.ts'
import { Observable } from 'rxjs'

export interface CreateMeetingInfo {
  name: string;
  startTime: Date;
  endTime: Date;
  roomId?: string
  siteId?: string
  newCustomers: CreateCustomerInfo[];
  oldCustomers: string[];
  draft?: boolean
  description?: string
  purpose: string;
  purposeNote?: string;
}

export interface UpdateMeetingInfo {
  id?: string;
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

export interface MeetingBookMark{
  ticketId?: string;
  bookmark?: boolean
}

export interface MeetingFilterPayload {
  usernames?: string[];
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  createBy?: string;
  siteId?: string[];
  keyword?: string;
  purpose?: string;
  status?: string;
  startTimeStart?: string;
  endTimeStart?: string;
  startTimeEnd?: string;
  endTimeEnd?: string;
  auditType?: string
  createdBy?: string;
  bookmark?: boolean
}

export interface CancelTicketPayload {
  reasonId: number;
  reasonNote?: string;
  ticketId: string;
}

export interface CheckInPayload {
  ticketId: string;
  customerId: string;
  checkInCode: string;
  status: StatusTicketCustomer;
  reasonId?: number;
  reasonNote?: string;
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(TICKET.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(TICKET.DETAIL + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const findByQRCode = async (checkInCode: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(TICKET.FIND_BY_QR.replace('{checkInCode}', checkInCode))
  return httpService.handleResponseStatus(response)
}

const update = async (payload: UpdateMeetingInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(TICKET.UPDATE, payload)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateMeetingInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(TICKET.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(TICKET.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const cancel = async (payload: CancelTicketPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
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
            observer.next(message)
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
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(TICKET.CHECK_IN, payload)
  return httpService.handleResponseStatus(response)
}

const findWithRoom = async (payload: MeetingFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(TICKET.FIND_WITH_ROOM, payload)
  return httpService.handleResponseStatus(response)
}

const bookmark = async (payload: MeetingBookMark) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(TICKET.BOOKMARK, payload)
  return httpService.handleResponseStatus(response)
}



const filter = async (payload: MeetingFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
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
  filter,
  bookmark
}

export default meetingTicketService
