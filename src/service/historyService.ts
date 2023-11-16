import httpService from './httpServices'
import authService from './authService'
import { HISTORY } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface CreateHistoryInfo {
  name: string;
  phoneNumber: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  taxCode: string;
  description: string;
}

export interface UpdateHistoryInfo {
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

export interface HistoryFilterPayload {
  names?: string[];
  createdOnStart?: string;
  createdOnEnd?: string;
  createBy?: string;
  lastUpdatedBy?: string;
  status?: string;
  keyword?: string;
  provinceId?: string;
  districtId?: string;
  communeId?: string;
  formCheckInTime?: string;
  toCheckInTime?: string;
  formCheckOutTime?: string;
  toCheckOutTime?: string;
  site?: string;
}

const filter = async (payload: HistoryFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(HISTORY.FILTER, payload, {
    params: {
      isPageable,
      ...pageableRequest
    }
  })
  return httpService.handleResponseStatus(response)
}

const historyService = {
  filter,
}

export default historyService
