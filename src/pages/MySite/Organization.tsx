import { Card, Col, Form, FormInstance, message, Row, UploadProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { SharedAvatar, SharedButton, SharedInput } from '~/common'
import { PERMISSION_ROLE_MAP } from '~/role'
import { toBase64 } from '~/utils'
import { OrganizationWrapper } from './styles'
import { REGEX } from '~/constants'
import { AuthSection } from '~/auth'
import { useDispatch, useSelector } from 'react-redux'
import { organizationsSelector, updateMyOrganization } from '~/redux'
import { fileService, organizationService } from '~/service'
import { UploadFileData } from '~/interface'
import { BASE_STORAGE } from '~/constants'

const Organization = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { myOrganization } = useSelector(organizationsSelector)
  const [form] = Form.useForm()
  const formRef = React.useRef<FormInstance>(null)
  const [logo, setLogo] = useState<UploadFileData>()

  useEffect(() => {
    form.setFieldsValue({
      name: myOrganization?.name,
      code: myOrganization?.code,
      website: myOrganization?.website,
      representative: myOrganization?.representative,
      logo: myOrganization?.logo,
      contactInfo: myOrganization?.contactInfo,
      contactPhoneNumber: myOrganization?.contactPhoneNumber,
      enable: myOrganization?.enable
    })
    console.log('tec ' + myOrganization)
  }, [myOrganization])

  const onFinish = async (values: any) => {
    let logoUrl = undefined
    let payload = values
    if (logo?.file) {
      await fileService.uploadRcFile(logo?.file).then((response) => {
        logoUrl = response.data.name
      })
      payload = {
        ...payload, logo: logoUrl
      }
    }
    const request = !!myOrganization ? organizationService.update(myOrganization.id, payload) : organizationService.insert(payload)
    await request
      .then((resp) => {
        if (resp?.data) {
          dispatch(updateMyOrganization(resp.data))
          message.success(resp.data.message)
        }
      })
      .catch((resp) => {
        message.error(resp.data.message)
      })
  }

  const onChaneLogo: UploadProps['onChange'] = async (data) => {
    const url = await toBase64(data.file)
    console.log(data.file)
    form.setFieldsValue({ logo: url })
    setLogo({
      file: data.file.originFileObj,
      content: {
        ...data.fileList,
        // @ts-ignore
        url: url
      }
    })
  }

  return (
    <OrganizationWrapper>
      <h2 className='page-header-text'>{t('organization.info.title')}</h2>
      <AuthSection permissions={PERMISSION_ROLE_MAP.R_ORGANIZATION_FIND}>
        <PerfectScrollbar>
          <Row className={'m-0'} style={{ maxHeight: 'calc(100vh - 160px)' }}>
            <Col span={24}>
              <Card
                title={t('organization.info.title')}
                extra={
                  <SharedButton
                    permissions={PERMISSION_ROLE_MAP.R_ORGANIZATION_UPDATE}
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
                    <SharedAvatar url={logo?.content.url ?? BASE_STORAGE + myOrganization.logo}
                                  name={myOrganization?.name}
                                  onChange={onChaneLogo} />
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
                        <SharedInput size={'large'} placeholder={t('common.placeholder.organizationName')} />
                      </Form.Item>
                      <Form.Item label={t('common.field.code')} name='code' rules={[{ required: true }]}>
                        <SharedInput size={'large'} placeholder={t('common.placeholder.code')} />
                      </Form.Item>
                      <Form.Item label={t('common.field.homepage_address')} name='website'>
                        <SharedInput size={'large'} placeholder={t('common.placeholder.homepage_address')} />
                      </Form.Item>
                      <Form.Item
                        label={t('common.field.representativeName')}
                        name='representative'
                      >
                        <SharedInput size={'large'}
                                     placeholder={t('common.field.representativeName')}
                        />
                      </Form.Item>
                      <Form.Item
                        label={t('common.field.contact_person_in_charge')}
                        name='contactInfo'
                        rules={[{ required: true }]}
                      >
                        <SharedInput size={'large'} placeholder={t('common.placeholder.contactInfo')} />
                      </Form.Item>
                      <Form.Item
                        label={t('common.field.contact_phone_number')}
                        name='contactPhoneNumber'
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
                      <Form.Item
                        className={'mb-3'}
                        label={t('common.field.description')}
                        name='description'
                      >
                        <TextArea
                          showCount
                          maxLength={200}
                          className={'h-[200px] resize-none'}
                          placeholder={t('common.placeholder.description')}
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
      </AuthSection>
    </OrganizationWrapper>
  )
}

export default Organization
