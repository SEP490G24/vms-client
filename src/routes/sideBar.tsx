import {
  PATH_CONFIGURATION, PATH_ROOM,
  PATH_DASHBOARD,
  PATH_DEPARTMENT,
  PATH_HISTORY,
  PATH_MEETING,
  PATH_MEETING_CALENDAR,
  PATH_MEETING_LIST,
  PATH_ORGANIZATION,
  PATH_SITE,
  PATH_USER, PATH_DEVICE
} from './paths.ts'
import {
  CalendarOutlined,
  DesktopOutlined,
  HistoryOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined
} from '@ant-design/icons'

export const SIDE_BARS = [
  {
    key: PATH_DASHBOARD,
    icon: <DesktopOutlined className={'text-[18px]'} />,
    title: 'sidebar.home.title',
    path: PATH_DASHBOARD,
    children: []
  },
  {
    key: PATH_MEETING,
    icon: <CalendarOutlined className={'text-[18px]'} />,
    title: 'sidebar.meeting.title',
    children: [
      {
        key: PATH_MEETING_CALENDAR,
        title: 'sidebar.meeting.sub.calendar',
        path: PATH_MEETING_CALENDAR,
        children: []
      },
      {
        key: PATH_MEETING_LIST,
        title: 'sidebar.meeting.sub.meetings',
        path: PATH_MEETING_LIST,
        children: []
      }
    ]
  },
  {
    key: PATH_HISTORY,
    icon: <HistoryOutlined className={'text-[18px]'} />,
    title: 'sidebar.history.title',
    path: PATH_HISTORY,
    children: []
  },
  {
    key: 'PATH_ORGANIZATION',
    icon: <UsergroupDeleteOutlined className={'text-[18px]'} />,
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
        key: PATH_DEVICE,
        title: 'sidebar.organization.sub.device',
        path: PATH_DEVICE,
        children: []
      }
      // {
      //   key: PATH_PERMISSION,
      //   title: 'Permission',
      //   path: PATH_PERMISSION,
      //   children: []
      // }
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
