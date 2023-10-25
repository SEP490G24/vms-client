import httpService from './httpServices'
import authService from './authService'
import { SITE } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateMeetingInfo {
  name: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  taxCode: string;
  description: string;
}

export interface UpdateMeetingInfo {
  name?: string;
  phoneNumber?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  enable?: string;
}

export interface MeetingFilterPayload {
  names?: string[];
  usernames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?: string
  enable?: string
  keyword?: string
}

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SITE.BASE_PATH)
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SITE.BASE_PATH + `/${id}`)
}

const insert = (payload: CreateMeetingInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(SITE.BASE_PATH, payload)
}

const update = (id: string, payload: UpdateMeetingInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(SITE.BASE_PATH + `/${id}`, payload)
}

const remove = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(SITE.BASE_PATH + `/${id}`)
}

const filter = (payload: MeetingFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(SITE.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
}

const getMyMeetings = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SITE.MY_SITE)
}

const createMyMeeting = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(SITE.MY_SITE, payload)
}

const siteService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  getMyMeetings,
  createMyMeeting
}

export default siteService
