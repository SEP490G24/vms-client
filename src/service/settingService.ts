import httpService from './httpServices'
import authService from './authService'
import { SETTING } from '~/constants/api.ts'

export const SITE_ID = '2134d4df-7e2e-4c1a-822a-f2032022a69f'

const findAll = async (groupId?: string | number, siteId?: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING.BASE_PATH, { params: { groupId, siteId } })
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const setDefault = async (siteId?: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(SETTING.SET_DEFAULT, null, { params: { siteId } })
  return httpService.handleResponseStatus(response)
}

const settingService = {
  findAll,
  findById,
  setDefault
}

export default settingService
