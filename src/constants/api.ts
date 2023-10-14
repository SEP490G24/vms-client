export const VITE_API_SERVER_URL = window.__RUNTIME_CONFIG__.VITE_API_SERVER_URL

export const AUTH = {}

export const USER = {
  BASE_PATH: `${VITE_API_SERVER_URL}/user`,
  MY_USER_PROFILE: `${VITE_API_SERVER_URL}/user/profile`,
  FILTER: `${VITE_API_SERVER_URL}/user/filter`
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
