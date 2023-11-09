import { ProfileNavWrapper } from './styles.ts'
import { Card, Descriptions, Space, UploadFile, UploadProps } from 'antd'
import Title from 'antd/es/typography/Title'
import { authSelector, useAppSelector } from '~/redux'
import { authService } from '~/service'
import { useState } from 'react'
import { toBase64 } from '~/utils'
import { SharedAvatar } from '~/common'
import DescriptionsItem from 'antd/es/descriptions/Item'


const ProfileNav = () => {

  useAppSelector(authSelector)
  // const { t } = useTranslation()
  // const navigate = useNavigate()
  const userInfo = authService.getUserInfo()
  const [avatar, setAvatar] = useState<UploadFile>()

  // const profileNavs: MenuProps['items'] = [
  //   {
  //     key: 'info',
  //     label: t('user.profile.label'),
  //     icon: <MailOutlined className={'text-lg bg-[#f2f5f8] p-2 rounded'} />
  //   },
  //   {
  //     key: 'security',
  //     label: t('user.security.label'),
  //     icon: <CalendarOutlined className={'text-lg bg-[#f2f5f8] p-2 rounded'} />
  //   }
  // ]

  // const handleNavigate = (key: string) => {
  //   navigate(key)
  // }

  const onChange: UploadProps['onChange'] = async (data) => {
    const url = await toBase64(data.file)
    setAvatar(
      {
        ...data.fileList,
        // @ts-ignore
        url: url
      }
    )
  }

  return (
    <ProfileNavWrapper>
      <Card className={'shadow p-10'}>
        <Space className={'w-full'} classNames={{ item: 'w-full' }} direction={'vertical'} align={'center'}
               size={32}>
          <Space className={'w-full'} direction={'vertical'} align={'center'} size={24}>
            <SharedAvatar url={avatar?.url} name={userInfo.username} onChange={onChange} />
            <Title level={2}>{userInfo.fullName}</Title>
            <Title level={4}>@{userInfo.username}</Title>
          </Space>
          <Descriptions title='More Info'>
            <DescriptionsItem label={'Site'} span={3}>
              VMS_HN
            </DescriptionsItem>
            <DescriptionsItem label={'Department'} span={3}>
              IT Human
            </DescriptionsItem>
            <DescriptionsItem label={'Role'} span={3}>
              VMS_ADMIN
            </DescriptionsItem>
          </Descriptions>
          {/*<Menu className={'w-full'}*/}
          {/*      defaultSelectedKeys={['1']}*/}
          {/*      defaultOpenKeys={['sub1']}*/}
          {/*      onSelect={({ key }) => handleNavigate(key)}*/}
          {/*      mode={'inline'}*/}
          {/*      items={profileNavs}>*/}
          {/*</Menu>*/}
        </Space>
      </Card>
    </ProfileNavWrapper>
  )
}

export default ProfileNav
