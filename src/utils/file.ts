import { UploadFile } from 'antd'

export function baseUploadTemplate(url?: string, name?: string): UploadFile {


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

export function exportFile(blobParts: any, fileName: string) {
  const url = window.URL.createObjectURL(new Blob([blobParts]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

