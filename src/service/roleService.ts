import httpService from '~/service/httpServices.ts'
import { ROLE } from '~/constants/api.ts'
import { PermissionDto } from '~/interface/Permission.ts'
import authService from './authService'
import { PageableRequest } from '~/interface'

interface RoleBasePayload {
  code: string
  description: string;
  attributes?: { [key: string]: string[] };
}

export interface RoleFilterPayload {
  code?: string;
  description?: string;
  attributes?: { [key: string]: string[] };
}

export interface CreateRolePayload extends RoleBasePayload {
}

export interface UpdateRolePayload extends RoleBasePayload {
}

interface UpdateRolePermissionPayload {
  permissionDto: PermissionDto,
  state: boolean,
}


const getAll = async (siteId?: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.get(ROLE.GET_ALL_ROLE, { params: { siteId } })
  return httpService.handleResponseStatus(response)
}

const getById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.get(ROLE.GET_BY_ID_ROLE.replace('{id}', id))
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: RoleFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(ROLE.FILTER_ROLE, payload, {
    params: {
      isPageable,
      size: pageableRequest?.size,
      page: pageableRequest?.page
    }
  })
  return httpService.handleResponseStatus(response)
}

const create = async (payload: CreateRolePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.post(ROLE.CREATE_ROLE, payload)
  return httpService.handleResponseStatus(response)
}

const update = async (code: string, payload: UpdateRolePayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  let response = await httpService.put(ROLE.UPDATE_ROLE.replace('{code}', code), payload)
  return httpService.handleResponseStatus(response)
}

const updatePermission = async (id: string, payload: UpdateRolePermissionPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.put(ROLE.UPDATE_PERMISSION_ROLE.replace('{id}', id), payload)
  return httpService.handleResponseStatus(response)
}

const deleteById = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(ROLE.DELETE_ROLE.replace('{id}', id))
  return httpService.handleResponseStatus(response)
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
