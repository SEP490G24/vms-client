import { ProfileNavWrapper } from './styles.ts'
import { Avatar, Card, Menu, MenuProps, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authSelector, useAppSelector } from '~/redux'
import { authService } from '~/service'


const ProfileNav = () => {

  useAppSelector(authSelector)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userInfo = authService.getUserInfo();

   const profileNavs: MenuProps['items'] = [
    {
      key: 'info',
      label: t('user.profile.label'),
      icon: <MailOutlined className={'text-lg bg-[#f2f5f8] p-2 rounded'} />
    },
    {
      key: 'security',
      label: t('user.security.label'),
      icon: <CalendarOutlined className={'text-lg bg-[#f2f5f8] p-2 rounded'} />
    }
  ]

  const handleNavigate = (key: string) => {
    navigate(key)
  }


  return (
    <ProfileNavWrapper>
      <Card className={'shadow p-10'}>
        <Space className={'w-full'} classNames={{ item: 'w-full' }} direction={'vertical'} align={'center'}
               size={32}>
          <Space className={'w-full'} direction={'vertical'} align={'center'} size={24}>
            <Avatar
              className={'bg-[#f56a00] align-middle text-4xl'} size={132} gap={1}
            >{userInfo.fullName.at(0)}</Avatar>
            <Title level={2}>{userInfo.fullName}</Title>
            <Title level={4}>@{userInfo.username}</Title>
          </Space>
          <Menu className={'w-full'}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                onSelect={({ key }) => handleNavigate(key)}
                mode={'inline'}
                items={profileNavs}>
          </Menu>
        </Space>
      </Card>
    </ProfileNavWrapper>
  )
}

export default ProfileNav
