import httpService from './httpServices'
import authService from './authService'
import { AUDIT_LOG } from '~/constants/api.ts'
import { PageableRequest } from '~/interface'

export interface AuditLogFilterPayload {
  siteId?: string[];
  createdOnStart?: string;
  createdOnEnd?: string;
  createBy?: string;
  lastUpdatedBy?: string;
  keyword?: string;
  auditType?: string;
  tableName?: string;
  siteName?: string
}

const findAll = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(AUDIT_LOG.BASE_PATH)
  return httpService.handleResponseStatus(response)
}
const findAllByOrganization = async () => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.get(AUDIT_LOG.BASE_PATH + `/organization`)
  return httpService.handleResponseStatus(response)
}

const remove = async (id: string) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.delete(AUDIT_LOG.BASE_PATH + `/${id}`)
  return httpService.handleResponseStatus(response)
}

const filter = async (payload: AuditLogFilterPayload, isPageable?: boolean, pageableRequest?: PageableRequest) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(AUDIT_LOG.FILTER, payload, {
    params: {
      isPageable,
      ...pageableRequest
    }
  })
  return httpService.handleResponseStatus(response)
}
const exportAuditLog = async (payload: AuditLogFilterPayload) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(AUDIT_LOG.EXPORT, payload, { responseType: 'blob' })
  return httpService.handleResponseStatus(response)
}

const auditLogService = {
  findAll,
  exportAuditLog,
  remove,
  filter,
  findAllByOrganization
}

export default auditLogService
