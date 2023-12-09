import httpService from './httpServices'
import authService from './authService'
import { TEMPLATE } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateTemplateInfo {
  templatename: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  enable: boolean;

}

export interface UpdateTemplateInfo {
  password?: string;
  phoneNumber?: string;
  email?: string;
  enable?: boolean;
}

export interface TemplateFilterPayload {
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  enable?: boolean;
  keyword?: string
  siteId?: string[]
  type?: string
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(TEMPLATE.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (templatename: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(TEMPLATE.BASE_PATH + `/${templatename}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateTemplateInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(TEMPLATE.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (templatename: string, payload: UpdateTemplateInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(TEMPLATE.BASE_PATH + `/${templatename}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (templatename: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(TEMPLATE.BASE_PATH + `/${templatename}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: TemplateFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(TEMPLATE.FILTER, payload, {
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
  insert,
  update,
  remove,
  filter
}

export default templateService
