import { PersonInfoSection, ProfileInfoWrapper } from './styles.ts'
import { Button, Card, Form, Input, message, Select, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import { useTranslation } from 'react-i18next'
import { authSelector, useAppSelector } from '~/redux'
import { useEffect } from 'react'
import { SharedInput, SharedPhoneNumber, SharedSelect } from '~/common'
import { SharedDatePicker } from '~/common/SharedDatePicker'
import { REGEX } from '~/constants'
import { userService } from '~/service'

const ProfileInfo = () => {

  const { profile } = useAppSelector(authSelector)
  const [form] = Form.useForm()

  const { t } = useTranslation()

  useEffect(() => {
    console.log(profile)
  }, [])

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        countryCode: profile.countryCode
      })
    }
  }, [profile])

  const onPhoneNumberChange = (value: string) => {
    value &&
    form.setFieldsValue({
      phoneNumber: value
    })
  }

  const onCountryCodeChange = (value: string) => {
    value &&
    form.setFieldsValue({
      countryCode: value
    })
  }

  const onDateOfBirthChange = (value: string) => {
    value &&
    form.setFieldsValue({
      dateOfBirth: value
    })
  }

  const onFinish = (value: any) => {
    userService.updateUserProfile(value).then(async (response) => {
      if (response?.status === 200) await message.success(t('common.message.success.save'))
      else await message.error(t('common.message.error.save'))
    }).catch(() => message.error(t('common.message.error.save')))
  }


  return (
    <ProfileInfoWrapper>
      <Card>
        <Form layout={'vertical'} size={'large'}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 24 }}
              form={form}
              initialValues={{ layout: 'horizontal' }}
              style={{ width: '100%' }}
              colon={false}
              onFinish={onFinish}
              labelAlign='left'
        >
          <Space className={'w-full'} direction={'vertical'} size={32}>
            <PersonInfoSection>
              <Title level={3}>Personal Info</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label={t('common.field.first_name')} name={'firstName'} rules={[{ required: true }]}>
                  <SharedInput placeholder={t('common.placeholder.first_name')} />
                </Form.Item>
                <Form.Item label={t('common.field.last_name')} name={'lastName'} rules={[{ required: true }]}>
                  <SharedInput placeholder={t('common.placeholder.last_name')} />
                </Form.Item>
                <Form.Item label={t('common.field.username')} name={'username'}>
                  <SharedInput placeholder={t('common.placeholder.username')} disabled />
                </Form.Item>
                <Form.Item label={t('common.field.gender')} name={'gender'}>
                  <SharedSelect options={[{ label: 'MALE', value: 'MALE' }, { label: 'FEMALE', value: 'FEMALE' }, {
                    label: 'OTHER',
                    value: 'OTHER'
                  }]} placeholder={t('common.placeholder.gender')} />
                </Form.Item>
                <Form.Item label={t('common.field.dob')} name={'dateOfBirth'}>
                  <SharedDatePicker className={'w-full'} placeholder={t('common.placeholder.dob')}
                                    onChangeDate={onDateOfBirthChange}></SharedDatePicker>
                </Form.Item>
              </div>
            </PersonInfoSection>
            <PersonInfoSection>
              <Title level={3}>{t('user.profile.contact_info')}</Title>
              <div className={'grid grid-cols-2 gap-x-8'}>
                <Form.Item label={t('common.field.phoneNumber')} name={'phoneNumber'} rules={[{ required: true }]}>
                  <SharedPhoneNumber
                    defaultValue={{ countryCode: profile?.countryCode as any, phone: profile?.phoneNumber as any }}
                    onChangeCode={onCountryCodeChange}
                    onChangePhone={onPhoneNumberChange} />
                </Form.Item>
                <Form.Item label={t('common.field.email')} name={'email'}
                           rules={[{ required: true }, {
                             pattern: REGEX.EMAIL,
                             message: t('common.error.email_valid')
                           }]}>
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
            <Button className={'float-right px-8'} type={'primary'} htmlType={'submit'}>Save</Button>
          </Space>
        </Form>
      </Card>
    </ProfileInfoWrapper>
  )
}

export default ProfileInfo
