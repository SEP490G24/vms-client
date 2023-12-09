import httpService from './httpServices'
import authService from './authService'
import { ROOM } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateRoomInfo {
  name: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  taxCode: string;
  description: string;
}

export interface UpdateRoomInfo {
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

export interface RoomFilterPayload {
  names?: string[];
  usernames?: string[];
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  createBy?: string;
  lastUpdatedBy?: string
  enable?: string
  keyword?: string
  siteId?: string[]
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(ROOM.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(ROOM.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateRoomInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(ROOM.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateRoomInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(ROOM.BASE_PATH + `/${id}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(ROOM.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: RoomFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(ROOM.FILTER, payload, {
    params: {
      isPageable,
      ...pageableRequest

    }
  })
  return httpService.handleResponseStatus(response)
}

const getRoomProfile = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(ROOM.MY_ROOM)
  return httpService.handleResponseStatus(response)
}

const updateRoomProfile = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(ROOM.MY_ROOM, payload)
  return httpService.handleResponseStatus(response)
}

const roomService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  getRoomProfile,
  updateRoomProfile
}

export default roomService
