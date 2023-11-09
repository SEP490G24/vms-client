import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { SiteDto, TemplateDto, TemplateType } from '~/interface'
import { SharedCkEditor, SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateTemplateInfo, siteService } from '~/service'
import moment from 'moment/moment'
import { enumToArray } from '~/utils'

interface CreateTemplateFormArgs {
  template?: TemplateDto
  onSave: (template: CreateTemplateInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateTemplateFormArgs> = (props) => {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm()

  const [sites, setSites] = useState<SiteDto[]>([])

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
        siteId: props.template.siteId,
        description: props.template.description,
        createdOn: props.template.createdOn,
        lastUpdatedOn: props.template.createdOn
      })
    }
  }, [props.template])

  const onFinish = (values: any) => {
    console.log(values)
    // props.onSave(values)
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
        <Form.Item className={'mb-3'} label={t('common.field.type')} name='type' rules={[{ required: true }]}>
          <SharedSelect
            options={enumToArray(TemplateType).map(item => {
              return { label: item.key, value: item.value }
            })}
            placeholder={t('common.placeholder.type')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                   rules={[{ required: true }]}>
          <SharedSelect options={sites.map((site) => {
            return { label: site.name, value: site.id, key: site.id }
          }) ?? []}
                        placeholder={t('common.placeholder.site')}></SharedSelect>
        </Form.Item>
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
                    feed: ['@{connectAgent}']
                  }
                ]
              },
              placeholder: t('common.placeholder.body')
            }}
            onChange={(_, editor) => {
              form.setFieldValue('body', editor.getData())
            }}
            data={'Test'}
            onMaxLengthSubceeded={() => {
              form.setFields([{ name: 'body', errors: [] }])
            }}
          />
          <span className={'text-[12px] text-[#ccc]'}>* Please enter @ to mention variable</span>
        </Form.Item>
        <Form.Item className='mb-3' label={t('common.field.description')} name='description'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.description')}></SharedInput>
        </Form.Item>
        {!!props.template &&
          <>
            <Form.Item className={'mb-3'} label={t('common.field.used')} name='enable'
                       rules={[{ required: true }]}>
              <Radio.Group name='enable'>
                <Space>
                  <Radio value={true}>{t('common.label.use')}</Radio>
                  <Radio value={false}>{t('common.label.not_use')}</Radio>
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
