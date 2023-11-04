import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { DepartmentDto, SiteDto, UserDto } from '~/interface'
import { SharedInput, SharedPhoneNumber, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateUserInfo, departmentService, roleService, siteService } from '~/service'
import Password from 'antd/es/input/Password'
import { REGEX } from '~/constants'
import { RoleDto } from '~/interface/Permission.ts'
import moment from 'moment'

interface CreateUserFormArgs {
  user?: UserDto
  onSave: (user: CreateUserInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateUserFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [roles, setRoles] = useState<RoleDto[]>([])
  const [sites, setSites] = useState<SiteDto[]>([])
  const [departments, setDepartments] = useState<DepartmentDto[]>([])

  useEffect(() => {
    siteService.findAll().then((response) => {
      setSites(response?.data)
    })
    roleService.getAll().then((response) => {
      setRoles(response?.data)
    })
  }, [])

  useEffect(() => {
    console.log(props.user)
    if (props.user) {
      form.setFieldsValue({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        password: '',
        cPassword: '',
        username: props.user.username,
        roles: props.user.roles,
        phoneNumber: props.user.phoneNumber,
        email: props.user.email,
        enable: props.user.enable,
        countryCode: props.user.countryCode,
        gender: props.user.gender,
        departmentId: props.user.departmentId
      })
    }
  }, [props.user])

  const fetchDepartment = (siteId: string) => {
    form.setFieldsValue({
      departmentId: ''
    })
    departmentService.filter({ siteId }).then((response) => {
      setDepartments(response?.data)
    })
  }

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

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper title={t(!!props.user ? 'organization.user.popup.title-edit' : 'organization.user.popup.title-add')}
                 onOk={form.submit}
                 onCancel={onClose}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={props.onSave}
        labelAlign='left'
      >
        <Form.Item className={'mb-3'} label={t('common.field.name')}>
          <Space className={'w-full'} size={8} classNames={{ item: 'flex-1' }}>
            <Form.Item style={{ marginBottom: 'unset' }} name='firstName' rules={[{ required: true }]}>
              <SharedInput disabled={!!props.user}
                           placeholder={t('common.placeholder.first_name')}></SharedInput>
            </Form.Item>
            <Form.Item style={{ marginBottom: 'unset' }} name='lastName' rules={[{ required: true }]}>
              <SharedInput disabled={!!props.user}
                           placeholder={t('common.placeholder.last_name')}></SharedInput>
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.username')} name='username'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!props.user} placeholder={t('common.placeholder.username')} />
        </Form.Item>
        {!props.user &&
          <>
            <Form.Item className={'mb-3'} label={t('common.field.password')} name='password'
                       rules={[{ required: !props.user }]}>
              <Password placeholder={t('common.placeholder.password')} rootClassName='vms-input' />
            </Form.Item>
            <Form.Item className={'mb-3'} label={t('common.field.verify_password')}
                       name='cPassword' rules={[{ required: !props.user },
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
          </>
        }
        <Form.Item className={'mb-3'} label={t('common.field.roles')} name='roles'
                   rules={[{ required: true }]}>
          <SharedSelect mode={'multiple'} allowClear className={'w-full'} placeholder={t('common.placeholder.roles')}
                        options={roles.map((role) => {
                          return { label: role.name, value: role.name }
                        })} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.phoneNumber')}>
          <SharedPhoneNumber
            defaultValue={{ countryCode: props.user?.countryCode as any, phone: props.user?.phoneNumber as any }}
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
        <Form.Item className={'mb-3'} label={t('common.field.department')} name='department'>
          <Space className={'w-full'} size={8} classNames={{ item: 'flex-1' }}>
            <Form.Item style={{ marginBottom: 'unset' }} name='siteId' rules={[{ required: true }]}>
              <SharedSelect options={sites.map((site) => {
                return { label: site.name, value: site.id, key: site.id }
              }) ?? []}
                            onChange={fetchDepartment}
                            placeholder={t('common.placeholder.site')}></SharedSelect>
            </Form.Item>
            <Form.Item style={{ marginBottom: 'unset' }} name='departmentId' rules={[{ required: true }]}>
              <SharedSelect options={departments.map((department) => {
                return { label: department.name, value: department.id, key: department.id }
              }) ?? []}
                            placeholder={t('common.placeholder.department')}></SharedSelect>
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.status')} name='enable'
                   rules={[{ required: true }]}>
          <Radio.Group name='enable'>
            <Space>
              <Radio value={true}>{t('common.label.enable')}</Radio>
              <Radio value={false}>{t('common.label.disable')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {!!props.user &&
          <>
            <Divider style={{ margin: '10px 0' }} />
            <Row>
              <Col span={6}>{t('common.field.registration_date')}</Col>
              <Col span={7}>{moment(props.user.createdOn).format('L')}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{props.user.lastUpdatedOn ? moment(props.user.lastUpdatedOn).format('L') : null}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
