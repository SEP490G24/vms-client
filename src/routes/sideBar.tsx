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
  PATH_USER, PATH_QR_CODE_MANAGER
} from './paths.ts'
import {
  ApartmentOutlined,
  DashboardOutlined,
  ScanOutlined,
  ScheduleOutlined,
  QrcodeOutlined,
  SettingOutlined,
  UserSwitchOutlined
} from '@ant-design/icons'
import { MenuItem } from '~/interface'
import { PATH_ROLE_MAP } from '~/role'

export const SIDE_BARS: MenuItem[] = [
  {
    key: PATH_DASHBOARD,
    icon: <DashboardOutlined className={'text-[18px]'} />,
    title: 'sidebar.home.title',
    path: PATH_DASHBOARD,
    role: [...PATH_ROLE_MAP['PATH_DASHBOARD']],
    children: []
  },
  {
    key: 'PATH_MEETING',
    icon: <ScheduleOutlined className={'text-[18px]'} />,
    title: 'sidebar.meeting.title',
    role: [...PATH_ROLE_MAP['PATH_MEETING_CALENDAR'], ...PATH_ROLE_MAP['PATH_MEETING_STATISTIC'], ...PATH_ROLE_MAP['PATH_MEETING_ROOM']],
    children: [
      {
        key: PATH_MEETING_CALENDAR,
        title: 'sidebar.meeting.sub.calendar',
        path: PATH_MEETING_CALENDAR,
        role: PATH_ROLE_MAP['PATH_MEETING_CALENDAR'],
        children: []
      },
      {
        key: PATH_MEETING_STATISTIC,
        title: 'sidebar.meeting.sub.meetings',
        path: PATH_MEETING_STATISTIC,
        role: PATH_ROLE_MAP['PATH_MEETING_STATISTIC'],
        children: []
      },
      {
        key: PATH_MEETING_ROOM,
        title: 'sidebar.meeting.sub.rooms',
        path: PATH_MEETING_ROOM,
        role: PATH_ROLE_MAP['PATH_MEETING_ROOM'],
        children: []
      }
    ]
  },
  {
    key: PATH_CHECK_IN_MANAGER,
    icon: <ScanOutlined className={'text-[18px]'} />,
    title: 'sidebar.check-in.title',
    path: PATH_CHECK_IN_MANAGER,
    // role: [...PATH_ROLE_MAP['PATH_CHECK_IN_MANAGER']],
    children: []
  },
  {
    key: PATH_QR_CODE_MANAGER,
    icon: <QrcodeOutlined  className={'text-[18px]'} />,
    title: 'sidebar.qr-manager.title',
    path: PATH_QR_CODE_MANAGER,
    // role: [...PATH_ROLE_MAP['PATH_CHECK_IN_MANAGER']],
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
        role: PATH_ROLE_MAP['PATH_CUSTOMER'],
        children: []
      },
      {
        key: PATH_HISTORY,
        title: 'sidebar.customer.sub.history',
        path: PATH_HISTORY,
        role: PATH_ROLE_MAP['PATH_HISTORY'],
        children: []
      }
    ]
  },
  {
    key: 'PATH_ORGANIZATION',
    icon: <ApartmentOutlined className={'text-[18px]'} />,
    title: 'sidebar.organization.title',
    role: [
      ...PATH_ROLE_MAP['PATH_ORGANIZATION'],
      ...PATH_ROLE_MAP['PATH_SITE'],
      ...PATH_ROLE_MAP['PATH_DEPARTMENT'],
      ...PATH_ROLE_MAP['PATH_USER'],
      ...PATH_ROLE_MAP['PATH_ROOM'],
      ...PATH_ROLE_MAP['PATH_TEMPLATE']
    ],
    children: [
      {
        key: PATH_ORGANIZATION,
        title: 'sidebar.organization.sub.info',
        path: PATH_ORGANIZATION,
        role: PATH_ROLE_MAP['PATH_ORGANIZATION'],
        children: []
      },
      {
        key: PATH_SITE,
        title: 'sidebar.organization.sub.site',
        path: PATH_SITE,
        role: PATH_ROLE_MAP['PATH_SITE'],
        children: []
      },
      {
        key: PATH_DEPARTMENT,
        title: 'sidebar.organization.sub.department',
        path: PATH_DEPARTMENT,
        role: PATH_ROLE_MAP['PATH_DEPARTMENT'],
        children: []
      },
      {
        key: PATH_USER,
        title: 'sidebar.organization.sub.user',
        path: PATH_USER,
        role: PATH_ROLE_MAP['PATH_USER'],
        children: []
      },
      {
        key: PATH_ROOM,
        title: 'sidebar.organization.sub.room',
        path: PATH_ROOM,
        role: PATH_ROLE_MAP['PATH_ROOM'],
        children: []
      },
      {
        key: PATH_TEMPLATE,
        title: 'sidebar.organization.sub.template',
        path: PATH_TEMPLATE,
        role: PATH_ROLE_MAP['PATH_TEMPLATE'],
        children: []
      }
      // {
      //   key: PATH_DEVICE,
      //   title: 'sidebar.organization.sub.device',
      //   path: PATH_DEVICE,
      //   children: []
      // }
    ]
  },
  {
    key: PATH_CONFIGURATION,
    icon: <SettingOutlined className={'text-[18px]'} />,
    title: 'sidebar.configuration.title',
    role: [
      ...PATH_ROLE_MAP['PATH_PERMISSION'],
      ...PATH_ROLE_MAP['PATH_CONFIGURATION']
    ],
    children: [
      {
        key: PATH_PERMISSION,
        title: 'Permission',
        path: PATH_PERMISSION,
        role: PATH_ROLE_MAP['PATH_PERMISSION'],
        children: []
      },
      {
        key: PATH_CONFIGURATION,
        title: 'sidebar.configuration.title',
        path: PATH_CONFIGURATION,
        role: PATH_ROLE_MAP['PATH_CONFIGURATION'],
        children: []
      }
    ]
  }
]
