import httpService from './httpServices'
import authService from './authService'
import { CHECKIN } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateCheckInInfo {
  name: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  taxCode: string;
  description: string;
}

export interface UpdateCheckInInfo {
  name?: string;
  phoneNumber?: string;
  province?: string;
  district?: string;
  ward?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  enable?: boolean;
}

export interface CheckInFilterPayload {
  names?: string[];
  keyword?: string;
  startTimeStart?: string;
  startTimeEnd?: string;
  endTimeStart?: string;
  endTimeEnd?: string;
  siteId?: string[]
}

const filter = async (payload: CheckInFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(CHECKIN.FILTER, payload, {
    params: {
      isPageable,
      ...pageableRequest
    }
  })
  return httpService.handleResponseStatus(response)
}

const checkInService = {
  filter,
}

export default checkInService
