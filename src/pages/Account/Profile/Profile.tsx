import { ProfileWrapper } from './styles.ts'
import { Col, message, Row, Space } from 'antd'
import { ProfileNav } from './ProfileNav'
import { ProfileInfo } from '~/pages/Account/Profile/ProfileInfo'
import { ProfileSecurity } from '~/pages/Account/Profile/ProfileSecurity'
import { useState } from 'react'
import { UploadFileData } from '~/interface'
import { fileService, userService } from '~/service'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setAuth } from '~/redux'

const Profile = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState<UploadFileData>()

  const onSaveInfo = async (values: any) => {
    let avatarName = undefined
    let payload = values
    if (avatar?.file) {
      await fileService.uploadRcFile(avatar?.file).then((response) => {
        avatarName = response.data.name
      })
      payload = {
        ...payload, avatar: avatarName
      }
    }
    userService.updateUserProfile(payload).then(async (response) => {
      if (response?.status === 200) {
        await message.success(t('common.message.success.save'))
        dispatch(setAuth(response.data))
      }
    }).catch((error) => message.error(error.data.message))
  }

  return (
    <ProfileWrapper>
      <Row gutter={32}>
        <Col span={6}>
          <ProfileNav avatar={avatar} onAvatarChange={setAvatar} />
        </Col>
        <Col span={16}>
          <Space className={'w-full'} direction={'vertical'} size={32}>
            <ProfileInfo onFinish={onSaveInfo} />
            <ProfileSecurity />
          </Space>
        </Col>
      </Row>
    </ProfileWrapper>
  )
}

export default Profile
