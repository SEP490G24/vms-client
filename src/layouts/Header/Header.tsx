import { HeaderWrapper } from './styles'
import { Dropdown, MenuProps, Select, Space } from 'antd'
import { DesktopTwoTone, GlobeTwoTone, UserTwoTone } from '~/icon'
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { authService } from '~/service'
import { PATH_PROFILE } from '~/routes/paths.ts'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()

  const doLogout = async () => {
    await authService.doLogout()
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
      key: 'logout',
      label: t('common.user.logout'),
      onClick: () => doLogout(),
      icon: <LogoutOutlined />
    }
  ]

  return (
    <HeaderWrapper className={'flex justify-end items-center gap-16 py-4'}>
      <Space size={16}>
        <DesktopTwoTone className={'text-[28px]'} />
        <span>Admin</span>
      </Space>
      <Space size={16} className={'cursor-pointer'}>
        <GlobeTwoTone className={'text-[28px]'} />
        <Select bordered={false} className='bg-body w-[100px]' defaultValue={i18n.language || 'en'}
                onChange={(value) => i18n.changeLanguage(value)} options={[
          { label: 'English', value: 'en' },
          { label: 'Tiếng Việt', value: 'vi' }
        ]} />
      </Space>
      <Dropdown menu={{ items: userSettings }} placement='bottomRight' trigger={['click']}>
        <Space size={16} className={'cursor-pointer'}>
          <UserTwoTone className={'text-[28px]'} />
          <span>{authService.getUserInfo().fullName}</span>
          <DownOutlined />
        </Space>
      </Dropdown>
    </HeaderWrapper>
  )
}

export default Header
