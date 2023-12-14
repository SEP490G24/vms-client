import httpService from './httpServices'
import authService from './authService'
import { DEVICE } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateDeviceInfo {

}

export interface UpdateDeviceInfo {
}

export interface DeviceFilterPayload {
  keyword?: string;
  createdOnStart?: Date;
  createdOnEnd?: Date
  siteId?: string[]
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEVICE.DEVICE_NOT_USE)
  return httpService.handleResponseStatus(response)
}

const findBySiteId = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEVICE.DEVICE_NOT_USE + `?siteId=${id}`)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(DEVICE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateDeviceInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEVICE.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateDeviceInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(DEVICE.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(DEVICE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: DeviceFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEVICE.FILTER, payload, {
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
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(DEVICE.MY_DEVICE)
  return httpService.handleResponseStatus(response)
}

const updateDeviceProfile = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(DEVICE.MY_DEVICE, payload)
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
  updateDeviceProfile,
  findBySiteId
}

export default deviceService
