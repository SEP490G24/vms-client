import httpService from './httpServices'
import authService from './authService'
import { USER } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

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

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(USER.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(USER.BASE_PATH + `/${username}`)
  return httpService.handleResponseStatus(response)
}

const insert = async (payload: CreateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(USER.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (userName: string | undefined, payload: UpdateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(USER.BASE_PATH + `/${userName}`, payload)
  return httpService.handleResponseStatus(response)
}

const remove = async (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(USER.BASE_PATH + `/${username}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: UserFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
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
  const response = await httpService.get(USER.MY_USER_PROFILE)
  return httpService.handleResponseStatus(response)
}

const updateUserProfile = async (payload: UpdateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(USER.MY_USER_PROFILE, payload)
  return httpService.handleResponseStatus(response)
}

const changePassword = async (payload: { oldPassword: string, newPassword: string }) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(USER.CHANGE_PASSWORD, payload)
  return httpService.handleResponseStatus(response)
}

const importUser = async (formData: FormData) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(USER.IMPORT, formData)
  return httpService.handleResponseStatus(response)
}

const exportUser = async (payload: UserFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(USER.EXPORT, payload, { responseType: 'blob' })
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
  exportUser
}

export default userService
