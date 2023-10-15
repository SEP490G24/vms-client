import React, { useEffect, useState } from 'react'
import { FormDataWrapper } from './styles.ts'
import { Col, Divider, Form, FormInstance, Radio, Row, Space } from 'antd'
import { DepartmentDto, SiteDto, UserDto } from '~/interface'
import { SharedInput, SharedPhoneNumber, SharedSelect } from '~/common'
import Password from 'antd/es/input/Password'
import { useTranslation } from 'react-i18next'
import { REGEX } from '~/constants'
import { siteService } from '~/service'

interface UserFormArgs {
  form: FormInstance;
  user?: UserDto,
  onFinish: (values: any) => void,
}

const FormData: React.FC<UserFormArgs> = (args) => {
  const { t } = useTranslation()

  const [sites, setSites] = useState<SiteDto[]>([])
  const [departments, setDepartments] = useState<DepartmentDto[]>([])

  useEffect(() => {
    siteService.findAll().then((response) => {
      setSites(response?.data)
    })
  }, [])

  useEffect(() => {
    if (args.user) {
      args.form.setFieldsValue({
        firstName: args.user.firstName,
        lastName: args.user.lastName,
        password: '',
        cPassword: '',
        username: args.user.username,
        phoneNumber: args.user.phoneNumber,
        email: args.user.email,
        enable: args.user.enable,
        countryCode: args.user.countryCode,
        gender: args.user.gender,
        departmentId: args.user.departmentId
      })
    }
  }, [args.user])

  const fetchDepartment = (siteId: string) => {
    // departmentService.filter()
    console.log(siteId)
  }

  const onPhoneNumberChange = (value: string) => {
    value &&
    args.form.setFieldsValue({
      phoneNumber: value
    })
  }

  const onCountryCodeChange = (value: string) => {
    value &&
    args.form.setFieldsValue({
      countryCode: value
    })
  }


  return (
    <FormDataWrapper>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={args.form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={args.onFinish}
        labelAlign='left'
      >
        <Form.Item className={'mb-3'} label={t('common.field.name')}>
          <Space className={'w-full'} size={8} classNames={{ item: 'flex-1' }}>
            <Form.Item style={{ marginBottom: 'unset' }} name='firstName' rules={[{ required: true }]}>
              <SharedInput disabled={!!args.user}
                           placeholder={t('common.placeholder.first_name')}></SharedInput>
            </Form.Item>
            <Form.Item style={{ marginBottom: 'unset' }} name='lastName' rules={[{ required: true }]}>
              <SharedInput disabled={!!args.user}
                           placeholder={t('common.placeholder.last_name')}></SharedInput>
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.username')} name='username'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!args.user} placeholder={t('common.placeholder.username')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.password')} name='password'
                   rules={[{ required: !args.user }]}>
          <Password placeholder={t('common.placeholder.password')} rootClassName='vms-input' />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.verify_password')}
                   name='cPassword' rules={[{ required: !args.user },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The new password that you entered do not match!'))
            }
          })]}>
          <Password placeholder={t('common.placeholder.verify_password')} rootClassName='vms-input' />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.phoneNumber')}>
          <SharedPhoneNumber
            defaultValue={{ countryCode: args.user?.countryCode as any, phone: args.user?.phoneNumber as any }}
            onChangeCode={onCountryCodeChange}
            onChangePhone={onPhoneNumberChange} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.email')} name='email'
                   rules={[{ required: true }, { pattern: REGEX.EMAIL, message: t('common.error.email_valid') }]}>
          <SharedInput inputMode={'email'} placeholder={t('common.placeholder.email')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.gender')} name={'gender'}>
          <SharedSelect options={[{ label: 'MALE', value: 'MALE' }, { label: 'FEMALE', value: 'FEMALE' }, {
            label: 'OTHER',
            value: 'OTHER'
          }]} placeholder={t('common.placeholder.gender')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.department')} name='departmentId'
                   rules={[{ required: true }]}>
          <Space className={'w-full'} size={8} classNames={{ item: 'flex-1' }}>
            <Form.Item style={{ marginBottom: 'unset' }} name='firstName' rules={[{ required: true }]}>
              <SharedSelect options={sites.map((site) => {
                return { label: site.name, value: site.id, key: site.id }
              }) ?? []}
                            onChange={fetchDepartment}
                            placeholder={t('common.placeholder.site')}></SharedSelect>
            </Form.Item>
            <Form.Item style={{ marginBottom: 'unset' }} name='lastName' rules={[{ required: true }]}>
              <SharedSelect options={departments.map((department) => {
                return { label: department.name, value: department.id, key: department.id }
              }) ?? []}
                            placeholder={t('common.placeholder.department')}></SharedSelect>
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.used')} name='enable'
                   rules={[{ required: true }]}>
          <Radio.Group name='enable'>
            <Space>
              <Radio value={true}>{t('common.label.use')}</Radio>
              <Radio value={false}>{t('common.label.not_use')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {!!args.user &&
          <>
            <Divider style={{ margin: '10px 0' }} />
            <Row>
              <Col span={6}>{t('common.field.registration_date')}</Col>
              <Col span={7}>{args.user.createdOn}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{args.user.lastUpdatedOn}</Col>
            </Row>
          </>
        }
      </Form>
    </FormDataWrapper>
  )
}

export default FormData
