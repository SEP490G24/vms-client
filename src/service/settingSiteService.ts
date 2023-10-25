import httpService from './httpServices'
import authService from './authService'
import { SETTING_SITE } from '~/constants/api.ts'


interface SettingValuePayload {
  siteId: string;
  settingId: number;
  value: string;
}

const findAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING_SITE.BASE_PATH)
}

const findById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING_SITE.BASE_PATH + `/${id}`)
}

const findAllBySiteIdAndGroupId = (siteId: string, settingGroupId: number) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(SETTING_SITE.FIND_ALL_BY_SITE_ID_AND_GROUP_ID.replace('{siteId}', siteId)
    .replace('{settingGroupId}', settingGroupId.toString()))
}

const update = (payload: SettingValuePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(SETTING_SITE.BASE_PATH, payload)
}

const settingSiteService = {
  findAll,
  findById,
  findAllBySiteIdAndGroupId,
  update
}

export default settingSiteService
