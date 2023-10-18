import { ProfileNavWrapper } from './styles.ts'
import { Card, Menu, MenuProps, Space, Upload, UploadFile, UploadProps } from 'antd'
import Title from 'antd/es/typography/Title'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authSelector, useAppSelector } from '~/redux'
import { authService } from '~/service'
import { useState } from 'react'
import { toBase64 } from '~/utils'


const ProfileNav = () => {

  useAppSelector(authSelector)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userInfo = authService.getUserInfo()
  const [avatar, setAvatar] = useState<UploadFile[]>([])


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

  const onChange: UploadProps['onChange'] = async (data) => {
    if (data.file.status === 'removed') {
      setAvatar([])
      return
    }
    const url = await toBase64(data.file)
    setAvatar([
      {
        ...data.fileList,
        // @ts-ignore
        url: url
      }
    ])
  }


  const onPreview = async (file: any) => {
    console.log(file)
    // setPreviewImage(file.url || previewImage)
    // setPreviewOpen(true)
    // setPreviewTitle(file[0].name)
  }


  return (
    <ProfileNavWrapper>
      <Card className={'shadow p-10'}>
        <Space className={'w-full'} classNames={{ item: 'w-full' }} direction={'vertical'} align={'center'}
               size={32}>
          <Space className={'w-full'} direction={'vertical'} align={'center'} size={24}>
            <Upload
              listType='picture-circle'
              fileList={avatar}
              beforeUpload={() => false}
              onChange={onChange}
              onPreview={onPreview}
            >
              {avatar.length === 0 ? (
                <div>
                  <span>+</span>
                  <div className='ant-upload-text'>{t('common.placeholder.upload')}</div>
                </div>
              ) : (
                ''
              )}
            </Upload>
            {/*<Avatar*/}
            {/*  className={'bg-[#f56a00] align-middle text-4xl'} size={132} gap={1}*/}
            {/*>{userInfo.fullName.at(0)}</Avatar>*/}
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
