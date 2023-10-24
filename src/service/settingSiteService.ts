import httpService from './httpServices'
import authService from '~/service/authService.ts'
import { SETTING_SITE } from '~/constants/api.ts'

interface FindAllParams {
  groupId?: string
  siteId?: string
}

interface SettingValuePayload {
  siteId: string;
  settingId: number;
  value: string;
}

const findAll = (params?: FindAllParams) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING_SITE.BASE_PATH, { params })
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING_SITE.BASE_PATH + `/${id}`)
}

const update = (payload: SettingValuePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(SETTING_SITE.BASE_PATH, payload)
}

const settingSiteService = {
  findAll,
  findById,
  update
}

export default settingSiteService
