import { Avatar, ConfigProvider, Menu } from 'antd'
import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { SIDE_BARS } from '~/routes'
import { themes } from '~/themes'
import { getItem } from '~/utils'
import { SideBarWrapper, SideContent, SideHeader } from './styles'
import {
  PATH_AUDIT_LOG,
  PATH_CONFIGURATION,
  PATH_CUSTOMER,
  PATH_DASHBOARD,
  PATH_DEPARTMENT,
  PATH_HISTORY,
  PATH_MEETING_CALENDAR,
  PATH_MEETING_ROOM,
  PATH_MEETING_STATISTIC,
  PATH_MY_ORGANIZATION,
  PATH_ORGANIZATION,
  PATH_PERMISSION,
  PATH_ROLE,
  PATH_ROOM,
  PATH_SITE,
  PATH_TEMPLATE,
  PATH_USER
} from '~/routes/paths'
import { useTranslation } from 'react-i18next'
import { UserOutlined } from '@ant-design/icons'
import { authService } from '~/service'
import { SIDE_BAR_COLLAPSE } from '~/constants'


interface SideBarProps {
  collapsed: boolean
}

const SideBar: React.FC<SideBarProps> = ({ collapsed }) => {
  const { t, i18n } = useTranslation()
  const [menus, setMenus] = useState([])
  const [keyCollapse, setKeyCollapsed] = useState<string>('')


  const getMenus: any = () => {
    return SIDE_BARS
      .map((item) => {
        const checkRoleChildren = () => {
          if (item.children.length > 0) {
            return item.children?.map((subItem: any) => authService.hasRole(subItem.role) ? getItem(t(subItem.title), subItem.key) : undefined)
          }
          return undefined
        }
        return authService.hasRole(item.role)
          ? getItem(t(item.title), item.key, item.icon, checkRoleChildren())
          : undefined
      })
      .filter((item: any) => item)
  }

  const location = useLocation()
  const navigate = useNavigate()

  const handleSelectedItem = (key: string) => {
    const selectItem = SIDE_BARS.find((item) => {
      if (item.children.length) {
        return item.children.find((subItem) => subItem['key'] === key)
      } else {
        return item.key === key
      }
    })
    if (selectItem?.path) {
      navigate(selectItem.path)
    } else if (selectItem?.children?.length) {
      const pathSubSelectedItem = selectItem?.children.find((subItem: any) => subItem.key === key)?.path
      navigate(pathSubSelectedItem || '')
    }
  }

  useEffect(() => {
    switch (location.pathname) {
      case PATH_MEETING_CALENDAR:
      case PATH_MEETING_STATISTIC:
      case PATH_MEETING_ROOM:
        setKeyCollapsed(SIDE_BAR_COLLAPSE.MEETING)
        break
      case PATH_CUSTOMER:
      case PATH_HISTORY:
        setKeyCollapsed(SIDE_BAR_COLLAPSE.CUSTOMER)
        break
      case PATH_MY_ORGANIZATION:
      case PATH_ORGANIZATION:
      case PATH_SITE:
      case PATH_DEPARTMENT:
      case PATH_USER:
      case PATH_ROLE:
      case PATH_ROOM:
      case PATH_TEMPLATE:
        setKeyCollapsed(SIDE_BAR_COLLAPSE.ORGANIZATION)
        break
      case PATH_CONFIGURATION:
      case PATH_PERMISSION:
      case PATH_AUDIT_LOG:
        setKeyCollapsed(SIDE_BAR_COLLAPSE.CUSTOMER)
        break
      default:
        setKeyCollapsed(location.pathname)
        break
    }
  }, [])

  useEffect(() => {
    setMenus(getMenus)
  }, [i18n.language])

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorBgTextHover: themes.sidebar.bgHover,
            colorPrimary: themes.white,
            itemSelectedBg: themes.sidebar.bg,
            itemActiveBg: themes.sidebar.bgActive,
            itemSelectedColor: themes.white,
            itemHoverColor: themes.white,
            itemMarginBlock: 8,
            itemMarginInline: 8
          },
          Layout: {
            headerBg: themes.black,
            siderBg: themes.black,
            triggerBg: themes.black
          }
        }
      }}
    >
      <SideBarWrapper>
        <SideHeader
          onClick={() => handleSelectedItem(PATH_DASHBOARD)}
          className={'cursor-pointer flex justify-center my-16'}
        >
          <Avatar size='large' icon={<UserOutlined />} />
        </SideHeader>
        <SideContent>
          <Menu
            className={'bg-inherit text-gray-400 hover:text-gray-300'}
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={[keyCollapse]}
            items={menus}
            mode='inline'
            inlineCollapsed={collapsed}
            onSelect={({ key }) => handleSelectedItem(key)}
          />
        </SideContent>
      </SideBarWrapper>
    </ConfigProvider>
  )
}

export default SideBar
