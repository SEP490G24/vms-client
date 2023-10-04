import {
  PATH_CONFIGURATION,
  PATH_DASHBOARD, PATH_DEPARTMENT, PATH_HISTORY, PATH_MEETING, PATH_ORGANIZATION, PATH_SITE, PATH_USER
} from './paths.ts'
import { DesktopOutlined , HistoryOutlined, CalendarOutlined, UsergroupDeleteOutlined, SettingOutlined  } from '@ant-design/icons'

export const SIDE_BARS = [
  {
    key: PATH_DASHBOARD,
    icon: <DesktopOutlined className={'text-[18px]'} />,
    title: 'Overview',
    path: PATH_DASHBOARD,
    children: []
  },
  {
    key: PATH_MEETING,
    icon: <CalendarOutlined className={'text-[18px]'} />,
    title: 'Meeting Request',
    path: PATH_MEETING,
    children: []
  },
  {
    key: PATH_HISTORY,
    icon: <HistoryOutlined className={'text-[18px]'} />,
    title: 'Histories',
    path: PATH_HISTORY,
    children: []
  },
  {
    key: PATH_ORGANIZATION,
    icon: <UsergroupDeleteOutlined className={'text-[18px]'} />,
    title: 'Site & Org',
    children: [
      {
        key: PATH_ORGANIZATION,
        title: 'Organizations',
        path: PATH_ORGANIZATION,
        children: []
      },
      {
        key: PATH_SITE,
        title: 'Sites',
        path: PATH_SITE,
        children: []
      },
      {
        key: PATH_DEPARTMENT,
        title: 'Departments',
        path: PATH_DEPARTMENT,
        children: []
      },
      {
        key: PATH_USER,
        title: 'Users',
        path: PATH_USER,
        children: []
      },
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
    title: 'Configuration',
    path: PATH_CONFIGURATION,
    children: []
  }
]
