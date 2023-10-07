import { PersonInfoSection, ProfileInfoWrapper } from './styles.ts'
import { Button, Card, DatePicker, Form, Input, Select, Space } from 'antd'
import Title from 'antd/es/typography/Title'

const ProfileInfo = () => {


  return (
    <ProfileInfoWrapper>
      <Card>
        <Form layout={'vertical'} size={'large'}>
          <Space className={'w-full'} direction={'vertical'} size={32}>
            <PersonInfoSection>
              <Title level={3}>Personal Info</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label='First Name'>
                  <Input placeholder='input placeholder' />
                </Form.Item>
                <Form.Item label='Last Name'>
                  <Input placeholder='input placeholder' />
                </Form.Item>
                <Form.Item label='Username'>
                  <Input placeholder='input placeholder' />
                </Form.Item>
                <Form.Item label='Gender'>
                  <Select options={[{ label: 'Male', value: true }, { label: 'Female', value: false }]}
                          placeholder={'Select Gender'}>
                  </Select>
                </Form.Item>
                <Form.Item label='Birthday'>
                  <DatePicker className={'w-full'}></DatePicker>
                </Form.Item>
              </div>
            </PersonInfoSection>
            <PersonInfoSection>
              <Title level={3}>Contact Info</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label='Phone'>
                  <Input placeholder='input placeholder' />
                </Form.Item>
                <Form.Item label='Email'>
                  <Input placeholder='input placeholder' />
                </Form.Item>
              </div>
            </PersonInfoSection>
            <PersonInfoSection>
              <Title level={3}>Address</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label='City'>
                  <Select options={[{ label: 'Ha Noi', value: true }, { label: 'Can Tho', value: false }]}
                          placeholder={'Select City'}>
                  </Select>
                </Form.Item>
                <Form.Item label='Address'>
                  <Input placeholder='input placeholder' />
                </Form.Item>
              </div>
            </PersonInfoSection>
            <Button className={'float-right px-8'} type={'primary'}>Save</Button>
          </Space>
        </Form>
      </Card>
    </ProfileInfoWrapper>
  )
}

export default ProfileInfo
