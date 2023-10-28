import httpService from './httpServices'
import authService from './authService'
import { ROOM } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateDeviceInfo {
  name: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  taxCode: string;
  description: string;
}

export interface UpdateDeviceInfo {
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

export interface DeviceFilterPayload {
  names?: string[];
  usernames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?: string
  enable?: string
  keyword?: string
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(ROOM.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(ROOM.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateDeviceInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(ROOM.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateDeviceInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(ROOM.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(ROOM.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: DeviceFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(ROOM.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
  return httpService.handleResponseStatus(response)
}

const getDeviceProfile = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(ROOM.MY_ROOM)
  return httpService.handleResponseStatus(response)
}

const updateDeviceProfile = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(ROOM.MY_ROOM, payload)
  return httpService.handleResponseStatus(response)
}

const deviceService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  getDeviceProfile,
  updateDeviceProfile
}

export default deviceService
