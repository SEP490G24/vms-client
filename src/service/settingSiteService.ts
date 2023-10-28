import httpService from './httpServices'
import authService from './authService'
import { SETTING_SITE } from '~/constants/api.ts'


interface SettingValuePayload {
  siteId: string;
  settingId: number;
  value: string;
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(SETTING_SITE.BASE_PATH)
  return httpService.handleResponseStatus(response)
}

const findById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(SETTING_SITE.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const findAllBySiteIdAndGroupId = async (siteId: string, settingGroupId: number) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.get(SETTING_SITE.FIND_ALL_BY_SITE_ID_AND_GROUP_ID.replace('{siteId}', siteId)
    .replace('{settingGroupId}', settingGroupId.toString()))
  return httpService.handleResponseStatus(response)
}

const update = async (payload: SettingValuePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(SETTING_SITE.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}

const settingSiteService = {
  findAll,
  findById,
  findAllBySiteIdAndGroupId,
  update
}

export default settingSiteService
