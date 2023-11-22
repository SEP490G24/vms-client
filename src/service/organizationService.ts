import httpService from './httpServices'
import authService from './authService'
import { ORGANIZATION } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateOrganizationInfo {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  enable: boolean;
}

export interface UpdateOrganizationInfo {
  password?: string;
  phoneNumber?: string;
  email?: string;
  enable?: boolean;
}

export interface OrganizationFilterPayload {
  keyword?:string;
  password?: string;
  phoneNumber?: string;
  email?: string;
  enable?: boolean;
  createdOnStart?: string;
  createdOnEnd?: string;
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(ORGANIZATION.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(ORGANIZATION.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateOrganizationInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(ORGANIZATION.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateOrganizationInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.patch(ORGANIZATION.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(ORGANIZATION.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: any, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.post(ORGANIZATION.FILTER, payload,{
    params: {
      isPageable,
      ... pageableRequest
    }
  })
  return httpService.handleResponseStatus(response)
}

const getMyOrganization = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.get(ORGANIZATION.MY_ORGANIZATION)
  return httpService.handleResponseStatus(response)
}

const updateMyOrganization = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.post(ORGANIZATION.MY_ORGANIZATION, payload)
  return httpService.handleResponseStatus(response)
}

const organizationService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  getMyOrganization,
  updateMyOrganization
}

export default organizationService
