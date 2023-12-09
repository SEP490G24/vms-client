import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterScope, SharedInput } from '~/common'
import { checkPermission } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

export interface RoleFilterData {
  code?: string
  name?: string
  siteId?: string
}

interface FilterArgs {
  onFilter: (filterPayload: RoleFilterData) => void
  className?: string
}

const Filter: React.FC<FilterArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [siteId, setSiteId] = useState('')

  const onFinish = (values: RoleFilterData) => {
    props.onFilter(values)
  }

  const onReset = () => {
    form.resetFields()
    props.onFilter({})
  }

  return (
    <Card
      title={t('organization.role.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={PERMISSION_ROLE_MAP.R_USER_FIND}
            type={'primary'}
            onClick={form.submit}
          >
            {t('common.label.search')}
          </SharedButton>
        </Space>
      }
      bordered={false}
      className={props.className + ' vms-card filter-card'}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        colon={false}
        labelAlign='left'
        className='vms-form'
        onFinish={onFinish}
      >
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
          <SharedFilterScope siteId={siteId} onChangeSite={setSiteId} />}
        <Form.Item className={'mb-3'} label={t('organization.role.search.code')} name='code'>
          <SharedInput
            placeholder={t('organization.role.search.code_placeholder')}
          />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('organization.role.search.name')} name='name'>
          <SharedInput
            placeholder={t('organization.role.search.name_placeholder')}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
export default Filter
