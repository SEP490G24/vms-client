import httpService from './httpServices'
import authService from '~/service/authService.ts'
import { USER } from '~/constants/api.ts'

export const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(USER.BASE_PATH)
}

export const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(USER.BASE_PATH + `/${id}`)
}

export const insert = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.BASE_PATH, payload)
}

export const update = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(USER.BASE_PATH, payload)
}

export const remove = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(USER.BASE_PATH + `/${id}`)
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
