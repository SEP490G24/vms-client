import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Commune, District, MeetingDto } from '~/interface'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateMeetingInfo } from '~/service'
import { SharedInput, SharedSelect } from '~/common'
import { Data } from '~/data'
import TextArea from 'antd/es/input/TextArea'

interface MeetingInfoArgs {
  meeting?: MeetingDto
  onSave: (meeting: CreateMeetingInfo) => void
  onClose: () => void
}

const Info: React.FC<MeetingInfoArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [provinceSelected, setProvinceSelected] = useState('')
  const [districtSelected, setDistrictSelected] = useState('')
  const [districts, setDistricts] = useState<District[]>()
  const [communes, setCommunes] = useState<Commune[]>()

  useEffect(() => {
    const _provinceId = Data.PROVINCE.find((province) => province.name === provinceSelected)?.id
    setDistricts(Data.DISTRICT.filter((district) => district.provinceId == _provinceId))
  }, [provinceSelected])

  useEffect(() => {
    const _districtId = Data.DISTRICT.find((district) => district.name === districtSelected)?.id
    setCommunes(Data.COMMUNE.filter((commune) => commune.districtId == _districtId))
  }, [districtSelected])

  const onFinish = (values: any) => {
    props.onSave(values)
  }

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  useEffect(() => {
    if (props.meeting) {
      form.setFieldsValue({
        name: props.meeting.name,
        phoneNumber: props.meeting.phoneNumber,
        province: props.meeting.province,
        district: props.meeting.district,
        ward: props.meeting.ward,
        address: props.meeting.address,
        taxCode: props.meeting.taxCode,
        description: props.meeting.description,
        enable: props.meeting.enable
      })
    }
  }, [props.meeting])

  return (
    <InfoWrapper
      title={t(!!props.meeting ? 'organization.meeting.popup.title-edit' : 'organization.meeting.popup.title-add')}
      onCancel={onClose}
      onOk={form.submit}
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
        <Form.Item className={'mb-3'} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'text'} placeholder={t('common.placeholder.meeting_name')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.phoneNumber')} name='phoneNumber'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'tel'} placeholder={t('common.placeholder.phoneNumber')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.province')} name='province'
                   rules={[{ required: true }]}>
          <SharedSelect options={Data.PROVINCE.map((province) => {
            return { label: province.name, value: province.name, key: province.id }
          })}
                        onChange={setProvinceSelected}
                        placeholder={t('common.placeholder.province')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.district')} name='district'
                   rules={[{ required: true }]}>
          <SharedSelect options={districts?.map((district) => {
            return { label: district.name, value: district.name, key: district.id }
          }) ?? []}
                        onChange={setDistrictSelected}
                        placeholder={t('common.placeholder.district')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.ward')} name='ward'
                   rules={[{ required: true }]}>
          <SharedSelect options={communes?.map((commune) => {
            return { label: commune.name, value: commune.name, key: commune.id }
          }) ?? []}
                        placeholder={t('common.placeholder.ward')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.address')} name='address'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.address')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.taxCode')} name='taxCode'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.taxCode')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description'>
          <TextArea
            showCount
            maxLength={200}
            className={'h-[200px] resize-none'}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
        {!!props.meeting &&
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
              <Col span={7}>{props.meeting.createdOn}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{props.meeting.lastUpdatedOn}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info