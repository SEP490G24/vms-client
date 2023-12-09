import httpService from './httpServices'
import authService from './authService'
import { SITE } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

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
  enable?: boolean;
}

export interface SiteFilterPayload {
  names?: string[];
  createdOnStart?: string;
  createdOnEnd?: string;
  createBy?: string;
  lastUpdatedBy?: string;
  enable?: string;
  keyword?: string;
  provinceId?: string;
  districtId?: string;
  communeId?: string;
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SITE.BASE_PATH)
  return httpService.handleResponseStatus(response)
}
const findAllByOrganization = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SITE.BASE_PATH + `/organization`)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SITE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const getMySite = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SITE.MY_SITE)
  return httpService.handleResponseStatus(response)
}


const insert = async (payload: CreateSiteInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(SITE.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateSiteInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(SITE.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(SITE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: SiteFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(SITE.FILTER, payload, {
    params: {
      isPageable,
      ...pageableRequest
    }
  })
  return httpService.handleResponseStatus(response)
}

const getSiteProfile = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SITE.MY_SITE)
  return httpService.handleResponseStatus(response)
}

const updateSiteProfile = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
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
  getSiteProfile,
  updateSiteProfile,
  findAllByOrganization,
  getMySite
}

export default siteService
