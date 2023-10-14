import React, { useEffect } from 'react'
import { FormDataWrapper } from './styles.ts'
import { Col, Divider, Form, FormInstance, Radio, Row, Space } from 'antd'
import { SiteDto } from '~/interface'
import { SharedInput, SharedPhoneNumber } from '~/common'
import Password from 'antd/es/input/Password'
import { useTranslation } from 'react-i18next'

interface SiteFormArgs {
  form: FormInstance;
  site?: SiteDto,
  onFinish: (values: any) => void,
}

const FormData: React.FC<SiteFormArgs> = (args) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (args.site) {
      args.form.setFieldsValue({
        // firstName: args.site.firstName,
        // lastName: args.site.lastName,
        // password: '',
        // cPassword: '',
        // sitename: args.site.sitename,
        // phoneNumber: args.site.phoneNumber,
        // email: args.site.email,
        // isEnable: args.site.isEnable,
        // countryCode: args.site.countryCode
      })
    }
  }, [args.site])

  const onPhoneNumberChange = (value: string) => {
    value &&
    args.form.setFieldsValue({
      phoneNumber: value
    })
  }

  const onCountryCodeChange = (value: string) => {
    value &&
    args.form.setFieldsValue({
      countryCode: value
    })
  }


  return (
    <FormDataWrapper>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={args.form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={args.onFinish}
        labelAlign='left'
      >
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')}>
              <Form.Item style={{ marginBottom: 'unset' }} name='firstName' rules={[{ required: true }]}>
                <SharedInput disabled={!!args.site}
                             placeholder={t('common.placeholder.sitename')}></SharedInput>
              </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.sitename')} name='sitename'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!args.site} placeholder={t('common.placeholder.sitename')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.password')} name='password'
                   rules={[{ required: !args.site }]}>
          <Password placeholder={t('common.placeholder.password')} rootClassName='vms-input' />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.verify_password')}
                   name='cPassword' rules={[{ required: !args.site },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The new password that you entered do not match!'))
            }
          })]}>
          <Password placeholder={t('common.placeholder.verify_password')} rootClassName='vms-input' />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.phoneNumber')}>
          <SharedPhoneNumber
            defaultValue={{ countryCode: args.site?.countryCode as any, phone: args.site?.phoneNumber as any }}
            onChangeCode={onCountryCodeChange}
            onChangePhone={onPhoneNumberChange} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.email')} name='email'
                   rules={[{ required: true }]}>
          <SharedInput inputMode={'email'} placeholder={t('common.placeholder.email')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.used')} name='enable'
                   rules={[{ required: true }]}>
          <Radio.Group name='enable'>
            <Space>
              <Radio value={true}>{t('common.label.use')}</Radio>
              <Radio value={false}>{t('common.label.not_use')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {!!args.site &&
          <>
            <Divider style={{ margin: '10px 0' }} />
            <Row>
              <Col span={6}>{t('common.field.registration_date')}</Col>
              <Col span={7}>{args.site.createdOn}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col span={6}>{args.site.lastUpdatedOn}</Col>
            </Row>
          </>
        }
      </Form>
    </FormDataWrapper>
  )
}

export default FormData
