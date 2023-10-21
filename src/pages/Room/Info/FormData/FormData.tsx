import React, { useEffect } from 'react'
import { FormDataWrapper } from './styles.ts'
import { Form, FormInstance } from 'antd'
import { RoomDto } from '~/interface'
import { SharedInput } from '~/common'
import { useTranslation } from 'react-i18next'
import TextArea from 'antd/es/input/TextArea'

interface RoomFormArgs {
  form: FormInstance;
  room?: RoomDto,
  onFinish: (values: any) => void,
}

const FormData: React.FC<RoomFormArgs> = (props) => {

  const { t } = useTranslation()

  useEffect(() => {
    if (props.room) {
      props.form.setFieldsValue({
        name: props.room.name,
        phoneNumber: props.room.phoneNumber,
        province: props.room.province,
        district: props.room.district,
        ward: props.room.ward,
        address: props.room.address,
        taxCode: props.room.taxCode,
        description: props.room.description,
        enable: props.room.enable,
      })
    }
  }, [props.room])

  return (
    <FormDataWrapper>
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
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!props.room} placeholder={t('common.placeholder.name')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                   rules={[{ required: true }]}>
          {/*<SharedSelect options={rooms.map((site) => {*/}
          {/*  return { label: site.name, value: site.id, key: site.id }*/}
          {/*}) ?? []}*/}
          {/*              placeholder={t('common.placeholder.site')}></SharedSelect>*/}
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description'>
          <TextArea
            showCount
            maxLength={200}
            className={'h-[200px] resize-none'}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
      </Form>
    </FormDataWrapper>
  )
}

export default FormData
