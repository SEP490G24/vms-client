import { KEYCLOAK } from '~/constants/api'
import httpService from './httpServices'
import { authService } from '~/service'

const syncAll = () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  return httpService.get(KEYCLOAK.SYNC_ALL)
}

const syncWithClient = (clientId: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  return httpService.get(KEYCLOAK.SYNC_WITH_CLIENT.replace('{clientId}', clientId))
}


const keycloakService = {
  syncAll,
  syncWithClient
}

export default keycloakService
