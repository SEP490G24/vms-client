import httpService from '~/service/httpServices.ts'
import { ROLE } from '~/constants/api.ts'
import { PermissionDto } from '~/interface/Permission.ts'
import authService from './authService'

interface RoleBasePayload {
  name: string;
  siteId: string;
  description: string;
  attributes?: { [key: string]: string[] };
}

interface CreateRolePayload extends RoleBasePayload {
}
// interface CreateRoleInfo extends RoleBasePayload {
// }

interface UpdateRolePayload extends RoleBasePayload {
  permissionDtos: PermissionDto[];
}

interface UpdateRolePermissionPayload {
  permissionDto: PermissionDto,
  state: boolean,
}

export interface RoleFilterPayload {
  names?: string[];
  usernames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?: string
  enable?: string
  keyword?: string
  provinceId?: string
}

const getAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.get(ROLE.GET_ALL_ROLE)
  return httpService.handleResponseStatus(response)
}

const getById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.get(ROLE.GET_BY_ID_ROLE.replace('{id}', id))
  return httpService.handleResponseStatus(response)
}

const getBySiteId = async (siteIds?: string[]) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.post(ROLE.GET_BY_SITE_ID_ROLE, siteIds)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.post(ROLE.FILTER_ROLE, payload)
  return httpService.handleResponseStatus(response)
}

const create = async (payload: CreateRolePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.post(ROLE.CREATE_ROLE, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (id: string, payload: UpdateRolePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  let response = await httpService.put(ROLE.UPDATE_ROLE.replace('{id}', id), payload)
  return httpService.handleResponseStatus(response)
}

const updatePermission = async (id: string, payload: UpdateRolePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.put(ROLE.UPDATE_PERMISSION_ROLE.replace('{id}', id), payload)
  return httpService.handleResponseStatus(response)
}

const deleteById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.delete(ROLE.DELETE_ROLE.replace('{id}', id))
  return httpService.handleResponseStatus(response)
}

const roleService = {
  getAll,
  getById,
  getBySiteId,
  filter,
  create,
  update,
  updatePermission,
  deleteById
}

export default roleService
