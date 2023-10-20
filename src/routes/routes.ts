import {
  Configuration,
  Dashboard,
  Department,
  History,
  MeetingCalendar,
  MeetingList,
  Organization,
  Profile,
  Room,
  Device,
  Permission
} from '~/pages'
import {
  PATH_CONFIGURATION,
  PATH_DASHBOARD,
  PATH_DEPARTMENT,
  PATH_HISTORY,
  PATH_MEETING_CALENDAR,
  PATH_MEETING_LIST,
  PATH_ORGANIZATION,
  PATH_PROFILE,
  PATH_SITE,
  PATH_USER,
  PATH_ROOM,
  PATH_DEVICE, PATH_PERMISSION
} from './paths'
import { Agent } from '~/pages/User'
import { Site } from '~/pages/Site'

export const publicRoutes = []

export const privateRoutes = [
  {
    path: PATH_DASHBOARD,
    component: Dashboard,
    layout: null
  },
  {
    path: PATH_MEETING_CALENDAR,
    component: MeetingCalendar,
    layout: null
  },
  {
    path: PATH_MEETING_LIST,
    component: MeetingList,
    layout: null
  },
  {
    path: PATH_ORGANIZATION,
    component: Organization,
    layout: null
  },
  {
    path: PATH_SITE,
    component: Site,
    layout: null
  },
  {
    path: PATH_DEPARTMENT,
    component: Department,
    layout: null
  },
  {
    path: PATH_USER,
    component: Agent,
    layout: null
  },
  {
    path: PATH_ROOM,
    component: Room,
    layout: null
  },
  {
    path: PATH_DEVICE,
    component: Device,
    layout: null
  },
  {
    path: PATH_PERMISSION,
    component: Permission,
    layout: null
  },
  {
    path: PATH_HISTORY,
    component: History,
    layout: null
  },
  {
    path: PATH_CONFIGURATION,
    component: Configuration,
    layout: null
  },
  {
    path: PATH_PROFILE,
    component: Profile,
    layout: null
  }
]