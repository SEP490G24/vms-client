import { Card, Col, Form, FormInstance, Image, message, Row, Upload, UploadFile, UploadProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { SharedAvatar, SharedButton, SharedInput } from '~/common'
import { OrganizationEntity } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { baseUploadTemplate, toBase64 } from '~/utils'
import { checkPermission } from '~/utils/common'
import { organizationService } from '~/service'
import { ImageOutlined } from '~/icon'
import { OrganizationWrapper } from './styles'
import { REGEX } from '~/constants'

const Organization = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)
  const [organization, setOrganization] = useState<OrganizationEntity | null>()
  const [license, setLicense] = useState<UploadFile>()
  const [logo, setLogo] = useState<UploadFile>()


  useEffect(() => {
    organizationService.getMyOrganization().then((response) => {
      setOrganization(response?.data)
    })
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      name: organization?.name,
      email: organization?.email,
      code: organization?.code,
      representativeName: organization?.representativeName,
      representativePhone: organization?.representativePhone,
      website: organization?.website,
      businessRegistrationNumber: organization?.businessRegistrationNumber,
      businessLicenseFile: organization?.businessLicenseFile,
      about: organization?.about,
      contactInfo: organization?.contactInfo
    })
    !!organization?.businessLicenseFile && setLicense(baseUploadTemplate(organization.businessLicenseFile))
  }, [organization])

  const onFinish = (values: any) => {
    const payload = !!organization ? { ...values, id: organization.id } : values
    organizationService
      .updateMyOrganization(payload)
      .then((resp) => {
        if (resp?.status === 200 && resp?.data) {
          message.success(t('common.message.success'))
        } else {
          message.warning(t('common.message.warning'))
        }
      })
      .catch(() => {
        message.error(t('common.message.error'))
      })
  }

  const onChangeLicenses: UploadProps['onChange'] = async (data) => {
    const url = await toBase64(data.file)
    form.setFieldsValue({ businessLicenseFile: url })
    setLicense(
      {
        ...data.fileList,
        // @ts-ignore
        url: url
      }
    )
  }

  const onChaneLogo: UploadProps['onChange'] = async (data) => {
    const url = await toBase64(data.file)
    form.setFieldsValue({ logo: url })
    setLogo({
      ...data.fileList,
      // @ts-ignore
      url: url
    })
  }

  return (
    <OrganizationWrapper>
      <h2 className='page-header-text'>{t('organization.info.title')}</h2>
      {checkPermission(PERMISSION_ROLE_MAP.R_ORGANIZATION_FIND) && (
        <PerfectScrollbar>
          <Row className={'m-0'} style={{ maxHeight: 'calc(100vh - 160px)' }}>
            <Col span={24}>
              <Card
                title={t('organization.info.title')}
                extra={
                  <SharedButton
                    // permissions={PERMISSION_ROLE_MAP.R_ORGANIZATION_UPDATE}
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
                    <SharedAvatar url={logo?.url} name={organization?.name} onChange={onChaneLogo} />
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
                        label={t('common.field.organization')}
                        name='name'
                        rules={[{ required: true }]}
                      >
                        <SharedInput size={'large'} placeholder={t('common.placeholder.organization')} />
                      </Form.Item>
                      <Form.Item
                        label={t('common.field.representative_email')} name='email'
                        rules={[{ pattern: REGEX.EMAIL, message: t('common.error.email_valid') }]}
                      >
                        <SharedInput size={'large'}
                                     placeholder={t('common.placeholder.representative_email')}
                                     inputMode={'email'}
                        />
                      </Form.Item>
                      <Form.Item label={t('common.field.code')} name='code' rules={[{ required: true }]}>
                        <SharedInput size={'large'} placeholder={t('common.placeholder.code')} />
                      </Form.Item>
                      <Form.Item
                        label={t('common.field.contact_person_in_charge')}
                        name='representativeName'
                        rules={[{ required: true }]}
                      >
                        <SharedInput size={'large'} placeholder={t('common.placeholder.contact_person_in_charge')} />
                      </Form.Item>
                      <Form.Item
                        label={t('common.field.contact_phone_number')}
                        name='representativePhone'
                        rules={[{ required: true }, {
                          pattern: REGEX.PHONE,
                          message: t('common.error.phoneNumber_valid')
                        }]}
                      >
                        <SharedInput size={'large'}
                                     placeholder={t('common.field.contact_phone_number')}
                                     inputMode={'tel'}
                        />
                      </Form.Item>
                      <Form.Item label={t('common.field.homepage_address')} name='website'>
                        <SharedInput size={'large'} placeholder={t('common.placeholder.homepage_address')} />
                      </Form.Item>
                      <Form.Item
                        label={t('common.field.company_registration_number')}
                        name='businessRegistrationNumber'
                        rules={[{ required: true }]}
                      >
                        <SharedInput size={'large'} placeholder={t('common.placeholder.company_registration_number')} />
                      </Form.Item>
                      <Form.Item label={t('common.field.business_registration')} name='businessLicenseFile'>
                        <>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Upload
                              accept='image/png, image/jpeg'
                              maxCount={1}
                              showUploadList={false}
                              beforeUpload={() => false}
                              onChange={onChangeLicenses}
                            >
                              <SharedButton type={'default'} className={'h-[48px]'}
                                            icon={<ImageOutlined style={{ fontSize: '20px' }} />}>
                                {'Upload image'}
                              </SharedButton>
                            </Upload>
                            {license &&
                              <Image preview={false} width={48} height={48}
                                     style={{ borderRadius: '8px', border: '1px solid #cccccc' }}
                                     src={license.url ?? ''} />}
                          </div>
                          <span className={'text-[12px] text-[#ccc]'}>
                            {t('common.field.business_registration')}
                          </span>
                        </>
                      </Form.Item>
                      <Form.Item
                        className={'mb-3'}
                        label={t('common.field.brand_introduction')}
                        name='about'
                      >
                        <TextArea
                          showCount
                          maxLength={200}
                          className={'h-[200px] resize-none'}
                          placeholder={t('common.placeholder.brand_introduction')}
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6}></Col>
          </Row>
        </PerfectScrollbar>
      )}
    </OrganizationWrapper>
  )
}

export default Organization
