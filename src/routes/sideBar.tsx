import {
  PATH_CONFIGURATION,
  PATH_CUSTOMER,
  PATH_DASHBOARD,
  PATH_DEPARTMENT,
  PATH_HISTORY,
  PATH_MEETING_CALENDAR,
  PATH_MEETING_ROOM,
  PATH_MEETING_STATISTIC,
  PATH_ORGANIZATION,
  PATH_PERMISSION,
  PATH_CHECK_IN_MANAGER,
  PATH_ROOM,
  PATH_SITE,
  PATH_TEMPLATE,
  PATH_USER
} from './paths.ts'
import {
  ApartmentOutlined,
  DashboardOutlined,
  ScanOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UserSwitchOutlined
} from '@ant-design/icons'

export const SIDE_BARS = [
  {
    key: PATH_DASHBOARD,
    icon: <DashboardOutlined className={'text-[18px]'} />,
    title: 'sidebar.home.title',
    path: PATH_DASHBOARD,
    children: []
  },
  {
    key: 'PATH_MEETING',
    icon: <ScheduleOutlined className={'text-[18px]'} />,
    title: 'sidebar.meeting.title',
    children: [
      {
        key: PATH_MEETING_CALENDAR,
        title: 'sidebar.meeting.sub.calendar',
        path: PATH_MEETING_CALENDAR,
        children: []
      },
      {
        key: PATH_MEETING_STATISTIC,
        title: 'sidebar.meeting.sub.meetings',
        path: PATH_MEETING_STATISTIC,
        children: []
      },
      {
        key: PATH_MEETING_ROOM,
        title: 'sidebar.meeting.sub.rooms',
        path: PATH_MEETING_ROOM,
        children: []
      }
    ]
  },
  {
    key: PATH_CHECK_IN_MANAGER,
    icon: <ScanOutlined className={'text-[18px]'} />,
    title: 'sidebar.check-in.title',
    path: PATH_CHECK_IN_MANAGER,
    children: []
  },
  {
    key: 'PATH_CUSTOMER',
    icon: <UserSwitchOutlined className={'text-[18px]'} />,
    title: 'sidebar.customer.title',
    children: [
      {
        key: PATH_CUSTOMER,
        title: 'sidebar.customer.sub.customer',
        path: PATH_CUSTOMER,
        children: []
      },
      {
        key: PATH_HISTORY,
        title: 'sidebar.customer.sub.history',
        path: PATH_HISTORY,
        children: []
      }
    ]
  },
  {
    key: 'PATH_ORGANIZATION',
    icon: <ApartmentOutlined className={'text-[18px]'} />,
    title: 'sidebar.organization.title',
    children: [
      {
        key: PATH_ORGANIZATION,
        title: 'sidebar.organization.sub.info',
        path: PATH_ORGANIZATION,
        children: []
      },
      {
        key: PATH_SITE,
        title: 'sidebar.organization.sub.site',
        path: PATH_SITE,
        children: []
      },
      {
        key: PATH_DEPARTMENT,
        title: 'sidebar.organization.sub.department',
        path: PATH_DEPARTMENT,
        children: []
      },
      {
        key: PATH_USER,
        title: 'sidebar.organization.sub.user',
        path: PATH_USER,
        children: []
      },
      {
        key: PATH_ROOM,
        title: 'sidebar.organization.sub.room',
        path: PATH_ROOM,
        children: []
      },
      {
        key: PATH_TEMPLATE,
        title: 'sidebar.organization.sub.template',
        path: PATH_TEMPLATE,
        children: []
      },
      // {
      //   key: PATH_DEVICE,
      //   title: 'sidebar.organization.sub.device',
      //   path: PATH_DEVICE,
      //   children: []
      // },
      {
        key: PATH_PERMISSION,
        title: 'Permission',
        path: PATH_PERMISSION,
        children: []
      }
    ]
  },
  {
    key: PATH_CONFIGURATION,
    icon: <SettingOutlined className={'text-[18px]'} />,
    title: 'sidebar.configuration.title',
    path: PATH_CONFIGURATION,
    children: []
  }
]
