import { HeaderWrapper } from './styles'
import { Button, Dropdown, MenuProps, message, Select, Space } from 'antd'
import { GlobeTwoTone, UserTwoTone } from '~/icon'
import { DownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { authService, ChangePasswordPayload, userService } from '~/service'
import { PATH_PROFILE } from '~/routes/paths.ts'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Language } from '~/constants'
import { enumToArray } from '~/utils'
import { ChangePasswordModal } from '~/layouts/Header/ChangePasswordModal'
import { InfoModalData } from '~/interface'

interface HeaderProps {
  collapsed: boolean
  toggleCollapsed: (value: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ collapsed, toggleCollapsed }) => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const [changePasswordModalData, setChangePasswordModalData] = useState<InfoModalData<any>>({
    confirmLoading: false,
    openModal: false
  })

  const doLogout = async () => {
    await authService.doLogout()
  }

  const openChangePassword = () => {
    setChangePasswordModalData({...changePasswordModalData, openModal: true})
  }

  const userSettings: MenuProps['items'] = [
    {
      key: 'user-info',
      label: t('common.user.edit_info'),
      onClick: () => {
        navigate(PATH_PROFILE)
      },
      icon: <UserOutlined />
    },
    {
      key: 'change-password',
      label: t('common.user.change_password'),
      onClick: () => openChangePassword(),
      icon: <LockOutlined  />
    },
    {
      key: 'logout',
      label: t('common.user.logout'),
      onClick: () => doLogout(),
      icon: <LogoutOutlined />
    }
  ]

  const onChangePassword = (value: ChangePasswordPayload) => {
    userService.changePassword(value).then(async () => {
      await message.success(t('common.message.changePassword.success'))
    }).catch((error) => message.error(error.data.message))
  }

  return (
    <HeaderWrapper collapsed={collapsed}>
      <Space className={'w-full justify-between py-4'}>
        <Button onClick={() => toggleCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Space size={64}>
          <Space size={16} className={'cursor-pointer'}>
            <GlobeTwoTone className={'text-[28px]'} />
            <Select bordered={false} className='bg-body w-[100px]' defaultValue={i18n.language || 'en'}
                    onChange={(value) => i18n.changeLanguage(value)}
                    options={enumToArray(Language).map((item) => {
                      return { label: item.value, value: item.key }
                    })} />
          </Space>
          <Dropdown menu={{ items: userSettings }} placement='bottomRight' trigger={['click']}>
            <Space size={16} className={'cursor-pointer'}>
              <UserTwoTone className={'text-[28px]'} />
              <span>{authService.getUserInfo().fullName}</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </Space>
      </Space>
      <ChangePasswordModal
        open={changePasswordModalData.openModal}
        confirmLoading={changePasswordModalData.confirmLoading} onSave={onChangePassword}
        onClose={() => setChangePasswordModalData({
          ...changePasswordModalData,
          openModal: false
        })} />
    </HeaderWrapper>
  )
}

export default Header
