import { HeaderWrapper } from './styles'
import { Dropdown, MenuProps, Space } from 'antd'
import { DesktopTwoTone, GlobeTwoTone, UserTwoTone } from '~/icon'
import { DownOutlined } from '@ant-design/icons'

import { LogoutOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons'
import { userService } from '~/service'

const Header = () => {

  const doLogout = async (e: any) => {
    e.preventDefault()
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
      key: 'user-info',
      label: (
        <span onClick={(e) => e.preventDefault()}>
        사용자 정보
      </span>
      ),
      icon: <UserOutlined />
    },
    {
      key: 'change-password',
      label: (
        <span onClick={(e) => e.preventDefault()}>
        비밀번호 변경
      </span>
      ),
      icon: <KeyOutlined />
    },
    {
      key: 'logout',
      label: (
        <span onClick={(e) => doLogout(e)}>
        로그아웃
      </span>
      ),
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
        <Space size={16}>
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
        <Space size={16}>
          <UserTwoTone className={'text-[28px]'} />
          <span>{userService.getUserInfo().fullName}</span>
          <DownOutlined />
        </Space>
      </Dropdown>
    </HeaderWrapper>
  )
}

export default Header
