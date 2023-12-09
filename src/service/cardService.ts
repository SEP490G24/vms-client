import httpService from './httpServices'
import authService from './authService'
import { CARD } from '~/constants/api.ts'
import { EventSourceObserver } from '~/interface'
import { Observable } from 'rxjs'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { CHECK_IN_EVENT } from '~/constants'

export interface CreateCardDto {
  cardId?: string,
  macIp?: string
}


const insert = async (payload: CreateCardDto) => {
  httpService.attachTokenToHeader(authService.getToken() as string)
  httpService.attachAcceptLanguageToHeader()
  const response = await httpService.post(CARD.BASE_PATH, payload)
  return httpService.handleResponseStatus(response)
}
const scanCard = async (): Promise<EventSourceObserver> => {
  let url = CARD.SCAN
  const controller = new AbortController()
  return {
    observer: new Observable((observer) => {
      fetchEventSource(url, {
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        signal: controller.signal,
        onmessage: (message) => {

          if (message.event === CHECK_IN_EVENT) {
            observer.next(message)
          }
        },
        onerror: (error) => {
          observer.error(error)
        },
        onclose: () => {
          observer.complete()
        }
      })
    }),
    close: () => {
      controller.abort()
    }
  }
}



const cardService = {
  insert,
  scanCard
}

export default cardService
