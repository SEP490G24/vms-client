import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Commune, District, SiteDto } from '~/interface'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateSiteInfo } from '~/service'
import { Data } from '~/data'
import TextArea from 'antd/es/input/TextArea'

interface CreateSiteFormArgs {
  site?: SiteDto
  onSave: (site: CreateSiteInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateSiteFormArgs> = (props) => {
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

  useEffect(() => {
    if (props.site) {
      form.setFieldsValue({
        name: props.site.name,
        phoneNumber: props.site.phoneNumber,
        province: props.site.province,
        district: props.site.district,
        ward: props.site.ward,
        address: props.site.address,
        taxCode: props.site.taxCode,
        description: props.site.description,
        enable: props.site.enable
      })
    }
  }, [props.site])

  const onFinish = (values: any) => {
    props.onSave(values)
  }

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper
      title={t(!!props.site ? 'organization.site.popup.title-edit' : 'organization.site.popup.title-add')}
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
        <Form.Item className={'mb-3'} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'text'} placeholder={t('common.placeholder.site_name')} />
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
        {!!props.site &&
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
              <Col span={7}>{props.site.createdOn}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{props.site.lastUpdatedOn}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
