import React, { useEffect, useState } from 'react'
import { FormDataWrapper } from './styles.ts'
import { Form, FormInstance, Radio, Space } from 'antd'
import { RoomDto, SiteDto } from '~/interface'
import { SharedInput, SharedSelect } from '~/common'
import { useTranslation } from 'react-i18next'
import TextArea from 'antd/es/input/TextArea'
import { siteService } from '~/service'

interface RoomFormArgs {
  form: FormInstance;
  room?: RoomDto,
  onFinish: (values: any) => void,
}

const FormData: React.FC<RoomFormArgs> = (props) => {

  const { t } = useTranslation()
  const [sites, setSites] = useState<SiteDto[]>([])

  useEffect(() => {
    siteService.findAll().then((response) => {
      setSites(response?.data)
    })
  }, [])

  useEffect(() => {
    if (props.room) {
      props.form.setFieldsValue({
        name: props.room.name,
        code: props.room.code,
        siteName: props.room.siteName,
        siteId: props.room.siteId,
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
          <SharedInput placeholder={t('common.placeholder.site_name')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!props.room}  placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                   rules={[{ required: true }]}>
          <SharedSelect
            options={sites.map((site) => {
            return { label: site.name, value: site.id, key: site.id }
          }) ?? []}
                        placeholder={t('common.placeholder.site')}
          ></SharedSelect>
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.status')} name='enable'
                   rules={[{ required: true }]}>
          <Radio.Group name='enable'>
            <Space>
              <Radio value={true}>{t('common.field.status_.enable')}</Radio>
              <Radio value={false}>{t('common.field.status_.disable')}</Radio>
            </Space>
          </Radio.Group>
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
