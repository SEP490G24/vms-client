import { Form, message, Space, Tabs } from 'antd'
import { PermissionWrapper } from './styles.ts'
import { useEffect, useState } from 'react'
import { ModuleDto, PermissionDto, RoleDto } from '~/interface/Permission.ts'
import { ModulePermission } from './Module'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTranslation } from 'react-i18next'
import { PERMISSION_ROLE_MAP, REALM_ROLE_MAP } from '~/role/index.ts'
import { SharedButton, SharedInput, SharedModal, SharedSelect } from '~/common'
import { keycloakService, permissionService, roleService, siteService } from '~/service'
import Modal from 'antd/es/modal/Modal'
import { SiteDto } from '~/interface'
import TextArea from 'antd/es/input/TextArea'
import { AuthSection } from '~/auth'
import PerfectScrollbar from 'react-perfect-scrollbar'

const Permission = () => {
  const { t } = useTranslation()
  const [modules, setModules] = useState<ModuleDto[]>()
  const [roles, setRoles] = useState<RoleDto[]>()
  const [activeTab, setActiveTab] = useState('')
  const [modalState, setModalState] = useState<{ showModal: boolean, confirmLoading: boolean }>({
    showModal: false,
    confirmLoading: false
  })

  const [form] = Form.useForm()

  const [sites, setSites] = useState<SiteDto[]>([])

  useEffect(() => {
    siteService.findAll().then((response) => {
      setSites(response?.data)
    })
  }, [])

  useEffect(() => {
    permissionService.getAllModule(true).then((response) => {
      if (response.data) {
        setModules(response.data)
        const [firstClient] = response?.data
        setActiveTab(firstClient.clientId)
      }
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
    form.resetFields()
    setModalState({ ...modalState, showModal: false })
  }

  const onCreateRole = (values: any) => {
    setModalState({ ...modalState, confirmLoading: true })
    roleService.create({ ...values, attributes: {} })
      .then(() => message.success(t('common.message.success.save')))
      .then(() => {
        setModalState({ showModal: false, confirmLoading: false })
      })
      .catch(() => message.error(t('common.message.error.save')))
      .finally(() => {
          setModalState({ ...modalState, confirmLoading: false })
        }
      )
  }

  const syncRole = () => {
    keycloakService.syncWithClient(activeTab).then(() => {
    })
  }

  const onSave = () => {
  }


  return (
    <PermissionWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space className={'w-full justify-between'} direction={'horizontal'}>
          <h2>{t('organization.permission.title')}</h2>
          <Space direction={'horizontal'} size={8}>
            <SharedButton permissions={PERMISSION_ROLE_MAP.R_ROLE_CREATE}
                          onClick={() => setModalState({ ...modalState, showModal: true })}>
              Create Role
            </SharedButton>
            <SharedButton
              permissions={REALM_ROLE_MAP.REALM_ADMIN}
              onClick={syncRole}>
              Sync
            </SharedButton>
          </Space>
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_ROLE_FIND}>
          <div className='page-content'>
            {Array.isArray(modules) && (
              <Tabs
                rootClassName={'module-tabs'}
                onChange={setActiveTab}
                type={'card'}
                items={modules?.map((module) => {
                  return {
                    label: module.name,
                    key: module.clientId,
                    children: <PerfectScrollbar><ModulePermission module={module} roles={roles} onChange={onChange} onSave={onSave} /></PerfectScrollbar>
                  }
                })}
              />
            )}
          </div>
        </AuthSection>
      </Space>
      <Modal
        open={modalState.showModal}
        confirmLoading={modalState.confirmLoading}
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
    </PermissionWrapper>
  )
}
export default Permission
