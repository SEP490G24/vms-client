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
  code?: string
  siteId?: string
  description?: string
}

export interface DepartmentFilterPayload {
  names?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?: string;
  enable?: string;
  keyword?: string;
  siteId?: string;
}

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(DEPARTMENT.BASE_PATH)
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(DEPARTMENT.BASE_PATH + `/${id}`)
}

const insert = (payload: CreateDepartmentInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(DEPARTMENT.BASE_PATH, payload)
}

const update = (id: string, payload: UpdateDepartmentInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(DEPARTMENT.BASE_PATH + `/${id}`, payload)
}

const remove = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(DEPARTMENT.BASE_PATH + `/${id}`)
}

const filter = (payload: DepartmentFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(DEPARTMENT.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
}


const getMyDepartment = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(DEPARTMENT.MY_DEPARTMENT)
}

const updateMyDepartment = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(DEPARTMENT.MY_DEPARTMENT, payload)
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
