import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import { TemplateDto } from '~/interface'
import { TemplateVariable } from '~/constants'
import { TemplateType } from '~/constants'
import { SharedCkEditor, SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateTemplateInfo } from '~/service'
import moment from 'moment/moment'
import { enumToArray } from '~/utils'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { AuthSection } from '~/auth'
import { SCOPE_ROLE_MAP } from '~/role'

interface CreateTemplateFormArgs {
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
  template?: TemplateDto
  onSave: (template: CreateTemplateInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateTemplateFormArgs> = (props) => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm()

  const { sites } = useSelector(sitesSelector)

  useEffect(() => {
    if (props.open) {
      if (props.template) {
        form.setFieldsValue({
          name: props.template.name,
          code: props.template.code,
          subject: props.template.subject,
          type: props.template.type,
          enable: props.template.enable,
          body: props.template.body,
          siteId: props.template.siteId,
          description: props.template.description,
          createdOn: props.template.createdOn,
          lastUpdatedOn: props.template.createdOn,
        })
      }
    } else {
      form.resetFields()
      form.setFieldsValue({ enable: true })
    }
  }, [props.template, props.open])

  const onFinish = (values: any) => {
    props.onSave(values)
  }

  const onClose = () => {
    props.onClose()
  }

  return (
    <InfoWrapper
      open={props.open}
      confirmLoading={props.confirmLoading}
      width={props.width}
      footer={null}
      closable={false}
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
        <Form.Item className={'mb-3'} label={t('common.field.type')} name='type' rules={[{ required: true }]}>
          <SharedSelect
            options={enumToArray(TemplateType).map(item => {
              return { label: item.key, value: item.value }
            })}
            placeholder={t('common.placeholder.type')} />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                     rules={[{ required: true }]}>
            <SharedSelect options={sites.map((site) => {
              return { label: site.name, value: site.id, disabled: !site.enable }
            }) ?? []}
                          placeholder={t('common.placeholder.site')}></SharedSelect>
          </Form.Item>
        </AuthSection>

        <Form.Item className={'mb-3'} label={t('common.field.subject')} name='subject'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.subject')} />
        </Form.Item>
        <Form.Item className='mb-3' label={t('common.field.body')} name='body'>
          <SharedCkEditor
            id={i18n.language}
            config={{
              mention: {
                feeds: [
                  {
                    marker: '@',
                    feed: enumToArray(TemplateVariable).map(item => `@{${item.key}}`),
                  },
                ],
              },
              placeholder: t('common.placeholder.body'),
            }}
            onChange={(_, editor) => {
              form.setFieldValue('body', editor.getData())
            }}
            data={props.template?.body}
            onMaxLengthSubceeded={() => {
              form.setFields([{ name: 'body', errors: [] }])
            }}
          />
          <span className={'text-[12px] text-[#ccc]'}>* Please enter @ to mention variable</span>
        </Form.Item>
        <Form.Item className='mb-3' label={t('common.field.description')} name='description'>
          <SharedInput placeholder={t('common.placeholder.description')}></SharedInput>
        </Form.Item>
        {!!props.template &&
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
              <Col span={7}>{moment(props.template.createdOn).format('L')}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col
                span={6}>{props.template.lastUpdatedOn ? moment(props.template.lastUpdatedOn).format('L') : null}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
