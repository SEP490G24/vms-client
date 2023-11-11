import { PersonInfoSection, ProfileInfoWrapper } from './styles.ts'
import { Button, Card, Form, Input, message, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import { useTranslation } from 'react-i18next'
import { authSelector, useAppSelector } from '~/redux'
import { useEffect } from 'react'
import { SharedInput, SharedSelect } from '~/common'
import { SharedDatePicker } from '~/common/SharedDatePicker'
import { REGEX } from '~/constants'
import { userService } from '~/service'
import { enumToArray } from '~/utils'
import { Gender } from '~/interface'
import { useLocation } from '~/hook'

const ProfileInfo = () => {

  const { profile } = useAppSelector(authSelector)
  const [form] = Form.useForm()

  const { t } = useTranslation()

  let provinceId = Form.useWatch('provinceId', form)
  let districtId = Form.useWatch('districtId', form)

  let { communes, districts, provinces } = useLocation(provinceId, districtId)

  const resetDistrictAndCommune = () => {
    form.resetFields(['districtId', 'communeId'])
  }

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
        phoneNumber: profile.phoneNumber
      })
    }
  }, [profile])

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
                  <SharedSelect
                    options={enumToArray(Gender).map(item => {
                      return { label: item.key, value: item.value }
                    })}
                    placeholder={t('common.placeholder.gender')} />
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
                <Form.Item label={t('common.field.phoneNumber')} name={'phoneNumber'} rules={[{ required: true }, {
                  pattern: REGEX.PHONE,
                  message: t('common.error.phoneNumber_valid')
                }]}>
                  <SharedInput placeholder={t('common.placeholder.phoneNumber')} />
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
                <Form.Item label={t('common.field.province')} name='provinceId'
                           rules={[{ required: true }]}>
                  <SharedSelect options={provinces.map((province) => {
                    return { label: province.name, value: province.id, key: province.id }
                  })}
                                onChange={resetDistrictAndCommune}
                                placeholder={t('common.placeholder.province')} />
                </Form.Item>
                <Form.Item label={t('common.field.district')} name='districtId'
                           rules={[{ required: true }]}>
                  <SharedSelect
                    options={districts?.map((district) => {
                      return { label: district.name, value: district.id, key: district.id }
                    }) ?? []}
                    placeholder={t('common.placeholder.district')} />
                </Form.Item>
                <Form.Item label={t('common.field.commune')} name='communeId'
                           rules={[{ required: true }]}>
                  <SharedSelect options={communes?.map((commune) => {
                    return { label: commune.name, value: commune.id, key: commune.id }
                  }) ?? []}
                                placeholder={t('common.placeholder.commune')} />
                </Form.Item>
                <Form.Item label={t('common.field.address')} name='address'
                           rules={[{ required: true }]}>
                  <SharedInput placeholder={t('common.placeholder.address')} />
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
