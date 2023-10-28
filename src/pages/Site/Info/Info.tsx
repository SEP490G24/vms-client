import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateSiteInfo } from '~/service'
import TextArea from 'antd/es/input/TextArea'
import {
  fetchCommune,
  fetchDistrict,
  fetchProvince,
  locationsSelector, resetCommune,
  resetDistrict
} from '~/redux/slices/locationSlice.ts'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '~/redux'
import { sitesSelector } from '~/redux/slices/siteSlice.ts'
import moment from 'moment/moment'

interface CreateSiteFormArgs {
  onSave: (site: CreateSiteInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateSiteFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const { siteSelected } = useSelector(sitesSelector)
  const { communes, districts, provinces } = useSelector(locationsSelector)
  const provinceId = Form.useWatch('provinceId', form)
  const districtId = Form.useWatch('districtId', form)

  useEffect(() => {
    provinceId ? dispatch(fetchDistrict(provinceId) as any) : dispatch(resetDistrict())
  }, [provinceId])

  useEffect(() => {
    districtId ? dispatch(fetchCommune(districtId) as any) : dispatch(resetCommune())
  }, [districtId])

  useEffect(() => {
    !provinces.length && dispatch(fetchProvince() as any)
  }, [])

  useEffect(() => {
    if (siteSelected) {
      form.setFieldsValue({
        name: siteSelected.name,
        phoneNumber: siteSelected.phoneNumber,
        provinceId: siteSelected.provinceId,
        districtId: siteSelected.districtId,
        communeId: siteSelected.communeId,
        address: siteSelected.address,
        taxCode: siteSelected.taxCode,
        description: siteSelected.description,
        enable: siteSelected.enable
      })
    }
    console.log(siteSelected)
  }, [siteSelected])

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper
      title={t(!!siteSelected ? 'organization.site.popup.title-edit' : 'organization.site.popup.title-add')}
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
        <Form.Item className={'mb-3'} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'text'} placeholder={t('common.placeholder.site_name')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.phoneNumber')} name='phoneNumber'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'tel'} placeholder={t('common.placeholder.phoneNumber')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.province')} name='provinceId'
                   rules={[{ required: true }]}>
          <SharedSelect options={provinces.map((province) => {
            return { label: province.name, value: province.id, key: province.id }
          })}
                        placeholder={t('common.placeholder.province')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.district')} name='districtId'
                   rules={[{ required: true }]}>
          <SharedSelect
            options={districts?.map((district) => {
              return { label: district.name, value: district.id, key: district.id }
            }) ?? []}
            placeholder={t('common.placeholder.district')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.commune')} name='communeId'
                   rules={[{ required: true }]}>
          <SharedSelect options={communes?.map((commune) => {
            return { label: commune.name, value: commune.id, key: commune.id }
          }) ?? []}
                        placeholder={t('common.placeholder.commune')} />
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
        {!!siteSelected &&
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
              <Col span={7}>{moment(siteSelected.createdOn).format('L')}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{siteSelected.lastUpdatedOn ? moment(siteSelected.lastUpdatedOn).format('L') : null}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
