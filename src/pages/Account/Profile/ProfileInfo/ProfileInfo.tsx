import { PersonInfoSection, ProfileInfoWrapper } from './styles.ts'
import { Button, Card, DatePicker, Form, Input, Select, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import { useTranslation } from 'react-i18next'

const ProfileInfo = () => {

  const { t } = useTranslation()

  return (
    <ProfileInfoWrapper>
      <Card>
        <Form layout={'vertical'} size={'large'}>
          <Space className={'w-full'} direction={'vertical'} size={32}>
            <PersonInfoSection>
              <Title level={3}>Personal Info</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label={t('common.field.first_name')}>
                  <Input placeholder={t('common.placeholder.first_name')} />
                </Form.Item>
                <Form.Item label={t('common.field.last_name')}>
                  <Input placeholder={t('common.placeholder.last_name')} />
                </Form.Item>
                <Form.Item label={t('common.field.username')}>
                  <Input placeholder={t('common.placeholder.username')} />
                </Form.Item>
                <Form.Item label={t('common.field.gender')}>
                  <Select options={[{ label: 'Male', value: true }, { label: 'Female', value: false }]}
                          placeholder={t('common.placeholder.gender')}>
                  </Select>
                </Form.Item>
                <Form.Item label={t('common.field.dob')}>
                  <DatePicker className={'w-full'} placeholder={t('common.placeholder.dob')}></DatePicker>
                </Form.Item>
              </div>
            </PersonInfoSection>
            <PersonInfoSection>
              <Title level={3}>{t('user.profile.contact_info')}</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label={t('common.field.phoneNumber')}>
                  <Input placeholder={t('common.placeholder.phoneNumber')} />
                </Form.Item>
                <Form.Item label={t('common.field.email')}>
                  <Input placeholder={t('common.placeholder.email')} />
                </Form.Item>
              </div>
            </PersonInfoSection>
            <PersonInfoSection>
              <Title level={3}>{t('user.profile.address_info')}</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label={t('common.field.city')}>
                  <Select options={[{ label: 'Ha Noi', value: true }, { label: 'Can Tho', value: false }]}
                          placeholder={t('common.placeholder.city')}>
                  </Select>
                </Form.Item>
                <Form.Item label={t('common.field.address')}>
                  <Input placeholder={t('common.placeholder.address')} />
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
