import { ProfileNavWrapper } from './styles.ts'
import { Avatar, Card, Menu, MenuProps, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


const ProfileNav = () => {

  const { t } = useTranslation()
  const navigate = useNavigate()

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
          <Space className={'w-full'} direction={'vertical'} align={'center'} size={16}>
            <Avatar
              size={164}
              src={<img src={'https://lightence-assets.s3.amazonaws.com/avatars/avatar5.webp'} alt='avatar' />}
            />
            <Title level={2}>Chris Johnson </Title>
            <Title level={4}>@john1989</Title>
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
