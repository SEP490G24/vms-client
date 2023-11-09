import httpService from './httpServices'
import authService from './authService'
import { REASON } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'
import { ReasonType } from '~/interface/Reason.ts'

export interface ReasonInfoPayload {
  code: string;
  name: string;
  type: ReasonType;
  description?: string;
  enable: boolean;
  siteId: string;
  siteName?: string;
}

export interface ReasonFilterPayload {
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  enable?: boolean;
  keyword?: string
  siteId?: string
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(REASON.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(REASON.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const findBySiteId = async (siteId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.get(REASON.GET_BY_SITE_ID.replace('{siteId}', siteId))
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: ReasonInfoPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(REASON.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: ReasonInfoPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(REASON.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(REASON.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: ReasonFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(REASON.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
  return httpService.handleResponseStatus(response)
}

const templateService = {
  findAll,
  findById,
  findBySiteId,
  insert,
  update,
  remove,
  filter
}

export default templateService
