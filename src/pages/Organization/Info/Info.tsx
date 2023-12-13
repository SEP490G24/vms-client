import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import { SharedInput } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateOrganizationInfo } from '~/service'
import moment from 'moment/moment'
import { OrganizationDto } from '~/interface'

interface CreateOrganizationFormArgs {
  organization?: OrganizationDto
  onSave: (organization: CreateOrganizationInfo) => void
  onClose: () => void
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
}

const Info: React.FC<CreateOrganizationFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  useEffect(() => {

    form.resetFields()
    if (props.organization) {
      form.setFieldsValue({
        name: props.organization.name,
        code: props.organization.code,
        website: props.organization.website,
        representative: props.organization.representative,
        enable: props.organization.enable,
        createdOn: props.organization.createdOn,
      })
    }
  })

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper
      title={t(!!props.organization ? 'organization.organization.popup.title-edit' : 'organization.organization.popup.title-add')}
      onOk={form.submit}
      onCancel={onClose}
      open={props.open}
      confirmLoading={props.confirmLoading}
      width={props.width}
      footer={null}
      closable={false}
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
        <Form.Item className={'mb-3'} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput
            disabled={!!props.organization}
            placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'text'} placeholder={t('common.placeholder.organization_name')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.website')} name='website'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'text'} placeholder={t('common.placeholder.website')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.representative')} name='representative'>
          <SharedInput placeholder={t('common.placeholder.representative')} />
        </Form.Item>
        {!!props.organization &&
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
              <Col span={7}>{moment(props.organization.createdOn).format('DD/MM/YYYY')}</Col>
            </Row>
          </>
        }

      </Form>
    </InfoWrapper>
  )
}

export default Info
