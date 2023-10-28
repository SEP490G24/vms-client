import httpService from '~/service/httpServices.ts'
import authService from '~/service/authService.ts'
import { LOCATION } from '~/constants'

const findAllProvince = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(LOCATION.PROVINCE)
}

const findAllDistrict = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(LOCATION.DISTRICT)
}

const findAllDistrictByProvinceId = (provinceId: number) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(LOCATION.GET_ALL_COMMUNE_BY_PROVINCE_ID.replace('{provinceId}', provinceId.toString()))
}

const findAllCommune = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(LOCATION.COMMUNE)
}

const findAllCommuneByDistrictId = (districtId: number) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(LOCATION.GET_ALL_COMMUNE_BY_DISTRICT_ID.replace('{districtId}', districtId.toString()))
}

const locationService = {
  findAllProvince,
  findAllDistrict,
  findAllDistrictByProvinceId,
  findAllCommune,
  findAllCommuneByDistrictId
}

export default locationService
