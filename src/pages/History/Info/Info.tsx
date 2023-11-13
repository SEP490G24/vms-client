import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment/moment'
import { HistoryDto } from '~/interface'
import { useLocation } from '~/hook'
import { REGEX } from '~/constants'

interface CreateHistoryFormArgs {
  history?: HistoryDto
  onClose: () => void
}

const Info: React.FC<CreateHistoryFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  let provinceId = Form.useWatch('provinceId', form)
  let districtId = Form.useWatch('districtId', form)

  let { communes, districts, provinces } = useLocation(provinceId, districtId)

  useEffect(() => {
    if (props.history) {
      form.setFieldsValue({
        name: props.history.name,
        code: props.history.code,
        phoneNumber: props.history.phoneNumber,
        provinceId: props.history.provinceId,
        districtId: props.history.districtId,
        communeId: props.history.communeId,
        address: props.history.address,
        taxCode: props.history.taxCode,
        description: props.history.description,
        enable: props.history.enable
      })
    }
  }, [props.history])

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  const resetDistrictAndCommune = () => {
    form.resetFields(['districtId', 'communeId'])
  }
  const resetDistrictCombobox = () => {
    form.resetFields(['communeId'])
  }

  return (
    <InfoWrapper
      title={t(!!props.history ? 'organization.history.popup.title-edit' : 'organization.history.popup.title-add')}
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
        labelAlign='left'
      >
        <Form.Item className={'mb-3'} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput
            disabled={!!props.history}
            inputMode={'text'} placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'text'} placeholder={t('common.placeholder.history_name')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.phoneNumber')} name={'phoneNumber'}
                   rules={[{ required: true }, { pattern: REGEX.PHONE, message: t('common.error.phoneNumber_valid')}]}>
          <SharedInput inputMode={'tel'} placeholder={t('common.placeholder.phoneNumber')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.province')} name='provinceId'
                   rules={[{ required: true }]}>
          <SharedSelect options={provinces.map((province) => {
            return { label: province.name, value: province.id, key: province.id }
          })}
                        onChange={resetDistrictAndCommune}
                        placeholder={t('common.placeholder.province')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.district')} name='districtId'
                   rules={[{ required: true }]}>
          <SharedSelect
            options={districts?.map((district) => {
              return { label: district.name, value: district.id, key: district.id }
            }) ?? []}
            disabled={!provinceId}
            onChange={resetDistrictCombobox}
            placeholder={t('common.placeholder.district')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.commune')} name='communeId'
                   rules={[{ required: true }]}>
          <SharedSelect options={communes?.map((commune) => {
            return { label: commune.name, value: commune.id, key: commune.id }
          }) ?? []}
                        disabled={!districtId}
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
        {!!props.history &&
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
              <Col span={7}>{moment(props.history.createdOn).format('L')}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{props.history.lastUpdatedOn ? moment(props.history.lastUpdatedOn).format('L') : null}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
