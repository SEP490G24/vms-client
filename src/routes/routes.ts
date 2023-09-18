import { Home } from '~/pages'
import {
  PATH_HOME,
} from './paths'

export const publicRoutes = []

export const privateRoutes = [
  {
    path: PATH_HOME,
    component: Home,
    layout: null
  }
]
