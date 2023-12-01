import httpService from './httpServices'
import authService from './authService'
import { REASON } from '~/constants/api.ts'
import { Reason } from '~/constants'

const findAllByType = async (type: Reason) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(REASON.BASE_PATH, { params: { type } })
  return httpService.handleResponseStatus(response)
}

const reasonService = {
  findAllByType
}

export default reasonService
