import Keycloak, { KeycloakInitOptions } from 'keycloak-js'
import * as _ from 'lodash'

const keycloak = new Keycloak(window.__RUNTIME_CONFIG__.VITE_BASE_PATH + '/keycloak.json')

const initOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  flow: 'implicit',
  pkceMethod: 'S256'
}

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: any) => {
  // init event token expired => must login again
  keycloak.onTokenExpired = async () => {
    console.log('Token expired')
    await doLogout()
  }
  keycloak.init(initOptions)
    .then((authenticated) => {
      if (!authenticated) {
        console.log('user is not authenticated..!')
      }
      onAuthenticatedCallback()
    })
    .catch(console.error)
}

const doLogin = keycloak.login

const doLogout = async () => {
  return keycloak.logout()
}
export const getUserRoles = () => {
  let json = localStorage.getItem('user_roles')
  let roles = json ? JSON.parse(json) : []

  if (roles.length === 0) {
    roles = extractRoles(keycloak.tokenParsed)
    localStorage.setItem('user_roles', JSON.stringify(roles))
  }

  return roles
}

const getToken = () => keycloak.token

const getRefreshToken = () => keycloak.refreshToken

const getTokenParsed = () => keycloak.tokenParsed

const isLoggedIn = () => !!keycloak.token

const updateToken = (successCallback: any) =>
  keycloak.updateToken(5)
    .then(successCallback)
    .catch(doLogin)

const getUserInfo = () => {
  let tokenParsed = keycloak.tokenParsed
  return {
    username: tokenParsed?.preferred_username,
    fullName: tokenParsed?.given_name + ' ' + tokenParsed?.family_name,
    email: tokenParsed?.email
  }
}

const extractRoles = (tokenParsed: any) => {
  let roles: string[] = []
  const resource_access = tokenParsed?.resource_access
  if (resource_access) {
    for (const resource in resource_access) {
      roles = roles.concat(resource_access[resource].roles)
    }
  }
  return roles
}

const hasRole = (roles: any) => {
  const userRoles = getUserRoles()
  return roles.some((role: any) => _.includes(userRoles, role))
}



const authService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getRefreshToken,
  getTokenParsed,
  updateToken,
  getUserInfo,
  hasRole
}

export default authService
