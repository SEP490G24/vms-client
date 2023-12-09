import httpService from '~/service/httpServices.ts'
import authService from '~/service/authService.ts'
import { LOCATION } from '~/constants'

const findAllProvince = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(LOCATION.PROVINCE)
  return httpService.handleResponseStatus(response)
}

const findAllDistrict = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(LOCATION.DISTRICT)
  return httpService.handleResponseStatus(response)
}

const findAllDistrictByProvinceId = async (provinceId: number) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(LOCATION.GET_ALL_COMMUNE_BY_PROVINCE_ID.replace('{provinceId}', provinceId.toString()))
  return httpService.handleResponseStatus(response)
}

const findAllCommune = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(LOCATION.COMMUNE)
  return httpService.handleResponseStatus(response)
}

const findAllCommuneByDistrictId = async (districtId: number) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(LOCATION.GET_ALL_COMMUNE_BY_DISTRICT_ID.replace('{districtId}', districtId.toString()))
  return httpService.handleResponseStatus(response)
}

const locationService = {
  findAllProvince,
  findAllDistrict,
  findAllDistrictByProvinceId,
  findAllCommune,
  findAllCommuneByDistrictId
}

export default locationService
