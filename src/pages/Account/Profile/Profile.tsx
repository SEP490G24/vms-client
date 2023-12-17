import { ProfileWrapper } from './styles.ts'
import { Col, message, Row, Space, Spin } from 'antd'
import { ProfileNav } from './ProfileNav'
import { ProfileInfo } from '~/pages/Account/Profile/ProfileInfo'
import { useState } from 'react'
import { UploadFileData } from '~/interface'
import { fileService, userService } from '~/service'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setProfile } from '~/redux'

const Profile = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState<UploadFileData>()
  const [loading, setLoading] = useState(false)

  const onSaveInfo = async (values: any) => {
    setLoading(true)
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
        dispatch(setProfile(response.data))
      }
    }).catch((error) => message.error(error.data.message)).finally(() => setLoading(false))
  }

  return (
    <Spin spinning={loading}>
      <ProfileWrapper>
        <Space direction='vertical' size={24} style={{ width: '100%' }}>
          <h2>{t('user.title')}</h2>
          <Row gutter={32}>
            <Col span={6}>
              <ProfileNav avatar={avatar} onAvatarChange={setAvatar} />
            </Col>
            <Col span={18}>
              <Space className={'w-full'} direction={'vertical'} size={32}>
                <ProfileInfo onFinish={onSaveInfo} />
              </Space>
            </Col>
          </Row>
        </Space>
      </ProfileWrapper>
    </Spin>
  )
}

export default Profile
