import React, { useEffect, useState } from 'react'
import { ParticipantsWrapper } from './styles.ts'
import { Col, Divider, Form, FormInstance, Row, Space, Table } from 'antd'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { DebounceSelect, SharedButton, SharedInput } from '~/common'
import { CreateMeetingInfo, CustomerCheckType, customerService } from '~/service'
import { REGEX } from '~/constants'
import { RuleObject } from 'antd/es/form/index'
import Column from 'antd/es/table/Column'
import { CustomerDto, OptionItem } from '~/interface'
import { useSelector } from 'react-redux'
import { meetingSelector } from '~/redux'
import { cloneDeep } from 'lodash'

interface ParticipantsArgs {
  meeting: CreateMeetingInfo
  form: FormInstance
  onFinish: (values: any) => void
}

const Participants: React.FC<ParticipantsArgs> = (props) => {
  const { t } = useTranslation()
  const { meetingSelected } = useSelector(meetingSelector)
  const [customerDtos, setCustomerDtos] = useState<CustomerDto[]>([])
  const [oldCustomers, setOldCustomers] = useState<CustomerDto[]>([])
  const [oldIds, setOldIds] = useState<OptionItem[]>([])
  const [lastResetTime, setLastResetTime] = useState(0)

  useEffect(() => {
    customerService.filter({ keyword: '' }).then((response) => {
      setCustomerDtos(response.data)
    })
  }, [])

  const onFinish = (values: any) => {
    props.onFinish({
      oldCustomers: oldCustomers,
      newCustomers: values['newCustomers']
    })
  }

  const validate = async (_: RuleObject, value: string, type: CustomerCheckType) => {
    if (value) {
      await customerService.checkCustomerExist({ value, type }).then(() => Promise.resolve())
        .catch((error) => Promise.reject(new Error(error.data.message)))
    }
  }

  const fetchCustomer = async (keyword: string): Promise<OptionItem[]> => {
    const response = await customerService.filter({ keyword: keyword })
    return convert2OptionItem(response.data)
  }

  const convert2OptionItem = (customers: CustomerDto[]) => {
    return customers.map((item) => {
      return {
        label: `${item.visitorName} - ${item.phoneNumber}`,
        value: item.id,
        disabled: oldCustomers.some((oldCustomer) => oldCustomer.id === item.id)
      }
    })
  }

  const addItem = () => {
    oldIds.forEach((item) => {
      if (!oldCustomers.some((oldCustomer) => oldCustomer.id === item.value)) {
        const _customer = customerDtos.find((_) => _.id === item.value)
        _customer && setOldCustomers((prev) => [...prev, ...[_customer]])
      }
    })
    setLastResetTime(Date.now())
    setOldIds([])
  }

  useEffect(() => {
    setOldCustomers(meetingSelected.customers ?? [])
  }, [meetingSelected])

  return (
    <ParticipantsWrapper>
      <Divider orientation={'left'}>{t('common.field.old_guest')}</Divider>
      <Space className={'w-full mb-6'} size={30} direction={'vertical'}>
        <DebounceSelect
          mode={'multiple'}
          className={'w-full'}
          fetchOptions={fetchCustomer}
          debounceTimeout={600}
          placeholder={t('meeting.popup.customerInfo')}
          value={oldIds}
          onChange={setOldIds}
          resetOption={lastResetTime}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <div className={'w-full'}>
                <Space className={'float-right'} style={{ padding: '0 8px 4px' }}>
                  <SharedButton className={'float-right'} type={'primary'} icon={<PlusOutlined />} onClick={addItem}>
                    {t('common.label.add')}
                  </SharedButton>
                </Space>
              </div>
            </>
          )}
        />
        <Table
          dataSource={oldCustomers}
          rowKey='id'
          style={{ width: 850 }}
          scroll={{ y: 205 }}
          className='vms-table no-bg'
          pagination={false}
          size='middle'
          bordered
        >
          <Column
            title={t('common.field.name')} dataIndex='visitorName' key='visitorName' />
          <Column title={t('common.field.identificationNumber')} dataIndex='identificationNumber'
                  key='identificationNumber' />
          <Column title={t('common.field.contact_number')} dataIndex='phoneNumber' key='phoneNumber' />
          <Column title={t('common.field.email')} dataIndex='email' key='email' />
          <Column width={50} key='operation'
                  render={(_, __, index) => <MinusCircleOutlined
                    className='dynamic-delete-button'
                    onClick={() => {
                      setOldCustomers((prev) => {
                        const temp = cloneDeep(prev)
                        if (temp.length > index) {
                          temp.splice(index, 1)
                        }
                        return [...temp]
                      })
                    }}
                  />} />
        </Table>
      </Space>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={props.form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={onFinish}
        labelAlign='left'
      >
        <Form.List
          name='newCustomers'
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <Space className={'w-full'} direction={'vertical'}>
                {fields.map((field, index) => (
                  <Row key={field.key} className={'w-full'} align={'middle'}>
                    <Divider orientation={'left'}>{t('common.field.new_guest')}</Divider>
                    <Col flex={1} key={index}>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')}
                                 name={[index, 'visitorName']}
                                 rules={[{ required: true }]}>
                        <SharedInput placeholder={t('common.placeholder.name')} />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.identificationNumber')}
                                 name={[index, 'identificationNumber']}
                                 validateDebounce={1000}
                                 rules={[
                                   { required: true },
                                   { max: 12 },
                                   {
                                     pattern: REGEX.IDENTIFICATION_NUMBER,
                                     message: t('common.error.identificationNumber_valid')
                                   },
                                   { validator: (_, value) => validate(_, value, CustomerCheckType.IDENTIFICATION_NUMBER) }
                                 ]}>
                        <SharedInput placeholder={t('common.placeholder.identificationNumber')} maxLength={12}
                                     showCount />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.phoneNumber')}
                                 name={[index, 'phoneNumber']}
                                 validateDebounce={1000}
                                 rules={[
                                   { required: true },
                                   { max: 10 },
                                   { pattern: REGEX.PHONE, message: t('common.error.phoneNumber_valid') },
                                   { validator: (_, value) => validate(_, value, CustomerCheckType.PHONE_NUMBER) }
                                 ]}>
                        <SharedInput inputMode={'tel'} placeholder={t('common.placeholder.phoneNumber')} maxLength={10}
                                     showCount />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.email')}
                                 name={[index, 'email']}
                                 validateDebounce={1000}
                                 rules={[
                                   { required: true },
                                   { pattern: REGEX.EMAIL, message: t('common.error.email_valid') },
                                   { validator: (_, value) => validate(_, value, CustomerCheckType.EMAIL) }
                                 ]}>
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
                New customer
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
