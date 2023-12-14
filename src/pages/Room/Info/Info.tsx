import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { DeviceDto, RoomDto } from '~/interface'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateRoomInfo } from '~/service'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { AuthSection } from '~/auth'
import { SCOPE_ROLE_MAP } from '~/role'
import { REGEX } from '~/constants'
import deviceService from '../../../service/deviceService.ts'
import { checkPermission } from '~/utils'

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
  const { sites } = useSelector(sitesSelector)
  const [devices, setDevices] = useState<DeviceDto[]>([])

  useEffect(() => {
    setDevices([])
    if (checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) {
      if (props.room) {
        findDeviceBySite(props.room.siteId)
      }
    } else {
      deviceService.findAll().then((response) => {
        setDevices(response.data)
      })
    }
  }, [props.open])

  const findDeviceBySite = (siteId: string) => {
    deviceService.findBySiteId(siteId).then((response) => {
      setDevices(response.data)
    })
  }

  const onSelectSite = (siteId: string) => {
    findDeviceBySite(siteId)
  }

  useEffect(() => {
    if (props.open) {
      if (props.room) {
        if (props.room.deviceId) {
          setDevices([...devices, { id: props.room.deviceId, name: props.room.deviceName }])
        }
        form.setFieldsValue({
          name: props.room.name,
          code: props.room.code,
          siteName: props.room.siteName,
          siteId: props.room.siteId,
          deviceId: props.room.deviceId,
          description: props.room.description,
          enable: props.room.enable,
          macIp: props.room.macIp,
        })
      } else {
        form.resetFields()
        form.setFieldsValue({ enable: true })
      }
    }
  }, [props.room, props.open])
  const onClose = () => {
    form.resetFields()
    if (props.room?.deviceId) {
      setDevices([...devices.slice(0, -1)])
    }
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
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'
                   rules={[{ required: true }, { pattern: REGEX.CODE, message: t('common.error.code_valid') }]}>
          <SharedInput disabled={!!props.room} placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }, { max: 50 }]}>
          <SharedInput placeholder={t('common.placeholder.name')} maxLength={50} showCount />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                     rules={[{ required: true }]}>
            <SharedSelect
              options={sites.map((site) => {
                return { label: site.name, value: site.id, disabled: !site.enable }
              }) ?? []}
              onChange={(value) => onSelectSite(value)}
              disabled={!!props.room}
              placeholder={t('common.placeholder.site')}
            ></SharedSelect>
          </Form.Item>
        </AuthSection>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.device')} name='deviceId'>
          <SharedSelect
            allowClear
            options={devices.map((room: DeviceDto) => {
              return { label: room.name, value: room.id }
            }) ?? []}
            placeholder={t('common.placeholder.device')}
          ></SharedSelect>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description'
                   rules={[{ max: 250 }]}>
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
