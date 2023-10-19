import httpService from './httpServices'
import authService from '~/service/authService.ts'
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
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?: string
  enable?: string
  keyword?: string
}

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ROOM.BASE_PATH)
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ROOM.BASE_PATH + `/${id}`)
}

const insert = (payload: CreateRoomInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ROOM.BASE_PATH, payload)
}

const update = (id: string, payload: UpdateRoomInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(ROOM.BASE_PATH + `/${id}`, payload)
}

const remove = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(ROOM.BASE_PATH + `/${id}`)
}

const filter = (payload: RoomFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ROOM.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
}

const getRoomProfile = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ROOM.MY_ROOM)
}

const updateRoomProfile = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ROOM.MY_ROOM, payload)
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
