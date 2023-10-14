import { ProfileSecurityWrapper, PersonInfoSection } from './styles.ts'
import { Button, Card, Form, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import Password from 'antd/es/input/Password'
import { useTranslation } from 'react-i18next'

const ProfileSecurity = () => {

  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onFinish = (value: string) => {
    console.log(value)
  }

  return (
    <ProfileSecurityWrapper className={'h-full'}>
      <Card className={'h-full'}>
        <Form layout={'vertical'} size={'large'}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 24 }}
              form={form}
              initialValues={{ layout: 'horizontal' }}
              style={{ width: '100%' }}
              colon={false}
              onFinish={onFinish}
              labelAlign='left'
              // requiredMark={false}
        >
          <Space className={'w-full'} direction={'vertical'} size={32}>
            <PersonInfoSection>
              <Title level={3}>{t('user.security.change_password')}</Title>
              <div className={'grid grid-cols-1 gap-x-8'}>
                <Form.Item label={t('common.field.current_password')} name={'oldPassword'} rules={[{ required: true }]}>
                  <Password placeholder={t('common.placeholder.current_password')} />
                </Form.Item>
                <Form.Item label={t('common.field.new_password')} name={'newPassword'} rules={[{ required: true }]}>
                  <Password placeholder={t('common.placeholder.current_password')} />
                </Form.Item>
                <Form.Item label={t('common.field.confirm_password')}
                           name='cPassword'
                           rules={[{ required: true },
                             ({ getFieldValue }) => ({
                               validator(_, value) {
                                 if (!value || getFieldValue('newPassword') === value) {
                                   return Promise.resolve()
                                 }
                                 return Promise.reject(new Error('The new password that you entered do not match!'))
                               }
                             })]}
                >
                  <Password placeholder={t('common.placeholder.current_password')} />
                </Form.Item>
              </div>
            </PersonInfoSection>
            <Button className={'float-right px-8'} type={'primary'}>{t('common.label.save')}</Button>
          </Space>
        </Form>
      </Card>
    </ProfileSecurityWrapper>
  )
}

export default ProfileSecurity
