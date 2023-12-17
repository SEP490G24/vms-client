import { ProfileNavWrapper } from './styles.ts'
import { Card, Descriptions, Space, UploadProps } from 'antd'
import Title from 'antd/es/typography/Title'
import { authSelector, useAppSelector } from '~/redux'
import React from 'react'
import { toBase64 } from '~/utils'
import { SharedAvatar } from '~/common'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { UploadFileData } from '~/interface'
import { BASE_STORAGE } from '~/constants'

interface Props {
  avatar?: UploadFileData
  onAvatarChange: (value: any) => void
}

const ProfileNav: React.FC<Props> = (props) => {

  useAppSelector(authSelector)
  const { profile } = useAppSelector(authSelector)

  const onChange: UploadProps['onChange'] = async (data) => {
    const url = await toBase64(data.file)
    props.onAvatarChange(
      {
        file: data.file,
        content: {
          ...data.fileList,
          // @ts-ignore
          url: url
        }
      }
    )
  }

  return (
    <ProfileNavWrapper>
      <Card className={'shadow p-10'}>
        <Space className={'w-full'} classNames={{ item: 'w-full' }} direction={'vertical'} align={'center'}
               size={32}>
          <Space className={'w-full'} direction={'vertical'} align={'center'} size={24}>
            <SharedAvatar url={profile?.avatar ? props.avatar?.content.url ?? BASE_STORAGE + profile?.avatar : ''}
                          name={profile?.username}
                          onChange={onChange} />
            <Title level={2}>{profile?.firstName + ' ' + profile?.lastName}</Title>
            <Title level={4}>@{profile?.username}</Title>
          </Space>
          <Descriptions title='More Info'>
            <DescriptionsItem label={'Site'} span={3}>
              {profile?.siteName}
            </DescriptionsItem>
            <DescriptionsItem label={'Department'} span={3}>
              {profile?.departmentName}
            </DescriptionsItem>
            <DescriptionsItem label={'Role'} span={3}>
              {profile?.role}
            </DescriptionsItem>
          </Descriptions>
        </Space>
      </Card>
    </ProfileNavWrapper>
  )
}

export default ProfileNav
