import httpService from './httpServices'
import authService from './authService'
import { SETTING_GROUP } from '~/constants/api.ts'

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING_GROUP.BASE_PATH)
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING_GROUP.BASE_PATH + `/${id}`)
}

const settingGroupService = {
  findAll,
  findById
}

export default settingGroupService
