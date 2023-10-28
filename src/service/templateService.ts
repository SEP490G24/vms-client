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
  roles?: string[];
  templatenames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  state?: string;
  keyword?: string
}

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(TEMPLATE.BASE_PATH)
}

const findById = (templatename: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(TEMPLATE.BASE_PATH + `/${templatename}`)
}

const insert = (payload: CreateTemplateInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(TEMPLATE.BASE_PATH, payload)
}

const update = (templatename: string, payload: UpdateTemplateInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(TEMPLATE.BASE_PATH + `/${templatename}`, payload)
}

const remove = (templatename: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(TEMPLATE.BASE_PATH + `/${templatename}`)
}

const filter = (payload: TemplateFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(TEMPLATE.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
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
