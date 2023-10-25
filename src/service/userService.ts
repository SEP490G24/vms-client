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
  createdOnStart?: Date;
  createdOnEnd?: Date;
  state?: string;
  keyword?: string
}

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(USER.BASE_PATH)
}

const findById = (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(USER.BASE_PATH + `/${username}`)
}

const insert = (payload: CreateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.BASE_PATH, payload)
}

const update = (username: string, payload: UpdateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(USER.BASE_PATH + `/${username}`, payload)
}

const remove = (username: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(USER.BASE_PATH + `/${username}`)
}

const filter = (payload: UserFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.FILTER, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
}

const getUserProfile = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(USER.MY_USER_PROFILE)
}

const updateUserProfile = (payload: UpdateUserInfo) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(USER.MY_USER_PROFILE, payload)
}

const changePassword = (payload: { oldPassword: string, newPassword: string }) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.CHANGE_PASSWORD, payload)
}

const importUser = (formData: FormData) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.IMPORT, formData)
}

const exportUser = (payload: UserFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(USER.EXPORT, payload, {responseType: 'blob'})
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
