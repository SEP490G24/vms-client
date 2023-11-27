import React from 'react'
import { ParticipantsWrapper } from './styles.ts'
import { Col, Divider, Form, FormInstance, Row, Space } from 'antd'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedInput, SharedSelect } from '~/common'
import { useSelector } from 'react-redux'
import { customersSelector } from '~/redux/slices/customerSlice.ts'
import { CreateMeetingInfo } from '~/service'

interface ParticipantsArgs {
  meeting: CreateMeetingInfo
  form: FormInstance
  onFinish: (values: any) => void
}

const Participants: React.FC<ParticipantsArgs> = (props) => {
  const { t } = useTranslation()
  // TODO: change to fetch with available
  const { customers } = useSelector(customersSelector)

  return (
    <ParticipantsWrapper>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={props.form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={props.onFinish}
        labelAlign='left'
      >
        <Row className={'w-full'} gutter={8} align={'middle'}>
          <Col span={23}>
            <Form.Item className={'mb-3'} label={t('common.field.customers')} name={'oldCustomers'}>
              <SharedSelect mode={'multiple'} allowClear className={'w-full'}
                            placeholder={t('common.placeholder.roles')}
                            options={customers.map((customer) => {
                              return { label: customer.visitorName, value: customer.id }
                            })} />
            </Form.Item>
          </Col>
        </Row>
        <Form.List
          name='newCustomers'
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <Space className={'w-full'} direction={'vertical'}>
                {fields.map((field, index) => (
                  <Row key={field.key} className={'w-full'} align={'middle'}>
                    <Divider orientation={'left'}>Customer</Divider>
                    <Col flex={1} key={index}>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')}
                                 name={[index, 'visitor_name']}
                                 rules={[{ required: true }]}>
                        <SharedInput placeholder={t('common.placeholder.site_name')} />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.identificationNumber')}
                                 name={[index, 'identificationNumber']}
                                 rules={[{ required: true }]}>
                        <SharedInput placeholder={t('common.placeholder.identificationNumber')} />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.phoneNumber')}
                                 name={[index, 'phoneNumber']}
                                 rules={[{ required: true }]}>
                        <SharedInput inputMode={'tel'} placeholder={t('common.placeholder.phoneNumber')} />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.email')}
                                 name={[index, 'email']}
                                 rules={[{ required: true }]}>
                        <SharedInput inputMode={'email'} placeholder={t('common.placeholder.email')} />
                      </Form.Item>
                    </Col>
                    <Col span={1}>
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                ))}
              </Space>
              <Divider />
              <SharedButton
                type='dashed'
                onClick={() => {
                  add(0)
                }}
                icon={<PlusOutlined />}
              >
                Add new customer
              </SharedButton>
              <Form.ErrorList errors={errors} />
            </>
          )
          }
        </Form.List>
      </Form>
    </ParticipantsWrapper>
  )
}

export default Participants
