import httpService from './httpServices'
import { CUSTOMER } from '~/constants'
import { PageableRequest } from '~/interface'
import authService from './authService'

export interface CreateCustomerInfo {
  visitorName: string
  identificationNumber: string
  email: string
  phoneNumber?: string
}

export interface UpdateCustomerInfo {
  visitorName: string
  identificationNumber: string
  email: string
  phoneNumber?: string
  gender?: string
  description?: string
  provinceId?: string
  districtId?: string
  communeId?: string
}

export interface CustomerFilterPayload {
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  createBy?: string;
  siteId?: string;
  keyword?: string;
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(CUSTOMER.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(CUSTOMER.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateCustomerInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(CUSTOMER.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateCustomerInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(CUSTOMER.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(CUSTOMER.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const findByOrganization = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(CUSTOMER.BASE_PATH + `/available`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: CustomerFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(CUSTOMER.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
  return httpService.handleResponseStatus(response)
}

const customerService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  findByOrganization
}

export default customerService
