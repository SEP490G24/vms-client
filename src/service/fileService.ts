import { FILE } from '~/constants/api'
import httpService from './httpServices'
import { authService } from '~/service'
import { RcFile } from 'antd/es/upload'

const uploadImage = async (formData: FormData) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(FILE.UPLOAD_IMAGE, formData)
  return httpService.handleResponseStatus(response)
}

const uploadRcFile = async (rcFile: RcFile) => {
  const formData = new FormData()
  formData.append('file', rcFile as RcFile)
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(FILE.UPLOAD_IMAGE, formData)
  return httpService.handleResponseStatus(response)
}

const fileService = {
  uploadImage,
  uploadRcFile
}

export default fileService
