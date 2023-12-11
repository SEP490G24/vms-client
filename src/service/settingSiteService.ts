import httpService from './httpServices'
import authService from './authService'
import { SETTING_SITE } from '~/constants/api.ts'


interface SettingValuePayload {
  siteId?: string;
  settingId: number;
  value: string;
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING_SITE.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING_SITE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const findAllByGroupId = async (settingGroupId: number, siteId?: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING_SITE.FIND_ALL_BY_GROUP_ID
    .replace('{settingGroupId}', settingGroupId.toString()), { params: { siteId } })
  return httpService.handleResponseStatus(response)
}

const findAllByGroupCode = async (code: string, siteId?: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(SETTING_SITE.FIND_BY_CODE
    .replace('{code}', code), { params: { siteId } })
  return httpService.handleResponseStatus(response)
}

const update = async (payload: SettingValuePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(SETTING_SITE.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const settingSiteService = {
  findAll,
  findById,
  findAllByGroupId,
  findAllByGroupCode,
  update
}

export default settingSiteService
