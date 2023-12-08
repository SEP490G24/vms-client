import React, {useEffect, useState} from 'react'
import {ParticipantsWrapper} from './styles.ts'
import {Button, Col, Divider, Form, FormInstance, Row, Space, Table} from 'antd'

import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {useTranslation} from 'react-i18next'
import {DebounceSelect, SharedButton, SharedInput, SharedSelect} from '~/common'
import {useDispatch, useSelector} from 'react-redux'
import {customersSelector, fetchAllCustomerAvailable} from '~/redux/slices/customerSlice.ts'
import {CreateMeetingInfo, CustomerCheckType, customerService} from '~/service'
import {DATE_TIME_COMMON, REGEX} from '~/constants'
import {RuleObject} from 'antd/es/form/index'
import Column from "antd/es/table/Column";
import {CustomerDto, OptionItem} from "~/interface";
import moment from "moment";

interface ParticipantsArgs {
  meeting: CreateMeetingInfo
  form: FormInstance
  onFinish: (values: any) => void
}

const Participants: React.FC<ParticipantsArgs> = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {customers} = useSelector(customersSelector)
  const [oldCustomer, setOldCustomer] = useState<CustomerDto[]>([]);

  const onFinish = (values: any) => {
    props.onFinish({
      oldCustomers: values['oldCustomers'],
      newCustomers: values['newCustomers']
    })
  }

  const validate = async (_: RuleObject, value: string, type: CustomerCheckType) => {
    await customerService.checkCustomerExist({value, type}).then(() => Promise.resolve())
      .catch((error) => Promise.reject(new Error(error.data.message)))
  }

  const fetchCustomer = async (): Promise<OptionItem[]> => {
    const response = await customerService.findCustomerAvailable({})
    return response.data.map((item: CustomerDto) => {
      return {label: `${item.visitorName} - ${item.phoneNumber}`, value: item.id}
    })
  }

  const addItem = () => {
    console.log('Test')
  };

  useEffect(() => {
    dispatch(fetchAllCustomerAvailable({}) as any)
  }, [])

  return (
    <ParticipantsWrapper>
      <Table
        dataSource={oldCustomer}
        rowKey='id'
        style={{width: 950, height: 500}}
        className='vms-table no-bg'
        size='middle'
        bordered
      >
        <Column
          title={t('common.field.name')} sorter={true} dataIndex='visitorName' key='visitorName'/>
        <Column title={t('common.field.identificationNumber')} dataIndex='identificationNumber'
                key='identificationNumber'/>
        <Column title={t('common.field.contact_number')} dataIndex='phoneNumber' key='phoneNumber'/>
        <Column title={t('common.field.email')} dataIndex='email' key='email'/>
        <Column title={t('common.field.createBy')} dataIndex='createBy' key='createBy'/>
        <Column title={t('common.field.created_on')} key='createdOn'
                render={(value: CustomerDto) => moment(value.createdOn).format(DATE_TIME_COMMON.START_DAY)}/>
      </Table>
      <Form
        labelCol={{span: 6}}
        wrapperCol={{span: 18}}
        layout={'horizontal'}
        form={props.form}
        initialValues={{layout: 'horizontal'}}
        style={{width: '100%'}}
        colon={false}
        onFinish={onFinish}
        labelAlign='left'
      >
        <Row className={'w-full'} gutter={8} align={'middle'}>
          <Col span={23}>
            <Form.Item className={'mb-3'} label={t('common.field.customers')} name={'oldCustomers'} hidden={true}>
              <SharedSelect mode={'multiple'} allowClear className={'w-full'}
                            placeholder={t('common.placeholder.roles')}
                            options={customers.map((customer) => {
                              return {label: customer.visitorName, value: customer.id}
                            })}/>
            </Form.Item>
            <DebounceSelect
              mode={'multiple'}
              className={'w-100'}
              fetchOptions={fetchCustomer}
              debounceTimeout={600}
              placeholder={t('counselingManagement.inquiry.search.counselor.placeholder')}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{margin: '8px 0'}}/>
                  <Space style={{padding: '0 8px 4px'}}>
                    <Button type="text" icon={<PlusOutlined/>} onClick={addItem}>
                      Add item
                    </Button>
                  </Space>
                </>
              )}
            />
          </Col>
        </Row>
        <Form.List
          name='newCustomers'
        >
          {(fields, {add, remove}, {errors}) => (
            <>
              <Space className={'w-full'} direction={'vertical'}>
                {fields.map((field, index) => (
                  <Row key={field.key} className={'w-full'} align={'middle'}>
                    <Divider orientation={'left'}>Customer</Divider>
                    <Col flex={1} key={index}>
                      <Form.Item style={{marginBottom: '12px'}} label={t('common.field.name')}
                                 name={[index, 'visitorName']}
                                 rules={[{required: true}]}>
                        <SharedInput placeholder={t('common.placeholder.site_name')}/>
                      </Form.Item>
                      <Form.Item style={{marginBottom: '12px'}} label={t('common.field.identificationNumber')}
                                 name={[index, 'identificationNumber']}
                                 validateDebounce={1000}
                                 rules={[
                                   {required: true},
                                   {max: 12},
                                   {
                                     pattern: REGEX.IDENTIFICATION_NUMBER,
                                     message: t('common.error.identificationNumber_valid')
                                   },
                                   {validator: (_, value) => validate(_, value, CustomerCheckType.IDENTIFICATION_NUMBER)}
                                 ]}>
                        <SharedInput placeholder={t('common.placeholder.identificationNumber')} maxLength={12}
                                     showCount/>
                      </Form.Item>
                      <Form.Item style={{marginBottom: '12px'}} label={t('common.field.phoneNumber')}
                                 name={[index, 'phoneNumber']}
                                 validateDebounce={1000}
                                 rules={[
                                   {required: true},
                                   {max: 10},
                                   {pattern: REGEX.PHONE, message: t('common.error.phoneNumber_valid')},
                                   {validator: (_, value) => validate(_, value, CustomerCheckType.PHONE_NUMBER)}
                                 ]}>
                        <SharedInput inputMode={'tel'} placeholder={t('common.placeholder.phoneNumber')} maxLength={10}
                                     showCount/>
                      </Form.Item>
                      <Form.Item style={{marginBottom: '12px'}} label={t('common.field.email')}
                                 name={[index, 'email']}
                                 validateDebounce={1000}
                                 rules={[
                                   {required: true},
                                   {pattern: REGEX.EMAIL, message: t('common.error.email_valid')},
                                   {validator: (_, value) => validate(_, value, CustomerCheckType.EMAIL)}
                                 ]}>
                        <SharedInput inputMode={'email'} placeholder={t('common.placeholder.email')}/>
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
              <Divider/>
              <SharedButton
                type='dashed'
                onClick={() => {
                  add(0)
                }}
                icon={<PlusOutlined/>}
              >
                Add new customer
              </SharedButton>
              <Form.ErrorList errors={errors}/>
            </>
          )
          }
        </Form.List>
      </Form>
    </ParticipantsWrapper>
  )
}

export default Participants
