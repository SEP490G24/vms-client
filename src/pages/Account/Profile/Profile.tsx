import { ProfileWrapper } from './styles.ts'
import { Col, Row } from 'antd'
import { ProfileNav } from './ProfileNav'
import { Outlet } from 'react-router-dom'

const Profile = () => {


  return (
    <ProfileWrapper>
      <Row gutter={32}>
        <Col span={8}>
          <ProfileNav />
        </Col>
        <Col span={16}>
          <Outlet />
        </Col>
      </Row>
    </ProfileWrapper>
  )
}

export default Profile
