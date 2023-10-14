import { ProfileWrapper } from './styles.ts'
import { Col, Row } from 'antd'
import { ProfileNav } from './ProfileNav'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { userService } from '~/service'
import { setProfile, useAppDispatch } from '~/redux'

const Profile = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    userService.getUserProfile().then((response) => {
      dispatch(setProfile(response?.data))
    })
  }, [])


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
