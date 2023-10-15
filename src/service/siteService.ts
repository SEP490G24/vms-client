import httpService from './httpServices'
import authService from '~/service/authService.ts'
import { SITE } from '~/constants/api.ts'

export interface CreateSiteInfo {
  name: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  taxCode: string;
  description: string;
}

export interface UpdateSiteInfo {
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

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SITE.BASE_PATH)
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SITE.BASE_PATH + `/${id}`)
}

const insert = (payload: CreateSiteInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(SITE.BASE_PATH, payload)
}

const update = (id: string, payload: UpdateSiteInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(SITE.BASE_PATH + `/${id}`, payload)
}

const remove = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(SITE.BASE_PATH + `/${id}`)
}

const filter = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(SITE.FILTER, payload)
}

const getSiteProfile = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SITE.MY_SITE)
}

const updateSiteProfile = (payload: any) => {
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
  getSiteProfile,
  updateSiteProfile
}

export default siteService
