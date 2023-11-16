import { ProfileWrapper } from './styles.ts'
import { Col, Row, Space } from 'antd'
import { ProfileNav } from './ProfileNav'
import { ProfileInfo } from '~/pages/Account/Profile/ProfileInfo'
import { ProfileSecurity } from '~/pages/Account/Profile/ProfileSecurity'

const Profile = () => {

  return (
    <ProfileWrapper>
      <Row gutter={32}>
        <Col span={6}>
          <ProfileNav />
        </Col>
        <Col span={16}>
          <Space className={'w-full'} direction={'vertical'} size={32}>
            <ProfileInfo />
            <ProfileSecurity />
          </Space>
        </Col>
      </Row>
    </ProfileWrapper>
  )
}

export default Profile
