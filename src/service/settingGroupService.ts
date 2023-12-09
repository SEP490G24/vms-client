import httpService from './httpServices'
import authService from './authService'
import { SETTING_GROUP } from '~/constants/api.ts'

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING_GROUP.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING_GROUP.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const settingGroupService = {
  findAll,
  findById
}

export default settingGroupService
