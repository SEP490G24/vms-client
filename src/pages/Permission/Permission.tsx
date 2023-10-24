import { Space } from 'antd'
import { PermissionWrapper } from './styles.ts'
import { useEffect, useState } from 'react'
import { ModuleDto, PermissionDto, RoleDto } from '~/interface/Permission.ts'
import modulePermissionService from '~/service/permissionService.ts'
import { ModulePermission } from './Module'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTranslation } from 'react-i18next'
import { checkPermission } from '~/utils/common.ts'
import { BUTTON_ROLE_MAP, REALM_ROLE_MAP } from '~/role/index.ts'
import { SharedButton } from '~/common'
import keycloakService from '~/service/keycloakService.ts'
import { roleService } from '~/service'

const Permission = () => {
  const { t } = useTranslation()
  const [modules, setModules] = useState<ModuleDto[]>()
  const [roles, setRoles] = useState<RoleDto[]>()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    modulePermissionService.getAllModule(true).then((response) => {
      setModules(response?.data)
      setActiveTab(response?.data?.[0]?.clientId)
    })
    roleService.getAll().then((response) => {
      setRoles(response?.data)
    })
  }, [])

  const onChange = (rId: string, permission: PermissionDto, event: CheckboxChangeEvent) => {
    roleService.updatePermission(rId, { permissionDto: permission, state: event.target.checked }).then(() => {
    })
  }

  const onSave = () => {
  }

  const syncRole = () => {
    keycloakService.syncWithClient(activeTab).then(() => {
    })
  }

  return (
    <PermissionWrapper>
      <Space className={'w-full justify-center'}>
        <h2 className='page-title'>{t('setting.permission.title')}</h2>
        <SharedButton className={'mb-5'} onClick={syncRole} permissions={REALM_ROLE_MAP.REALM_ADMIN}>
          Sync
        </SharedButton>
      </Space>
      {checkPermission(BUTTON_ROLE_MAP.R_PERMISSION_FIND) && (
        <div className='page-content'>
          {modules && <ModulePermission module={modules[0]} roles={roles} onChange={onChange} onSave={onSave} />}
        </div>
      )}
    </PermissionWrapper>
  )
}
export default Permission
