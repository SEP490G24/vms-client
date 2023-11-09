import { FILE } from '~/constants/api'
import httpService from './httpServices'
import { authService } from '~/service'

const uploadImage = async (formData: FormData) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  const response = await httpService.post(FILE.UPLOAD_IMAGE, formData)
  return httpService.handleResponseStatus(response)
}

const fileService = {
  uploadImage
}

export default fileService
