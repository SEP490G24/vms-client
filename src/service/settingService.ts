import httpService from './httpServices'
import authService from '~/service/authService.ts'
import { SETTING } from '~/constants/api.ts'

const findAll = (groupId?: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING.BASE_PATH, { params: { groupId } })
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING.BASE_PATH + `/${id}`)
}

const settingService = {
  findAll,
  findById
}

export default settingService
