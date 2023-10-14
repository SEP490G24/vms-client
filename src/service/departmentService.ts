import httpService from './httpServices'
import authService from '~/service/authService.ts'
import { DEPARTMENT } from '~/constants'

export interface CreateDepartmentInfo {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  enable: boolean;
}

export interface UpdateDepartmentInfo {
  password?: string;
  phoneNumber?: string;
  email?: string;
  enable?: boolean;
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

const filter = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(DEPARTMENT.FILTER, payload)
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
