import httpService from './httpServices'
import { CUSTOMER, Gender } from '~/constants'
import { PageableRequest } from '~/interface'
import authService from './authService'

export interface CreateCustomerInfo {
  visitorName: string
  identificationNumber: string
  email: string
  phoneNumber?: string
  gender?: Gender
  description?: string
}

export interface UpdateCustomerInfo {
  visitorName: string
  identificationNumber: string
  email: string
  phoneNumber?: string
  gender?: string
  description?: string
}

export interface CustomerFilterPayload {
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  createBy?: string;
  siteId?: string;
  keyword?: string;
}

export interface CustomerAvailablePayload {
  startTime?: string | Date;
  endTime?: string | Date;
}

export enum CustomerCheckType {
  EMAIL = 'EMAIL',
  PHONE_NUMBER = 'PHONE_NUMBER',
  IDENTIFICATION_NUMBER = 'IDENTIFICATION_NUMBER'
}

export interface CustomerCheckExist {
  value?: string
  type: CustomerCheckType
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(CUSTOMER.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(CUSTOMER.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateCustomerInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(CUSTOMER.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateCustomerInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(CUSTOMER.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(CUSTOMER.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const findCustomerAvailable = async (payload: CustomerAvailablePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(CUSTOMER.AVAILABLE, payload)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: CustomerFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(CUSTOMER.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
  return httpService.handleResponseStatus(response)
}

const checkCustomerExist = async (payload: CustomerCheckExist) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(CUSTOMER.CHECK, payload)
  return httpService.handleResponseStatus(response)
}

const customerService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  findCustomerAvailable,
  checkCustomerExist
}

export default customerService
