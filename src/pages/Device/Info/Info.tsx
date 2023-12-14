import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import { DeviceDto } from '~/interface'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateDeviceInfo } from '~/service'
import TextArea from 'antd/es/input/TextArea'
import { SCOPE_ROLE_MAP } from '~/role'
import { AuthSection } from '~/auth'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import moment from 'moment'

interface CreateDeviceFormArgs {
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
  device?: DeviceDto
  onSave: (department: CreateDeviceInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateDeviceFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { sites } = useSelector(sitesSelector)

  useEffect(() => {
    if (props.open) {
      if (props.device) {
        form.setFieldsValue({
          name: props.device.name,
          code: props.device.code,
          macIp: props.device.macIp,
          siteId: props.device.siteId,
          description: props.device.description,
          enable: props.device.enable,
          deviceType: props.device.deviceType,
        })
      } else {
        form.resetFields()
        form.setFieldsValue({ enable: true })
      }
    }
  }, [props.device, props.open])

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
      title={t(!!props.device ? 'organization.device.popup.title-edit' : 'organization.device.popup.title-add')}
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
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!props.device} placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.name')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.macIp')} rules={[{ required: true }]} name='macIp'>
          <SharedInput placeholder={t('common.placeholder.macIp')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.deviceType')} name='deviceType'
                   rules={[{ required: true }]}>
          <SharedSelect options={[{ label: 'SCAN_CARD', value: 'SCAN_CARD' }, { label: 'DOOR', value: 'DOOR' }]}
                        placeholder={t('common.placeholder.device_type')}></SharedSelect>
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                     rules={[{ required: true }]}>
            <SharedSelect
              options={sites.map((site) => {
                return { label: site.name, value: site.id, disabled: !site.enable }
              }) ?? []}
              disabled={!!props.device}
              placeholder={t('common.placeholder.site')}
            ></SharedSelect>
          </Form.Item>
        </AuthSection>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description'>
          <TextArea
            showCount
            maxLength={200}
            className={'h-[200px] resize-none'}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
        {!!props.device &&
          <>
            <Form.Item style={{ marginBottom: '12px' }} label={t('common.label.enable')} name='enable'
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
              <Col span={7}>{moment(props.device.createdOn).format('DD/MM/YYYY')}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{moment(props.device.lastUpdatedOn).format('DD/MM/YYYY')}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
