import { Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import { DepartmentDto } from '~/interface'
import { SharedInput, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateDepartmentInfo, UpdateDepartmentInfo } from '~/service'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment/moment'
import { AuthSection } from '~/auth'
import { SCOPE_ROLE_MAP } from '~/role'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'

interface InfoDepartmentFormArgs {
  department?: DepartmentDto
  onSave: (department: CreateDepartmentInfo | UpdateDepartmentInfo) => void
  onClose: () => void
}

const Info: React.FC<InfoDepartmentFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const { sites } = useSelector(sitesSelector)

  useEffect(() => {
    form.resetFields();
    if (props.department) {
      form.setFieldsValue({
        name: props.department.name,
        code: props.department.code,
        siteId: props.department.siteId,
        description: props.department.description,
        enable: props.department.enable
      })
    }
  }, [props.department])

  const onFinish = (values: any) => {
    props.onSave(values)
  }

  const onClose = () => {
    props.onClose()
  }

  return (
    <InfoWrapper
      title={t(!!props.department ? 'organization.department.popup.title-edit' : 'organization.department.popup.title-add')}
      onOk={form.submit}
      onCancel={onClose}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={onFinish}
        labelAlign='left'
      >
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'
                   rules={[{ required: true }]}>
          <SharedInput disabled={!!props.department} placeholder={t('common.placeholder.code')} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.department_name')} />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                     rules={[{ required: true }]}>
            <SharedSelect options={sites.map((site) => {
              return { label: site.name, value: site.id, key: site.id }
            }) ?? []}
                          disabled={!!props.department}
                          placeholder={t('common.placeholder.site')}></SharedSelect>
          </Form.Item>
        </AuthSection>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description'>
          <TextArea
            showCount
            maxLength={200}
            className={'h-[200px] resize-none'}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.status')} name='enable'
                   rules={[{ required: true }]}>
          <Radio.Group name='enable'>
            <Space>
              <Radio value={true}>{t('common.label.enable')}</Radio>
              <Radio value={false}>{t('common.label.disable')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {!!props.department &&
          <>
            <Divider style={{ margin: '10px 0' }} />
            <Row>
              <Col span={6}>{t('common.field.registration_date')}</Col>
              <Col span={7}>{moment(props.department.createdOn).format('L')}</Col>
              <Col span={5}>{t('common.field.modification_date')}</Col>
              <Col
                span={6}>{props.department.lastUpdatedOn ? moment(props.department.lastUpdatedOn).format('L') : null}</Col>
            </Row>
          </>
        }
      </Form>
    </InfoWrapper>
  )
}

export default Info
