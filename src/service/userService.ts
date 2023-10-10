import httpService from './httpServices'
import authService from '~/service/authService.ts'
import { USER } from '~/constants/api.ts'

export interface CreateUserInfo {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  enable: boolean;
}

export interface UpdateUserInfo {
  password?: string;
  phoneNumber?: string;
  email?: string;
  enable?: boolean;
}

export const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(USER.BASE_PATH)
}

export const findById = (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(USER.BASE_PATH + `/${username}`)
}

export const insert = (payload: CreateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.BASE_PATH, payload)
}

export const update = (username: string,payload: UpdateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(USER.BASE_PATH + `/${username}`, payload)
}

export const remove = (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(USER.BASE_PATH + `/${username}`)
}

export const filter = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.FILTER, payload)
}

const userService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter
}

export default userService
