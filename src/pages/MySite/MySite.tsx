import { Card, Col, Form, FormInstance, message, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { SharedButton, SharedInput, SharedSelect } from '~/common'
import { OrganizationWrapper } from './styles'
import { REGEX } from '~/constants'
import { SiteDto } from '~/interface'
import siteService from '~/service/siteService.ts'
import { useLocation } from '~/hook'

const MySite = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)
  const [mySite, setMySite] = useState<SiteDto>()
  let provinceId = Form.useWatch('provinceId', form)
  let districtId = Form.useWatch('districtId', form)

  let { communes, districts, provinces } = useLocation(provinceId, districtId)
  useEffect(() => {
    siteService.getMySite().then((res) => {
      setMySite(res.data)
    })
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      name: mySite?.name,
      code: mySite?.code,
      enable: mySite?.enable,
      provinceId: mySite?.provinceId,
      communeId: mySite?.communeId,
      districtId: mySite?.districtId,
      address: mySite?.address,
      taxCode: mySite?.taxCode,
      phoneNumber: mySite?.phoneNumber,
    })
    console.log('tec ' + mySite)
  }, [mySite])

  const onFinish = async (values: any) => {
    // let logoUrl = undefined
    // if (logo?.file) {
    //   await fileService.uploadRcFile(logo?.file).then((response) => {
    //     logoUrl = response.data.name
    //   })
    //   payload = {
    //     ...payload, logo: logoUrl
    //   }
    // }
    if (mySite) {
      const request = siteService.update(mySite.id, values)
      await request
        .then((resp) => {
          if (resp?.data) {
            message.success(resp.data.message)
          }
        })
        .catch((resp) => {
          message.error(resp.data.message)
        })
    }

  }
  const resetDistrictAndCommune = () => {
    form.resetFields(['districtId', 'communeId'])
  }
  const resetDistrictCombobox = () => {
    form.resetFields(['communeId'])
  }


  return (
    <OrganizationWrapper>
      <h2 className='page-header-text'>{t('common.field.my_site_info')}</h2>
      <PerfectScrollbar>
        <Row className={'m-0'} style={{ maxHeight: 'calc(100vh - 160px)' }}>
          <Col span={24}>
            <Card
              title={t('common.field.my_site_info')}
              extra={
                <SharedButton
                  type='primary'
                  onClick={form.submit}
                >
                  {t('common.label.save')}
                </SharedButton>
              }
              bordered={false}
              className='slx-card'
            >
              <Row align='top'>
                <Col span={3}>
                  {/*<SharedAvatar url={logo?.content.url ?? BASE_STORAGE + mySite.logo}*/}
                  {/*              name={mySite?.name}*/}
                  {/*              onChange={onChaneLogo} />*/}
                </Col>
                <Col span={15}>
                  <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout={'horizontal'}
                    form={form}
                    initialValues={{ layout: 'horizontal' }}
                    colon={false}
                    labelAlign='left'
                    ref={formRef}
                    className='slx-form'
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label={t('common.field.name')}
                      name='name'
                      rules={[{ required: true }]}
                    >
                      <SharedInput placeholder={t('common.placeholder.organizationName')} />
                    </Form.Item>
                    <Form.Item label={t('common.field.code')} name='code' rules={[{ required: true }]}>
                      <SharedInput disabled placeholder={t('common.placeholder.code')} />
                    </Form.Item>
                    <Form.Item label={t('common.field.province')} name='provinceId'
                               rules={[{ required: true }]}>
                      <SharedSelect options={provinces.map((province) => {
                        return { label: province.name, value: province.id, key: province.id }
                      })}
                                    onChange={resetDistrictAndCommune}
                                    placeholder={t('common.placeholder.province')} />
                    </Form.Item>
                    <Form.Item label={t('common.field.district')} name='districtId'
                               rules={[{ required: true }]}>
                      <SharedSelect
                        options={districts?.map((district) => {
                          return { label: district.name, value: district.id, key: district.id }
                        }) ?? []}
                        disabled={!provinceId}
                        onChange={resetDistrictCombobox}
                        placeholder={t('common.placeholder.district')} />
                    </Form.Item>
                    <Form.Item label={t('common.field.commune')} name='communeId'
                               rules={[{ required: true }]}>
                      <SharedSelect options={communes?.map((commune) => {
                        return { label: commune.name, value: commune.id, key: commune.id }
                      }) ?? []}
                                    disabled={!districtId}
                                    placeholder={t('common.placeholder.commune')} />
                    </Form.Item>
                    <Form.Item label={t('common.field.address')} name='address'
                               rules={[{ required: true }]}>
                      <SharedInput placeholder={t('common.placeholder.address')} />
                    </Form.Item>
                    <Form.Item
                      label={t('common.field.taxCode')}
                      name='taxCode'
                      rules={[{ required: true }]}
                    >
                      <SharedInput placeholder={t('common.placeholder.taxCode')} />
                    </Form.Item>
                    <Form.Item
                      label={t('common.field.contact_phone_number')}
                      name='phoneNumber'
                      rules={[{ required: true }, {
                        pattern: REGEX.PHONE,
                        message: t('common.error.phoneNumber_valid'),
                      }]}
                    >
                      <SharedInput
                        placeholder={t('common.field.contact_phone_number')}
                        inputMode={'tel'}
                      />
                    </Form.Item>
                    {/*<Form.Item*/}

                    {/*  label={t('common.field.description')}*/}
                    {/*  name='description'*/}
                    {/*>*/}
                    {/*  <TextArea*/}
                    {/*    showCount*/}
                    {/*    maxLength={200}*/}
                    {/*    className={'h-[200px] resize-none'}*/}
                    {/*    placeholder={t('common.placeholder.description')}*/}
                    {/*  />*/}
                    {/*</Form.Item>*/}
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}></Col>
        </Row>
      </PerfectScrollbar>
    </OrganizationWrapper>
  )
}

export default MySite
