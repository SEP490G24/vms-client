import { Form } from 'antd'
import React, { useEffect } from 'react'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { RoleDto } from '~/interface'
import { SharedInput, SharedSelect } from '~/common'
import TextArea from 'antd/es/input/TextArea'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { checkPermission } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'
import { CreateRolePayload, UpdateRolePayload } from '~/service'

interface RoleInfoFormArgs {
  role?: RoleDto
  onSave: (role: CreateRolePayload | UpdateRolePayload) => void
  onClose: () => void
}

const Info: React.FC<RoleInfoFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { sites } = useSelector(sitesSelector)

  useEffect(() => {
    form.resetFields()
    if (props.role) {
      form.setFieldsValue({
        code: props.role.code,
        name: props.role.attributes['name'],
        siteId: props.role.attributes['siteId'],
        description: props.role.description
      })
    }
  }, [props.role])

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <InfoWrapper
      title={t(!!props.role ? 'organization.role.popup.title-edit' : 'organization.role.popup.title-add')}
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
        onFinish={props.onSave}
        labelAlign='left'
      >
        {!!props.role ?
          <>
            <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='code'>
              <SharedInput disabled={true} placeholder={t('common.placeholder.code')} />
            </Form.Item>
          </> :
          <>
            <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.suffixCode')} name='suffixCode'>
              <SharedInput placeholder={t('common.placeholder.suffixCode')} />
            </Form.Item>
          </>
        }
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                     rules={[{ required: true }]}>
            <SharedSelect options={sites.map((site) => {
              return { label: site.name, value: site.id, key: site.id }
            }) ?? []}
                          disabled={!!props.role}
                          placeholder={t('common.placeholder.site')}></SharedSelect>
          </Form.Item>
        }
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={t('common.placeholder.role_name')} />
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
    </InfoWrapper>
  )
}

export default Info
