import httpService from '~/service/httpServices.ts'
import { MODULE_PERMISSION } from '~/constants/api.ts'
import { PermissionDto } from '~/interface/Permission.ts'
import authService from './authService'

interface PermissionBasePayload {
  name: string;
  attributes: { [key: string]: string[] };
}

interface CreatePermissionPayload extends PermissionBasePayload {
}

interface UpdatePermissionPayload extends PermissionBasePayload {
}

interface PermissionFilterPayload {
}

interface UpdateAttributePermissionPayload {
  attributes: { [key: string]: string[] };
  permissionDtos: PermissionDto[];
}

const getAllModule = async (fetchPermission: boolean) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.get(MODULE_PERMISSION.GET_ALL_MODULE + '?fetchPermission=' + fetchPermission)
  return httpService.handleResponseStatus(response)
}

const getAllByModuleId = async (mId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.get(MODULE_PERMISSION.GET_ALL_BY_MODULE_ID.replace('{mId}', mId))
  return httpService.handleResponseStatus(response)
}

const getByIdAndModuleId = async (mId: string, pId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.get(MODULE_PERMISSION.GET_BY_ID_AND_MODULE_ID.replace('{mId}', mId).replace('{pId}', pId))
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: PermissionFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.post(MODULE_PERMISSION.FILTER_PERMISSION, payload)
  return httpService.handleResponseStatus(response)
}

const create = async (mId: string, payload: CreatePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.post(MODULE_PERMISSION.CREATE_PERMISSION.replace('{mId}', mId), payload)
  return httpService.handleResponseStatus(response)
}

const update = async (mId: string, pId: string, payload: UpdatePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.put(MODULE_PERMISSION.UPDATE_PERMISSION.replace('{mId}', mId).replace('{pId}', pId), payload)
  return httpService.handleResponseStatus(response)
}

const updateAttribute = async (mId: string, payload: UpdateAttributePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.put(MODULE_PERMISSION.UPDATE_ATTRIBUTE_PERMISSION.replace('{mId}', mId), payload)
  return httpService.handleResponseStatus(response)
}

const deleteById = async (mId: string, pId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(MODULE_PERMISSION.DELETE_PERMISSION.replace('{mId}', mId).replace('{pId}', pId))
  return httpService.handleResponseStatus(response)
}

const permissionService = {
  getAllModule,
  getAllByModuleId,
  getByIdAndModuleId,
  filter,
  create,
  update,
  updateAttribute,
  deleteById
}

export default permissionService
