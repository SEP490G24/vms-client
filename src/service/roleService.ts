import httpService from '~/service/httpServices.ts'
import { ROLE } from '~/constants/api.ts'
import { PermissionDto } from '~/interface/Permission.ts'
import authService from './authService'

interface RoleBasePayload {
  name: string;
  attributes: { [key: string]: string[] };
}

interface CreateRolePayload extends RoleBasePayload {
}

interface UpdateRolePayload extends RoleBasePayload {
  permissionDtos: PermissionDto[];
}

interface UpdateRolePermissionPayload {
  permissionDto: PermissionDto,
  state: boolean,
}

const getAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ROLE.GET_ALL_ROLE)
}

const getById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.get(ROLE.GET_BY_ID_ROLE.replace('{id}', id))
}

const filter = (payload: any) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ROLE.FILTER_ROLE, payload)
}

const create = (payload: CreateRolePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.post(ROLE.CREATE_ROLE, payload)
}

const update = (id: string, payload: UpdateRolePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(ROLE.UPDATE_ROLE.replace('{id}', id), payload)
}

const updatePermission = (id: string, payload: UpdateRolePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.put(ROLE.UPDATE_PERMISSION_ROLE.replace('{id}', id), payload)
}

const deleteById = (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  return httpService.delete(ROLE.DELETE_ROLE.replace('{id}', id))
}

const roleService = {
  getAll,
  getById,
  filter,
  create,
  update,
  updatePermission,
  deleteById
}

export default roleService
