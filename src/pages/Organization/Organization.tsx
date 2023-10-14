import { Avatar, Badge, Card, Col, Form, FormInstance, message, Row, Upload, UploadFile, UploadProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { SharedButton, SharedInput } from '~/common'
import { OrganizationEntity } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { baseUploadTemplate, toBase64 } from '~/utils'
import { checkPermission } from '~/utils/common'
import { organizationService } from '~/service'

const Organization = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [organization, setOrganization] = useState<OrganizationEntity | null>()
  const [previewTitle, setPreviewTitle] = useState('')
  const [licenses, setLicenses] = useState<UploadFile[]>([])

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
      about: organization?.about
    })
    !!organization?.businessLicenseFile && setLicenses([baseUploadTemplate(organization.businessLicenseFile)])
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

  const onChange: UploadProps['onChange'] = async (data) => {
    if (data.file.status === 'removed') {
      form.setFieldsValue({ businessLicenseFile: null })
      setLicenses([])
      return
    }
    const url = await toBase64(data.file)
    form.setFieldsValue({ businessLicenseFile: url })
    setLicenses([
      {
        ...data.fileList,
        // @ts-ignore
        url: url
      }
    ])
  }

  const onPreview = async (file: any) => {
    setPreviewImage(file.url || previewImage)
    setPreviewOpen(true)
    setPreviewTitle(file[0].name)
  }

  return (
    <PageWrapper>
      <h2 className='page-header-text'>{t('organization.info.title')}</h2>
      {checkPermission(BUTTON_ROLE_MAP.R_ORGANIZATION_FIND) && (
        <PerfectScrollbar>
          <Row className={'m-0'} style={{ maxHeight: 'calc(100vh - 160px)' }}>
            <Col span={18}>
              <Card
                title={t('organization.info.title')}
                extra={
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_ORGANIZATION_UPDATE}
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
                    <Badge
                      count={'A'}
                      offset={['-10%', '80%']}
                      style={{
                        width: '24px',
                        height: '24px',
                        boxShadow: '0 0 0 2px #fff',
                        backgroundColor: '#6384EB'
                      }}
                    >
                      <Avatar className={'bg-[#002484] align-middle'} size={126}>
                        A
                      </Avatar>
                    </Badge>
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
                      <Form.Item label={t('common.field.representative_email')} name='email'>
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
                        rules={[{ required: true }]}
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
                        <Upload
                          listType='picture-card'
                          fileList={licenses}
                          beforeUpload={() => false}
                          onChange={onChange}
                          onPreview={onPreview}
                        >
                          {licenses.length === 0 ? (
                            <div>
                              <span>+</span>
                              <div className='ant-upload-text'>{t('common.placeholder.upload')}</div>
                            </div>
                          ) : (
                            ''
                          )}
                        </Upload>
                        <Modal
                          open={previewOpen}
                          title={previewTitle}
                          footer={null}
                          onCancel={() => setPreviewOpen(false)}
                        >
                          <img alt='example' className={'w-full'} src={previewImage} />
                        </Modal>
                        <span className={'text-[12px] text-[#ccc]'}>
                          {t('common.field.business_registration')}
                        </span>
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
    </PageWrapper>
  )
}

export default Organization
