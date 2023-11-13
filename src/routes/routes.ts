import {
  Customer,
  Dashboard,
  Department,
  Device,
  History,
  MeetingCalendar,
  MeetingList,
  Organization,
  Permission,
  Profile,
  Room,
  RoomMeetingCalendar,
  Setting,
  Template,
  TicketResult
} from '~/pages'

import { Agent } from '~/pages/User'
import { Site } from '~/pages/Site'

import {
  PATH_CONFIGURATION,
  PATH_CUSTOMER,
  PATH_DASHBOARD,
  PATH_DEPARTMENT,
  PATH_DEVICE,
  PATH_HISTORY,
  PATH_MEETING_CALENDAR,
  PATH_MEETING_STATISTIC,
  PATH_ORGANIZATION,
  PATH_PERMISSION,
  PATH_PROFILE,
  PATH_ROOM,
  PATH_MEETING_ROOM,
  PATH_SITE,
  PATH_TEMPLATE,
  PATH_TICKET_RESULT,
  PATH_USER, PATH_CHECK_IN_MANAGER
} from './paths'
import CheckInManager from '../pages/CheckInManager/CheckInManager.tsx'

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
    path: PATH_MEETING_ROOM,
    component: RoomMeetingCalendar,
    layout: null
  },
  {
    path: PATH_MEETING_STATISTIC,
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
    path: PATH_CUSTOMER,
    component: Customer,
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
    path: PATH_TEMPLATE,
    component: Template,
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
    component: Setting,
    layout: null
  },
  {
    path: PATH_PROFILE,
    component: Profile,
    layout: null
  },
  {
    path: PATH_TICKET_RESULT,
    component: TicketResult,
    layout: null
  },
  {
    path: PATH_CHECK_IN_MANAGER,
    component: CheckInManager,
    layout: null
  }
]
