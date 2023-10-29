import { Form, message, Space } from 'antd'
import { PermissionWrapper } from './styles.ts'
import { useEffect, useState } from 'react'
import { ModuleDto, PermissionDto, RoleDto } from '~/interface/Permission.ts'
import { ModulePermission } from './Module'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTranslation } from 'react-i18next'
import { checkPermission } from '~/utils/common.ts'
import { BUTTON_ROLE_MAP } from '~/role/index.ts'
import { SharedButton, SharedInput, SharedModal, SharedSelect } from '~/common'
import { permissionService, roleService, siteService } from '~/service'
import Modal from 'antd/es/modal/Modal'
import { SiteDto } from '~/interface'
import TextArea from 'antd/es/input/TextArea'

const Permission = () => {
  const { t } = useTranslation()
  const [modules, setModules] = useState<ModuleDto[]>()
  const [roles, setRoles] = useState<RoleDto[]>()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [form] = Form.useForm()

  const [sites, setSites] = useState<SiteDto[]>([])

  useEffect(() => {
    siteService.findAll().then((response) => {
      setSites(response?.data)
    })
  }, [])

  useEffect(() => {
    permissionService.getAllModule(true).then((response) => {
      setModules(response?.data)
    })
    roleService.getAll().then((response) => {
      setRoles(response?.data)
    })
  }, [])

  const onChange = (rId: string, permission: PermissionDto, event: CheckboxChangeEvent) => {
    roleService.updatePermission(rId, { permissionDto: permission, state: event.target.checked })
      .then(() => message.success(t('common.message.success.save')))
  }

  const onClose = () => {
    setOpenModal(false)
  }

  const onCreateRole = (values: any) => {
    roleService.create({ ...values, attributes: {} }).then(() => message.success(t('common.message.success.save')))
      .catch(() => message.error(t('common.message.error.save')))
  }

  const onSave = () => {
  }


  return (
    <PermissionWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space className={'w-full justify-between'}>
          <h2>{t('organization.permission.title')}</h2>
          <SharedButton onClick={() => setOpenModal(true)}>
            Create Role
          </SharedButton>
          {/*<SharedButton className={'mb-5'} onClick={syncRole} permissions={REALM_ROLE_MAP.REALM_ADMIN}>*/}
          {/*  Sync*/}
          {/*</SharedButton>*/}
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_PERMISSION_FIND) && (
          <div className='page-content'>
            {modules && <ModulePermission module={modules[0]} roles={roles} onChange={onChange} onSave={onSave} />}
          </div>
        )}
      </Space>
      {openModal && (
        <Modal
          open={openModal}
          closable={false}
          title={null}
          footer={null}
          width={650}
          onCancel={onClose}
        >
          <SharedModal
            title={t('organization.permission.popup.title-add')}
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
              onFinish={onCreateRole}
              labelAlign='left'
            >
              <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.site.name')} name='siteId'
                         rules={[{ required: true }]}>
                <SharedSelect options={sites.map((site) => {
                  return { label: site.name, value: site.id, key: site.id }
                }) ?? []}
                              placeholder={t('common.placeholder.site')}></SharedSelect>
              </Form.Item>
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
          </SharedModal>
        </Modal>
      )}
    </PermissionWrapper>
  )
}
export default Permission
