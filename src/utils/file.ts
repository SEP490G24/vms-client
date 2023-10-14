import { UploadFile } from 'antd'

export function baseUploadTemplate(url: string, name?: string): UploadFile {
  return {
    uid: '-1',
    name: name ?? 'Image Preview',
    status: 'done',
    url: url
  }
}

export function toBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}
