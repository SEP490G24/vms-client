export const VITE_API_SERVER_URL = window.__RUNTIME_CONFIG__.VITE_API_SERVER_URL

export const AUTH = {}

export const USER = {
  BASE_PATH: `${VITE_API_SERVER_URL}/user`,
  MY_USER_PROFILE: `${VITE_API_SERVER_URL}/user/profile`,
  FILTER: `${VITE_API_SERVER_URL}/user/filter`,
  CHANGE_PASSWORD: `${VITE_API_SERVER_URL}/user/change-password`,
  IMPORT: `${VITE_API_SERVER_URL}/user/import`,
  EXPORT: `${VITE_API_SERVER_URL}/user/export`
}

export const ORGANIZATION = {
  BASE_PATH: `${VITE_API_SERVER_URL}/organization`,
  FILTER: `${VITE_API_SERVER_URL}/organization/filter`,
  MY_ORGANIZATION: `${VITE_API_SERVER_URL}/organization/profile`
}

export const DEPARTMENT = {
  BASE_PATH: `${VITE_API_SERVER_URL}/department`,
  FILTER: `${VITE_API_SERVER_URL}/department/filter`,
  MY_DEPARTMENT: `${VITE_API_SERVER_URL}/department/profile`
}

export const SITE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/site`,
  FILTER: `${VITE_API_SERVER_URL}/site/filter`,
  MY_SITE: `${VITE_API_SERVER_URL}/site/profile`
}

export const ROLE = {
  GET_ALL_ROLE: `${VITE_API_SERVER_URL}/role`,
  GET_BY_ID_ROLE: `${VITE_API_SERVER_URL}/role/{id}`,
  FILTER_ROLE: `${VITE_API_SERVER_URL}/role/filter`,
  CREATE_ROLE: `${VITE_API_SERVER_URL}/role`,
  UPDATE_ROLE: `${VITE_API_SERVER_URL}/role/{id}`,
  UPDATE_PERMISSION_ROLE: `${VITE_API_SERVER_URL}/role/{id}/permission`,
  DELETE_ROLE: `${VITE_API_SERVER_URL}/role/{id}`
}

export const ROOM = {
  BASE_PATH: `${VITE_API_SERVER_URL}/room`,
  FILTER: `${VITE_API_SERVER_URL}/room/filter`,
  MY_ROOM: `${VITE_API_SERVER_URL}/room/profile`
}

export const MODULE_PERMISSION = {
  GET_ALL_MODULE: `${VITE_API_SERVER_URL}/module`,
  GET_ALL_BY_MODULE_ID: `${VITE_API_SERVER_URL}/module/{mId}`,
  GET_BY_ID_AND_MODULE_ID: `${VITE_API_SERVER_URL}/module/{mId}/permission/{pId}`,
  FILTER_PERMISSION: `${VITE_API_SERVER_URL}/module/filter`,
  CREATE_PERMISSION: `${VITE_API_SERVER_URL}/module/{mId}/permission`,
  UPDATE_PERMISSION: `${VITE_API_SERVER_URL}/module/{mId}/permission/{pId}`,
  UPDATE_ATTRIBUTE_PERMISSION: `${VITE_API_SERVER_URL}/module/{mId}/permission/attribute`,
  DELETE_PERMISSION: `${VITE_API_SERVER_URL}/module/{mId}/permission/{pId}`
}

export const KEYCLOAK = {
  SYNC_ALL: `${VITE_API_SERVER_URL}/keycloak/sync`,
  SYNC_WITH_CLIENT: `${VITE_API_SERVER_URL}/keycloak/sync/{clientId}`,
}