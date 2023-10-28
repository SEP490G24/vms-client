import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { DepartmentDto, SiteDto, TemplateDto } from '~/interface'
import { SharedInput, SharedPhoneNumber, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateTemplateInfo, departmentService, siteService } from '~/service'
import Password from 'antd/es/input/Password'
import { REGEX } from '~/constants'
import { SharedTextArea } from '~/common/SharedTextArea'

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
        name: props.template.name,
        code: props.template.code,
        subject: props.template.subject,
        type: props.template.type,
        enable: props.template.enable,
        body: props.template.body,
        description: props.template.description,
        departmentId: props.template.departmentId,
        createdOn: props.template.createdOn,
        lastUpdatedOn:props.template.createdOn
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
        <Form.Item className={'mb-3'} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!props.template} placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.name')} name='name' rules={[{ required: true }]}>
              <SharedInput placeholder={t('common.placeholder.template_name')}></SharedInput>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.type')} name='type' rules={[{ required: true}]}>
          <SharedSelect options={[{ label: 'EMAIL', value: 'EMAIL' }, { label: 'SMS', value: 'SMS' },]} placeholder={t('common.placeholder.type')} />
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
        <Form.Item className={'mb-3'} label={t('common.field.subject')} name='subject'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.subject')} />
        </Form.Item>
        <Form.Item className='mb-3' label={t('common.field.body')} name='body' rules={[{required: true}]}>
          <SharedTextArea></SharedTextArea>
        </Form.Item>
        <Form.Item className='mb-3' label={t('common.field.description')} name='description' rules={[{required: true}]}>
          <SharedInput placeholder={t('common.placeholder.description')}></SharedInput>
        </Form.Item>
        {/*{!!props.template &&*/}
        {/*  <>*/}
        {/*    <Divider style={{ margin: '10px 0' }} />*/}
        {/*    <Row>*/}
        {/*      <Col span={6}>{t('common.field.registration_date')}</Col>*/}
        {/*      <Col span={7}>{props.template.createdOn}</Col>*/}
        {/*      <Col span={5}>{t('common.field.modification_date')}</Col>*/}
        {/*      <Col span={6}>{props.template.lastUpdatedOn}</Col>*/}
        {/*    </Row>*/}
        {/*  </>*/}
        {/*}*/}
      </Form>
    </InfoWrapper>
  )
}

export default Info
