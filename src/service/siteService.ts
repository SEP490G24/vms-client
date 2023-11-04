import httpService from './httpServices'
import authService from './authService'
import { SITE } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateRoleInfo {
  name: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  taxCode: string;
  description: string;
}

export interface UpdateRoleInfo {
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

export interface RoleFilterPayload {
  names?: string[];
  usernames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?: string
  enable?: string
  keyword?: string
  provinceId?: string
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(SITE.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(SITE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateRoleInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(SITE.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateRoleInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(SITE.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(SITE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: RoleFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(SITE.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
  return httpService.handleResponseStatus(response)
}

const getRoleProfile = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(SITE.MY_SITE)
  return httpService.handleResponseStatus(response)
}

const updateRoleProfile = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(SITE.MY_SITE, payload)
  return httpService.handleResponseStatus(response)
}

const siteService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  getRoleProfile,
  updateRoleProfile
}

export default siteService
