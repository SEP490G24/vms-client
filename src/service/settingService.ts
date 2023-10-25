import httpService from './httpServices'
import authService from './authService'
import { SETTING } from '~/constants/api.ts'

export const SITE_ID = '2134d4df-7e2e-4c1a-822a-f2032022a69f'

const findAll = (groupId?: string | number) => {
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
