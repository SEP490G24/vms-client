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
  MY_ORGANIZATION: `${VITE_API_SERVER_URL}/organization/9b679ece-69ed-4098-a32c-5a7cd024b27a`
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

export const TEMPLATE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/template`,
  FILTER: `${VITE_API_SERVER_URL}/template/filter`,
  MY_TEMPLATE: `${VITE_API_SERVER_URL}/template/profile`
}

export const REASON = {
  BASE_PATH: `${VITE_API_SERVER_URL}/reason`,
  FILTER: `${VITE_API_SERVER_URL}/reason/filter`,
  GET_BY_SITE_ID: `${VITE_API_SERVER_URL}/reason/site/{siteId}`,
}

export const ROLE = {
  GET_ALL_ROLE: `${VITE_API_SERVER_URL}/role`,
  GET_BY_ID_ROLE: `${VITE_API_SERVER_URL}/role/{id}`,
  GET_BY_SITE_ID_ROLE: `${VITE_API_SERVER_URL}/role/site`,
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

export const SETTING_GROUP = {
  BASE_PATH: `${VITE_API_SERVER_URL}/settingGroup`
}

export const SETTING_SITE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/settingSiteMap`,
  FIND_ALL_BY_GROUP_ID: `${VITE_API_SERVER_URL}/settingSiteMap/group/{settingGroupId}`
}

export const SETTING = {
  BASE_PATH: `${VITE_API_SERVER_URL}/setting`
}

export const FILE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/file`,
  UPLOAD_IMAGE: `${VITE_API_SERVER_URL}/file/uploadImage`
}

export const TICKET = {
  BASE_PATH: `${VITE_API_SERVER_URL}/ticket`,
  FIND_BY_QR: `${VITE_API_SERVER_URL}/ticket/check-in/{checkInCode}`,
  FILTER: `${VITE_API_SERVER_URL}/ticket/filter`,
  CANCEL: `${VITE_API_SERVER_URL}/ticket/cancel`,
  CHECK_IN: `${VITE_API_SERVER_URL}/ticket/check-in`,
  FIND_WITH_ROOM: `${VITE_API_SERVER_URL}/ticket/room`,
}

export const CUSTOMER = {
  BASE_PATH: `${VITE_API_SERVER_URL}/customer`,
  FILTER: `${VITE_API_SERVER_URL}/customer/filter`
}

export const KEYCLOAK = {
  SYNC_ALL: `${VITE_API_SERVER_URL}/keycloak/sync`,
  SYNC_WITH_CLIENT: `${VITE_API_SERVER_URL}/keycloak/sync/{clientId}`
}

export const LOCATION = {
  DISTRICT: `${VITE_API_SERVER_URL}/location/district`,
  PROVINCE: `${VITE_API_SERVER_URL}/location/province`,
  COMMUNE: `${VITE_API_SERVER_URL}/location/commune`,
  GET_ALL_COMMUNE_BY_PROVINCE_ID: `${VITE_API_SERVER_URL}/location/district/province/{provinceId}`,
  GET_ALL_COMMUNE_BY_DISTRICT_ID: `${VITE_API_SERVER_URL}/location/commune/district/{districtId}`
}

export const HISTORY = {
  FILTER: `${VITE_API_SERVER_URL}/access-history`,
}

export const CHECKIN = {
  FILTER: `${VITE_API_SERVER_URL}/ticket/customer/filter`,
}
