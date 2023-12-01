import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeviceDto, RoomDto } from '~/interface'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateRoomInfo } from '~/service'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'
import deviceService from '~/service/deviceService.ts'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { AuthSection } from '~/auth'
import { SCOPE_ROLE_MAP } from '~/role'
import { REGEX } from '~/constants'

interface CreateRoomFormArgs {
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
  room?: RoomDto
  onSave: (room: CreateRoomInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateRoomFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [devices, setDevices] = useState([])
  const { sites } = useSelector(sitesSelector)
  useEffect(() => {
    deviceService.findAll().then((response) => {
      setDevices(response.data)
    })
  }, [props.room,props.open])

  useEffect(() => {
    if (props.open) {
      if (props.room) {
        form.setFieldsValue({
          name: props.room.name,
          code: props.room.code,
          siteName: props.room.siteName,
          siteId: props.room.siteId,
          description: props.room.description,
          enable: props.room.enable,
          macIp: props.room.macIp
        })
      } else {
        form.resetFields()
      }
    }
  }, [props.room, props.open])

  const onClose = () => {
    form.resetFields()
    props.onClose()
  }

  return (
    <InfoWrapper
      open={props.open}
      confirmLoading={props.confirmLoading}
      width={props.width}
      footer={null}
      closable={false}
      title={t(!!props.room ? 'organization.room.popup.title-edit' : 'organization.room.popup.title-add')}
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
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true },{ pattern: REGEX.NAME, message: t('common.error.name_valid') }]}>
          <SharedInput placeholder={t('common.placeholder.site_name')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'
                   rules={[{ required: true },{ pattern: REGEX.CODE, message: t('common.error.code_valid') }]}>
          <SharedInput disabled={!!props.room} placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                     rules={[{ required: true }]}>
            <SharedSelect
              options={sites.map((site) => {
                return { label: site.name, value: site.id, key: site.id }
              }) ?? []}
              disabled={!!props.room}
              placeholder={t('common.placeholder.site')}
            ></SharedSelect>
          </Form.Item>
        </AuthSection>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.device')} name='deviceId'>
          <SharedSelect
            value={'props.room?.macIp'}
            options={devices.map((room: DeviceDto) => {
              return { label: room.name, value: room.id, key: room.id }
            }) ?? []}
            placeholder={t('common.placeholder.device')}
          ></SharedSelect>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description' rules={[{pattern:REGEX.DESCRIPTION,message:t('common.error.description_valid')}]}>
          <TextArea
            showCount
            maxLength={250}
            className={'h-[200px] resize-none'}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
        {!!props.room &&
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
              <Col span={7}>{moment(props.room.createdOn).format('L')}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{props.room.lastUpdatedOn ? moment(props.room.lastUpdatedOn).format('L') : null}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
