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

const getAllModule = (fetchPermission: boolean) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(MODULE_PERMISSION.GET_ALL_MODULE + '?fetchPermission=' + fetchPermission)
}

const getAllByModuleId = (mId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(MODULE_PERMISSION.GET_ALL_BY_MODULE_ID.replace('{mId}', mId))
}

const getByIdAndModuleId = (mId: string, pId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(MODULE_PERMISSION.GET_BY_ID_AND_MODULE_ID.replace('{mId}', mId).replace('{pId}', pId))
}

const filter = (payload: PermissionFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(MODULE_PERMISSION.FILTER_PERMISSION, payload)
}

const create = (mId: string, payload: CreatePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(MODULE_PERMISSION.CREATE_PERMISSION.replace('{mId}', mId), payload)
}

const update = (mId: string, pId: string, payload: UpdatePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(MODULE_PERMISSION.UPDATE_PERMISSION.replace('{mId}', mId).replace('{pId}', pId), payload)
}

const updateAttribute = (mId: string, payload: UpdateAttributePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(MODULE_PERMISSION.UPDATE_ATTRIBUTE_PERMISSION.replace('{mId}', mId), payload)
}

const deleteById = (mId: string, pId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(MODULE_PERMISSION.DELETE_PERMISSION.replace('{mId}', mId).replace('{pId}', pId))
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
