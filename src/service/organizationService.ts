import httpService from './httpServices'
import authService from './authService'
import { ORGANIZATION } from '~/constants/api.ts'

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

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ORGANIZATION.BASE_PATH)
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ORGANIZATION.BASE_PATH + `/${id}`)
}

const insert = (payload: CreateOrganizationInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ORGANIZATION.BASE_PATH, payload)
}

const update = (id: string, payload: UpdateOrganizationInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(ORGANIZATION.BASE_PATH + `/${id}`, payload)
}

const remove = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(ORGANIZATION.BASE_PATH + `/${id}`)
}

const filter = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ORGANIZATION.FILTER, payload)
}

const getMyOrganization = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ORGANIZATION.MY_ORGANIZATION)
}

const updateMyOrganization = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ORGANIZATION.MY_ORGANIZATION, payload)
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
