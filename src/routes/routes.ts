import {
  AuditLog,
  CheckInManager,
  Customer,
  DashboardSite,
  Department,
  Device,
  Forbidden,
  History,
  MeetingCalendar,
  MeetingList, MyOrganization, Organiztion,
  Permission,
  Profile,
  QRCodeManager,
  Role,
  Room,
  RoomMeetingCalendar,
  Setting, Site,
  Template,
  TicketResult, User
} from '~/pages'

import {
  PATH_AUDIT_LOG,
  PATH_CHECK_IN_MANAGER,
  PATH_CONFIGURATION,
  PATH_CUSTOMER,
  PATH_DASHBOARD,
  PATH_DEPARTMENT,
  PATH_DEVICE,
  PATH_HISTORY,
  PATH_MEETING_CALENDAR,
  PATH_MEETING_ROOM,
  PATH_MEETING_STATISTIC,
  PATH_MY_ORGANIZATION,
  PATH_MY_SITE,
  PATH_ORGANIZATION,
  PATH_PERMISSION,
  PATH_PROFILE,
  PATH_QR_CODE_MANAGER,
  PATH_ROLE,
  PATH_ROOM, PATH_ROOT,
  PATH_SITE,
  PATH_TEMPLATE,
  PATH_TICKET_RESULT,
  PATH_USER
} from './paths'
import { PATH_ROLE_MAP } from '~/role'
import { RouteItem } from '~/interface'
import { MySite } from '~/pages/MySite'
import { authService } from '~/service'

export const publicRoutes = [
  {
    path: '/403',
    component: Forbidden,
    layout: null
  }
]

export const privateRoutes: RouteItem[] = [
  {
    path: PATH_DASHBOARD,
    component: DashboardSite,
    role: PATH_ROLE_MAP['PATH_DASHBOARD']
  },
  {
    path: PATH_MEETING_CALENDAR,
    component: MeetingCalendar,
    role: PATH_ROLE_MAP['PATH_MEETING_CALENDAR']
  },
  {
    path: PATH_MEETING_ROOM,
    component: RoomMeetingCalendar,
    role: PATH_ROLE_MAP['PATH_MEETING_ROOM']
  },
  {
    path: PATH_MEETING_STATISTIC,
    component: MeetingList,
    role: PATH_ROLE_MAP['PATH_MEETING_STATISTIC']
  },
  {
    path: PATH_ORGANIZATION,
    component: Organiztion,
    role: PATH_ROLE_MAP['PATH_ORGANIZATION']
  },
  {
    path: PATH_MY_ORGANIZATION,
    component: MyOrganization,
    role: PATH_ROLE_MAP['PATH_MY_ORGANIZATION']
  },
  {
    path: PATH_SITE,
    component: Site,
    role: PATH_ROLE_MAP['PATH_SITE']
  },
  {
    path: PATH_CUSTOMER,
    component: Customer,
    role: PATH_ROLE_MAP['PATH_CUSTOMER']
  },
  {
    path: PATH_DEPARTMENT,
    component: Department,
    role: PATH_ROLE_MAP['PATH_DEPARTMENT']
  },
  {
    path: PATH_USER,
    component: User,
    role: PATH_ROLE_MAP['PATH_USER']
  },
  {
    path: PATH_ROLE,
    component: Role,
    role: PATH_ROLE_MAP['PATH_ROLE']
  },
  {
    path: PATH_ROOM,
    component: Room,
    role: PATH_ROLE_MAP['PATH_ROOM']
  },
  {
    path: PATH_DEVICE,
    component: Device,
    role: PATH_ROLE_MAP['PATH_DEVICE']
  },
  {
    path: PATH_TEMPLATE,
    component: Template,
    role: PATH_ROLE_MAP['PATH_TEMPLATE']
  },
  {
    path: PATH_PERMISSION,
    component: Permission,
    role: PATH_ROLE_MAP['PATH_PERMISSION']
  },
  {
    path: PATH_HISTORY,
    component: History,
    role: PATH_ROLE_MAP['PATH_HISTORY']
  },
  {
    path: PATH_CONFIGURATION,
    component: Setting,
    role: PATH_ROLE_MAP['PATH_CONFIGURATION']
  },
  {
    path: PATH_PROFILE,
    component: Profile
  },
  {
    path: PATH_TICKET_RESULT,
    component: TicketResult
    // role: PATH_ROLE_MAP['PATH_TICKET_RESULT']
  },
  {
    path: PATH_AUDIT_LOG,
    component: AuditLog,
    role: PATH_ROLE_MAP['PATH_AUDIT_LOG']
  },
  {
    path: PATH_MY_SITE,
    component: MySite,
    role: PATH_ROLE_MAP['PATH_MY_SITE']
  },
  {
    path: PATH_CHECK_IN_MANAGER,
    component: CheckInManager,
    role: PATH_ROLE_MAP['PATH_CHECK_IN_MANAGER']
  },
  {
    path: PATH_QR_CODE_MANAGER,
    component: QRCodeManager,
    role: PATH_ROLE_MAP['PATH_QR_CODE_MANAGER']
  }
]

export const getAllPrivateRouters = (): RouteItem[] => {
  const canAccessRouter = privateRoutes.filter((r) => authService.hasRole(r.role))
  const [first] = canAccessRouter
  if (first) return [clonePaths(PATH_ROOT, first), ...privateRoutes]
  return privateRoutes
}

export const getAcceptedPrivateRoutes = (): RouteItem[] => {
  const paths = privateRoutes.filter((r) => authService.hasRole(r.role))
  const [first] = paths
  if (first) paths.unshift(clonePaths(PATH_ROOT, first))
  return paths
}

const clonePaths = (pathUrl: string, routeItem: RouteItem): RouteItem => {
  return {
    path: pathUrl,
    component: routeItem.component,
    layout: routeItem.layout,
  }
}

