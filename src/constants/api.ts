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
  MY_ORGANIZATION: `${VITE_API_SERVER_URL}/organization/view-detail`
}

export const DEPARTMENT = {
  BASE_PATH: `${VITE_API_SERVER_URL}/department`,
  FILTER: `${VITE_API_SERVER_URL}/department/filter`,
  MY_DEPARTMENT: `${VITE_API_SERVER_URL}/department/profile`
}

export const SITE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/site`,
  FILTER: `${VITE_API_SERVER_URL}/site/filter`,
  MY_SITE: `${VITE_API_SERVER_URL}/site/view`
}

export const AUDIT_LOG = {
  BASE_PATH: `${VITE_API_SERVER_URL}/audit-log`,
  FILTER: `${VITE_API_SERVER_URL}/audit-log/filter`,
  EXPORT: `${VITE_API_SERVER_URL}/audit-log/export`
}

export const TEMPLATE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/template`,
  FILTER: `${VITE_API_SERVER_URL}/template/filter`,
  MY_TEMPLATE: `${VITE_API_SERVER_URL}/template/profile`
}

export const REASON = {
  BASE_PATH: `${VITE_API_SERVER_URL}/reason`
}

export const ROLE = {
  GET_ALL_ROLE: `${VITE_API_SERVER_URL}/role`,
  GET_BY_ID_ROLE: `${VITE_API_SERVER_URL}/role/{id}`,
  GET_BY_SITE_ID_ROLE: `${VITE_API_SERVER_URL}/role/site`,
  FILTER_ROLE: `${VITE_API_SERVER_URL}/role/filter`,
  CREATE_ROLE: `${VITE_API_SERVER_URL}/role`,
  UPDATE_ROLE: `${VITE_API_SERVER_URL}/role/{code}`,
  UPDATE_PERMISSION_ROLE: `${VITE_API_SERVER_URL}/role/{id}/permission`,
  DELETE_ROLE: `${VITE_API_SERVER_URL}/role/{id}`
}

export const ROOM = {
  BASE_PATH: `${VITE_API_SERVER_URL}/room`,
  FILTER: `${VITE_API_SERVER_URL}/room/filter`,
  MY_ROOM: `${VITE_API_SERVER_URL}/room/profile`
}

export const DEVICE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/device`,
  DEVICE_NOT_USE: `${VITE_API_SERVER_URL}/device/not-use`,
  FILTER: `${VITE_API_SERVER_URL}/device/filter`,
  MY_DEVICE: `${VITE_API_SERVER_URL}/device/profile`
}

export const DASHBOARD = {
  COUNT_TICKETS_BY_PURPOSE_WITH_PIE: `${VITE_API_SERVER_URL}/dashboard/ticket/purpose/pie`,
  COUNT_TICKETS_BY_PURPOSE_BY_WITH_MULTI_LINE: `${VITE_API_SERVER_URL}/dashboard/ticket/purpose/multi-line`,
  COUNT_TICKETS_BY_STATUS: `${VITE_API_SERVER_URL}/dashboard/ticket/status`,
  COUNT_TICKETS_BY_STATUS_WITH_STACKED_COLUMN: `${VITE_API_SERVER_URL}/dashboard/ticket/status/stacked-column`,
  COUNT_TICKETS_PERIOD: `${VITE_API_SERVER_URL}/dashboard/tickets/period`,
  COUNT_VISITS_BY_STATUS: `${VITE_API_SERVER_URL}/dashboard/visits/status`,
  COUNT_VISITS_BY_STATUS_WITH_STACKED_COLUMN: `${VITE_API_SERVER_URL}/dashboard/visits/status/stacked-column`,
}

export const CARD = {
  BASE_PATH: `${VITE_API_SERVER_URL}/ticket/customer/card`, //gán card cho customer
  SCAN: `${VITE_API_SERVER_URL}/card/scan`, //scan card
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
  FIND_ALL_BY_GROUP_ID: `${VITE_API_SERVER_URL}/settingSiteMap/group/{settingGroupId}`,
  FIND_BY_CODE: `${VITE_API_SERVER_URL}/settingSiteMap/get-setting/{code}`
}

export const SETTING = {
  BASE_PATH: `${VITE_API_SERVER_URL}/setting`,
  SET_DEFAULT: `${VITE_API_SERVER_URL}/settingSiteMap/set-default`
}

export const FILE = {
  BASE_PATH: `${VITE_API_SERVER_URL}/file`,
  UPLOAD_IMAGE: `${VITE_API_SERVER_URL}/file/uploadImage`
}

export const TICKET = {
  BASE_PATH: `${VITE_API_SERVER_URL}/ticket`,
  UPDATE: `${VITE_API_SERVER_URL}/ticket/update`,
  DETAIL: `${VITE_API_SERVER_URL}/ticket/view-detail`,
  FIND_BY_QR: `${VITE_API_SERVER_URL}/ticket/check-in/{checkInCode}`,
  FILTER: `${VITE_API_SERVER_URL}/ticket/filter`,
  CANCEL: `${VITE_API_SERVER_URL}/ticket/cancel`,
  CHECK_IN: `${VITE_API_SERVER_URL}/ticket/update-status`,
  SUBSCRIBE_CHECK_IN: `${VITE_API_SERVER_URL}/ticket/subscribe/check-in`,
  FIND_WITH_ROOM: `${VITE_API_SERVER_URL}/ticket/room`,
  BOOKMARK: `${VITE_API_SERVER_URL}/ticket/bookmark`,
}

export const CUSTOMER = {
  BASE_PATH: `${VITE_API_SERVER_URL}/customer`,
  FILTER: `${VITE_API_SERVER_URL}/customer/filter`,
  AVAILABLE: `${VITE_API_SERVER_URL}/customer/available`,
  CHECK: `${VITE_API_SERVER_URL}/customer/check`
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
  EXPORT: `${VITE_API_SERVER_URL}/access-history/export`,
  VIEW_DETAIL: `${VITE_API_SERVER_URL}/ticket/check-in`,
  TABLE_DETAIL: `${VITE_API_SERVER_URL}/ticket/history`
}

export const CHECKIN = {
  FILTER: `${VITE_API_SERVER_URL}/ticket/check-in/filter`,
}
