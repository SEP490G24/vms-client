import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { DepartmentDto, RoleDto, SiteDto, UserDto } from '~/interface'
import { Gender } from '~/constants'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateUserInfo, departmentService, roleService } from '~/service'
import Password from 'antd/es/input/Password'
import { REGEX } from '~/constants'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux/slices/siteSlice.ts'
import { checkPermission, enumToArray } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'
import { AuthSection } from '~/auth'

interface CreateUserFormArgs {
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
  user?: UserDto
  onSave: (user: CreateUserInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateUserFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [siteId, setSiteId] = useState('')
  const { sites } = useSelector(sitesSelector)
  const [departments, setDepartments] = useState<DepartmentDto[]>([])
  const [roles, setRoles] = useState<RoleDto[]>([])

  useEffect(() => {
    if (checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) {
      siteId && departmentService.filter({ siteIds: siteId ? [siteId] : [] }).then((response) => setDepartments(response.data))
      siteId && roleService.filter({ attributes: { 'siteId': siteId ? [siteId] : [] } }).then((response) => setRoles(response.data))
    } else {
      departmentService.filter({}).then((response) => setDepartments(response.data))
      roleService.filter({ attributes: { 'siteId': [] } }).then((response) => setRoles(response.data))
    }

  }, [siteId])


  useEffect(() => {
    if (props.open) {
      if (props.user) {
        setSiteId(props.user.siteId ?? '')
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
          gender: props.user.gender,
          departmentId: props.user.departmentId,
          siteId: props.user.siteId
        })
      } else {
        form.resetFields()
        form.setFieldsValue({enable: true})
      }
    }
  }, [props.user, props.open])

  const onClose = () => {
    setSiteId('')
    props.onClose()
  }

  return (
    <InfoWrapper
      open={props.open}
      confirmLoading={props.confirmLoading}
      width={props.width}
      footer={null}
      closable={false}
      title={t(!!props.user ? 'organization.user.popup.title-edit' : 'organization.user.popup.title-add')}
      onOk={form.submit}
      onCancel={onClose}
    >
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
        <Form.Item className={'mb-3'} label={t('common.field.username')} name='username'
                   rules={[{ required: true }, { max: 50 }]}>
          <SharedInput disabled={!!props.user} placeholder={t('common.placeholder.username')} maxLength={50} showCount />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.name')}>
          <Space className={'w-full'} size={8} classNames={{ item: 'flex-1' }}>
            <Form.Item style={{ marginBottom: 'unset' }} name='firstName' rules={[{ required: true }]}>
              <SharedInput placeholder={t('common.placeholder.first_name')}></SharedInput>
            </Form.Item>
            <Form.Item style={{ marginBottom: 'unset' }} name='lastName' rules={[{ required: true }]}>
              <SharedInput placeholder={t('common.placeholder.last_name')}></SharedInput>
            </Form.Item>
          </Space>
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
        <Form.Item className={'mb-3'} label={t('common.field.email')} name='email'
                   rules={[{ required: true }, { pattern: REGEX.EMAIL, message: t('common.error.email_valid') }]}>
          <SharedInput inputMode={'email'} placeholder={t('common.placeholder.email')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.gender')} name={'gender'}>
          <SharedSelect
            options={enumToArray(Gender).map(item => {
              return { label: item.key, value: item.value }
            })}
            placeholder={t('common.placeholder.gender')} />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item className={'mb-3'} label={t('common.field.site.name')} name='siteId'
                     rules={[{ required: true }]}>
            <SharedSelect options={sites.map((site: SiteDto) => {
              return { label: site.name, value: site.id, disabled: !site.enable }
            }) ?? []}
                          onChange={setSiteId}
                          placeholder={t('common.placeholder.site')}></SharedSelect>
          </Form.Item>
        </AuthSection>
        {((checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && siteId) || !checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) &&
          <>
            <Form.Item className={'mb-3'} label={t('common.field.department')} name='departmentId'
                       rules={[{ required: true }]}>
              <SharedSelect
                options={departments.map((department) => {
                  return { label: department.name, value: department.id, disabled: !department.enable }
                }) ?? []}
                placeholder={t('common.placeholder.department')}></SharedSelect>
            </Form.Item>
            <Form.Item className={'mb-3'} label={t('common.field.roles')} name='roles'
                       rules={[{ required: true }]}>
              <SharedSelect
                mode={'multiple'} allowClear className={'w-full'}
                placeholder={t('common.placeholder.roles')}
                options={roles.map((role) => {
                  return { label: role.code, value: role.code }
                })} />
            </Form.Item>
          </>
        }
        <Form.Item className={'mb-3'} label={t('common.field.phoneNumber')} name={'phoneNumber'}
                   rules={[{ required: true },
                     { pattern: REGEX.PHONE, message: t('common.error.phoneNumber_valid') }]}>
          <SharedInput inputMode={'tel'} placeholder={t('common.placeholder.phoneNumber')} />
        </Form.Item>
        {!!props.user &&
          <>
          <Form.Item className={'mb-3'} label={t('common.field.status')} name='enable'
                     rules={[{ required: true }]}>
            <Radio.Group name='enable'>
              <Space>
                <Radio value={true}>{t('common.label.enable')}</Radio>
                <Radio value={false}>{t('common.label.disable')}</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
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
