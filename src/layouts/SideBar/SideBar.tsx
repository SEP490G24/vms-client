import { Avatar, ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SIDE_BARS } from '~/routes'
import { themes } from '~/themes'
import { getItem } from '~/utils'
import { SideBarWrapper, SideContent, SideHeader } from './styles'
import { PATH_DASHBOARD } from '~/routes/paths'
import { useTranslation } from 'react-i18next'
import { UserOutlined } from '@ant-design/icons'
import { authService } from '~/service'


interface SideBarProps {
  collapsed: boolean
}

const SideBar: React.FC<SideBarProps> = ({ collapsed }) => {
  const { t, i18n } = useTranslation()
  const [menus, setMenus] = useState([])

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
  const [currentMenuKeys, setCurrentMenuKeys] = useState([PATH_DASHBOARD])
  const { id } = useParams()

  const handleSelectedItem = (key: string) => {
    const selectItem = SIDE_BARS.find((item) => {
      if (item.children.length) {
        return item.children.find((subItem) => subItem['key'] === key)
      } else {
        return item.key === key
      }
    })
    if (selectItem?.path) {
      navigate(selectItem.path.replace(':id', id || ''))
    } else if (selectItem?.children?.length) {
      const subSelectedItem: any = selectItem?.children.find((subItem) => subItem['key'] === key)
      navigate(subSelectedItem ? subSelectedItem.path.replace(':id', id || '') : '')
    }
    setCurrentMenuKeys([key])
  }

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
        <SideContent
          className='h-full bg-inherit text-gray-400 hover:text-gray-300'
          defaultSelectedKeys={[location.pathname]}
          items={menus}
          mode='inline'
          inlineCollapsed={collapsed}
          onSelect={({ key }) => handleSelectedItem(key)}
          selectedKeys={currentMenuKeys} />
      </SideBarWrapper>
    </ConfigProvider>
  )
}

export default SideBar
