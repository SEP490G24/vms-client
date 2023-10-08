import { ConfigProvider, Image, Layout, Menu } from 'antd'
import { useState } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SIDE_BARS } from '~/routes'
import { themes } from '~/themes'
import { getItem } from '~/utils'
import { SideBarWrapper, SideContent, SideHeader } from './styles'
import { PATH_DASHBOARD } from '~/routes/paths'
import { imagePng } from '~/assets'
import Title from 'antd/es/typography/Title'
import { useTranslation } from 'react-i18next'


const { Sider } = Layout

const SideBar = () => {
  const { t } = useTranslation()
  const MENU_ITEMS = SIDE_BARS.map((item) => {
    return getItem(
      t(item.title),
      item.key,
      item.icon,
      item.children.length ? item.children?.map((subItem) => getItem(t(subItem['title']), subItem['key'])) : undefined
    )
  })
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
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

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorBgTextHover: themes.primary.light,
            colorBorder: themes.primary.normal,
            colorPrimary: themes.black,
            itemSelectedBg: themes.primary.light,
            itemSelectedColor: themes.primary.normal,
            itemMarginBlock: 8
          },
          Layout: {
            headerBg: themes.white,
            siderBg: themes.white,
            triggerBg: themes.black
          }
        }
      }}
    >
      <SideBarWrapper>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <SideHeader
            onClick={() => handleSelectedItem(PATH_DASHBOARD)}
            className={'cursor-pointer flex justify-center mx-4 my-16'}
          >
            {collapsed ? (
              <Image src={imagePng.logo} preview={false} />
            ) : (
              <Title level={5}>Visor Manager System</Title>
            )}
          </SideHeader>
          <SideContent className={'w-full h-full'}>
            <Menu
              className='bg-inherit text-gray-500 hover:text-gray-700'
              defaultSelectedKeys={[location.pathname]}
              items={MENU_ITEMS}
              mode='inline'
              onSelect={({ key }) => handleSelectedItem(key)}
              selectedKeys={currentMenuKeys}
            />
          </SideContent>
        </Sider>
      </SideBarWrapper>
    </ConfigProvider>
  )
}

export default SideBar
