import { HeaderWrapper } from './styles'
import { Dropdown, MenuProps, Space } from 'antd'
import { DesktopTwoTone, GlobeTwoTone, UserTwoTone } from '~/icon'
import { DownOutlined } from '@ant-design/icons'

import { LogoutOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons'
import { userService } from '~/service'
import { useNavigate } from 'react-router-dom'
import { PATH_PROFILE } from '~/routes/paths.ts'

const Header = () => {

  const navigate = useNavigate()

  const doLogout = async () => {
    await userService.doLogout()
  }

  const languages: MenuProps['items'] = [
    {
      label: 'English',
      key: '1',
      onClick: (e) => {
        console.log(e)
      }
    },
    {
      label: 'Korean',
      key: '2'
    },
    {
      label: 'Japanese',
      key: '3'
    },
    {
      label: 'Vietnamese',
      key: '4'
    }
  ]

  const userSettings: MenuProps['items'] = [
    {
      key: 'user-profile',
      label: (<span>User Profile</span>),
      onClick: () => {
        navigate(PATH_PROFILE)
      },
      icon: <UserOutlined />
    },
    {
      key: 'change-password',
      label: (<span>Change Password</span>),
      icon: <KeyOutlined />
    },
    {
      key: 'logout',
      label: (<span>Logout</span>),
      onClick: async () => { await doLogout()},
      icon: <LogoutOutlined />
    }
  ]

  return (
    <HeaderWrapper className={'flex justify-end items-center gap-16 py-4'}>
      <Space size={16}>
        <DesktopTwoTone className={'text-[28px]'} />
        <span>Admin</span>
      </Space>
      <Dropdown menu={{ items: languages }} placement='bottomRight' trigger={['hover', 'click']}>
        <Space size={16} className={'cursor-pointer'}>
          <GlobeTwoTone className={'text-[28px]'} />
          <span>English</span>
          <DownOutlined />
        </Space>
      </Dropdown>
      <Dropdown
        menu={{ items: userSettings }}
        placement='bottomRight'
        trigger={['hover', 'click']}
      >
        <Space size={16} className={'cursor-pointer'}>
          <UserTwoTone className={'text-[28px]'} />
          <span>{userService.getUserInfo().fullName}</span>
          <DownOutlined />
        </Space>
      </Dropdown>
    </HeaderWrapper>
  )
}

export default Header
