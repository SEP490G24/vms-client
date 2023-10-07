import { ProfileSecurityWrapper, PersonInfoSection } from './styles.ts'
import { Button, Card, Form, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import Password from 'antd/es/input/Password'

const ProfileSecurity = () => {


  return (
    <ProfileSecurityWrapper className={'h-full'}>
      <Card className={'h-full'}>
        <Form layout={'vertical'} size={'large'}>
          <Space className={'w-full'} direction={'vertical'} size={32}>
            <PersonInfoSection>
              <Title level={3}>Change Password</Title>
              <div className={'grid grid-cols-1 gap-x-8'}>
                <Form.Item label='Current Password'>
                  <Password placeholder='input placeholder' />
                </Form.Item>
                <Form.Item label='New Password'>
                  <Password placeholder='input placeholder' />
                </Form.Item>
                <Form.Item label='Confirm Password'>
                  <Password placeholder='input placeholder' />
                </Form.Item>
              </div>
            </PersonInfoSection>
            <Button className={'float-right px-8'} type={'primary'}>Save</Button>
          </Space>
        </Form>
      </Card>
    </ProfileSecurityWrapper>
  )
}

export default ProfileSecurity
