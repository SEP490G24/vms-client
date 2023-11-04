import httpService from '~/service/httpServices.ts'
import { ROLE } from '~/constants/api.ts'
import { RoleDto } from '~/interface/Role.ts'
import authService from './authService'

interface RoleBasePayload {
  name: string;
  siteId: string;
  description: string;
  attributes?: { [key: string]: string[] };
}

interface CreateRolePayload extends RoleBasePayload {
}

interface UpdateRolePayload extends RoleBasePayload {
  roleDtos: RoleDto[];
}

interface UpdateRoleRolePayload {
  roleDto: RoleDto,
  state: boolean,
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

const updateRole = async (id: string, payload: UpdateRoleRolePayload) => {
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
  filter,
  create,
  update,
  updateRole,
  deleteById
}

export default roleService
