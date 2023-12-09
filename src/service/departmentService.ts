import httpService from './httpServices'
import { DEPARTMENT } from '~/constants'
import { PageableRequest } from '~/interface'
import authService from './authService'

export interface CreateDepartmentInfo {
  name: string
  code: string
  siteId: string
  description?: string
}

export interface UpdateDepartmentInfo {
  name?: string
  enabled?: boolean
  description?: string
}

export interface DepartmentFilterPayload {
  names?: string[];
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  createBy?: string;
  lastUpdatedBy?: string;
  enable?: string;
  keyword?: string;
  siteIds?: string[];
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(DEPARTMENT.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(DEPARTMENT.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateDepartmentInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEPARTMENT.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateDepartmentInfo) => {

  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.patch(DEPARTMENT.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(DEPARTMENT.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: DepartmentFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEPARTMENT.FILTER, payload, {
    params: {
      isPageable,
      ...pageableRequest
    }
  })
  return httpService.handleResponseStatus(response)
}


const getMyDepartment = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(DEPARTMENT.MY_DEPARTMENT)
  return httpService.handleResponseStatus(response)
}

const updateMyDepartment = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEPARTMENT.MY_DEPARTMENT, payload)
  return httpService.handleResponseStatus(response)
}

const departmentService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  getMyDepartment,
  updateMyDepartment
}

export default departmentService
