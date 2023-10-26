import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { DepartmentDto, SiteDto, TemplateDto } from '~/interface'
import { SharedInput, SharedPhoneNumber, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateTemplateInfo, departmentService, siteService } from '~/service'
import Password from 'antd/es/input/Password'
import { REGEX } from '~/constants'

interface CreateTemplateFormArgs {
  template?: TemplateDto
  onSave: (template: CreateTemplateInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateTemplateFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [sites, setSites] = useState<SiteDto[]>([])
  const [departments, setDepartments] = useState<DepartmentDto[]>([])

  useEffect(() => {
    siteService.findAll().then((response) => {
      setSites(response?.data)
    })
  }, [])

  useEffect(() => {
    if (props.template) {
      form.setFieldsValue({
        firstName: props.template.firstName,
        lastName: props.template.lastName,
        password: '',
        cPassword: '',
        phoneNumber: props.template.phoneNumber,
        email: props.template.email,
        enable: props.template.enable,
        countryCode: props.template.countryCode,
        gender: props.template.gender,
        departmentId: props.template.departmentId
      })
    }
  }, [props.template])

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

  const onFinish = (values: any) => {
    props.onSave(values)
  }

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper
      title={t(!!props.template ? 'organization.template.popup.title-edit' : 'organization.template.popup.title-add')}
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
        onFinish={onFinish}
        labelAlign='left'
      >
        <Form.Item className={'mb-3'} label={t('common.field.name')}>
          <Space className={'w-full'} size={8} classNames={{ item: 'flex-1' }}>
            <Form.Item style={{ marginBottom: 'unset' }} name='firstName' rules={[{ required: true }]}>
              <SharedInput disabled={!!props.template}
                           placeholder={t('common.placeholder.first_name')}></SharedInput>
            </Form.Item>
            <Form.Item style={{ marginBottom: 'unset' }} name='lastName' rules={[{ required: true }]}>
              <SharedInput disabled={!!props.template}
                           placeholder={t('common.placeholder.last_name')}></SharedInput>
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.templatename')} name='templatename'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!props.template} placeholder={t('common.placeholder.templatename')} />
        </Form.Item>
        {!props.template &&
          <>
            <Form.Item className={'mb-3'} label={t('common.field.password')} name='password'
                       rules={[{ required: !props.template }]}>
              <Password placeholder={t('common.placeholder.password')} rootClassName='vms-input' />
            </Form.Item>
            <Form.Item className={'mb-3'} label={t('common.field.verify_password')}
                       name='cPassword' rules={[{ required: !props.template },
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
        <Form.Item className={'mb-3'} label={t('common.field.phoneNumber')}>
          <SharedPhoneNumber
            defaultValue={{
              countryCode: props.template?.countryCode as any,
              phone: props.template?.phoneNumber as any
            }}
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
        <Form.Item className={'mb-3'} label={t('common.field.used')} name='enable'
                   rules={[{ required: true }]}>
          <Radio.Group name='enable'>
            <Space>
              <Radio value={true}>{t('common.label.use')}</Radio>
              <Radio value={false}>{t('common.label.not_use')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {!!props.template &&
          <>
            <Divider style={{ margin: '10px 0' }} />
            <Row>
              <Col span={6}>{t('common.field.registration_date')}</Col>
              <Col span={7}>{props.template.createdOn}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{props.template.lastUpdatedOn}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
