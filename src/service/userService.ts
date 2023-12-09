import httpService from './httpServices'
import authService from './authService'
import { USER } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'
import { RcFile } from 'antd/es/upload'

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

export interface UserFilterPayload {
  roles?: string[];
  usernames?: string[];
  createdOnStart?: string | Date;
  createdOnEnd?: string | Date;
  enable?: string;
  keyword?: string
  departmentId?: string[]
  siteId?: string[]
  role?: string
}

export interface ChangePasswordPayload {
  oldPassword: string,
  newPassword: string
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(USER.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(USER.BASE_PATH + `/${username}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(USER.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (username: string | undefined, payload: UpdateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(USER.BASE_PATH + `/${username}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(USER.BASE_PATH + `/${username}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: UserFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(USER.FILTER, payload, {
    params: {
      isPageable,
      ...pageableRequest
    }
  })
  return httpService.handleResponseStatus(response)
}

const getUserProfile = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(USER.MY_USER_PROFILE)
  return httpService.handleResponseStatus(response)
}

const updateUserProfile = async (payload: UpdateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(USER.MY_USER_PROFILE, payload)
  return httpService.handleResponseStatus(response)
}

const changePassword = async (payload: ChangePasswordPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(USER.CHANGE_PASSWORD, payload)
  return httpService.handleResponseStatus(response)
}

const importUser = async (rcFile: RcFile, siteId?: string) => {
  const formData = new FormData()
  formData.append('file', rcFile as RcFile)
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(USER.IMPORT, formData, { params: siteId, responseType: 'blob' })
  return httpService.handleResponseStatus(response)
}

const exportUser = async (payload: UserFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(USER.EXPORT, payload, { responseType: 'blob' })
  return httpService.handleResponseStatus(response)
}

const exportSample = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(USER.IMPORT, { responseType: 'blob' })
  return httpService.handleResponseStatus(response)
}

const userService = {
  findAll,
  findById,
  insert,
  update,
  remove,
  filter,
  getUserProfile,
  updateUserProfile,
  changePassword,
  importUser,
  exportUser,
  exportSample
}

export default userService
