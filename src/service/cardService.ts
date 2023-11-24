import httpService from './httpServices'
import authService from './authService'
import { CARD } from '~/constants/api.ts'

export interface CreateCardDto {
  cardId?: string,
  macIp?: string
}


const insert = async (payload: CreateCardDto) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(CARD.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}



const cardService = {
  insert
}

export default cardService
