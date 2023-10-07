import { useState, useEffect } from 'react'
import axios from 'axios'
import { AxiosMethod } from '~/utils/common'
import authService from '~/service/authService.ts'

interface RequestInfo {
  url: string,
  method?: string,
  useToken?: boolean,
  config?: any,
  bodyData?: any
  transfer?: (values: any) => any
}

export const useDataApi = (initReqInfo?: RequestInfo, initialData?: any) => {
  const [data, setData] = useState(initialData)
  const [reqInfo, setReqInfo] = useState<RequestInfo | any>(initReqInfo)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<any>()
  const fetchData = async () => {
    setIsError(false)
    setIsLoading(true)
    try {
      let response: any = {
        data: undefined,
        status: 0,
        statusText: '',
        headers: undefined,
        config: undefined
      }
      if (reqInfo?.url?.trim()) {
        if (reqInfo.useToken) {
          axios.interceptors.request.use(
            function(config: any) {
              config.headers.Authorization = `Bearer ${authService.getToken() as string}`
              return config
            }
          )
        }
        switch (reqInfo.method) {
          case AxiosMethod.GET:
            response = await axios.get(reqInfo.url, reqInfo.config)
            break
          case AxiosMethod.POST:
            response = await axios.post(reqInfo.url, reqInfo.bodyData, reqInfo.config)
            break
          case AxiosMethod.PUT:
            response = await axios.put(reqInfo.url, reqInfo.bodyData, reqInfo.config)
            break
          case AxiosMethod.DEL:
            response = await axios.delete(reqInfo.url, reqInfo.config)
            break
          default:
            response = { data: null }
        }
      } else {
        response.data = data
      }
      const afterTranfer = reqInfo?.transfer?.(response.data)
      setData(afterTranfer ? afterTranfer : response.data)
    } catch (e: any) {
      setData(reqInfo?.transfer ? reqInfo?.transfer?.(data) : data)
      setIsError(true)

      let msg = e.code + ': ' + e.message
      setError(msg)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData().then()
  }, [reqInfo])

  return [data, setReqInfo, isLoading, isError, error]
}
