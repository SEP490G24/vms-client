import { Col, message, Row, Space, Tabs } from 'antd'
import { PermissionWrapper } from './styles.ts'
import { useEffect, useState } from 'react'
import { ModuleDto, PermissionDto, RoleDto } from '~/interface/Permission.ts'
import { ModulePermission } from './Module'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTranslation } from 'react-i18next'
import { PERMISSION_ROLE_MAP, REALM_ROLE_MAP, SCOPE_ROLE_MAP } from '~/role/index.ts'
import { SharedButton, SharedSelect } from '~/common'
import { keycloakService, permissionService, roleService } from '~/service'
import { AuthSection } from '~/auth'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { checkPermission } from '~/utils'

const Permission = () => {
  const { t } = useTranslation()
  const [modules, setModules] = useState<ModuleDto[]>()
  const [roles, setRoles] = useState<RoleDto[]>()
  const [activeTab, setActiveTab] = useState('')

  const { sites } = useSelector(sitesSelector)
  const [siteId, setSiteId] = useState<string>()

  useEffect(() => {
    permissionService.getAllModule(true).then((response) => {
      if (response.data) {
        setModules(response.data)
        const [firstClient] = response?.data
        setActiveTab(firstClient.clientId)
      }
    })
  }, [])

  useEffect(() => {
    if (checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) setSiteId(sites?.[0]?.id)
  }, [sites])

  useEffect(() => {
    if (!checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) || siteId)
      roleService.filter({ attributes: { 'siteId': siteId ? [siteId] : [] } }).then((response) => setRoles(response.data))
  }, [siteId])

  const onChange = (rId: string, permission: PermissionDto, event: CheckboxChangeEvent) => {
    roleService.updatePermission(rId, { permissionDto: permission, state: event.target.checked })
      .then(() => message.success(t('common.message.success.save')))
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
          <Space direction={'vertical'} size={8}>
            <h2>{t('organization.permission.title')}</h2>
            {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
              <Row className={'w-full gap-2'} align={'middle'}>
                <Col flex={'none'}><span className={'text-muted'}>Site: </span></Col>
                <Col flex={'auto'}>
                  <SharedSelect className={'w-full'} bordered={false} options={sites.map((site) => {
                    return { label: site.name, value: site.id, disabled: !site.enable }
                  }) ?? []}
                                value={siteId}
                                onChange={setSiteId}
                                placeholder={t('common.placeholder.site')}></SharedSelect>
                </Col>
              </Row>
            }
          </Space>
          <Space direction={'horizontal'} size={8}>
            <SharedButton
              permissions={REALM_ROLE_MAP.REALM_ADMIN}
              onClick={syncRole}>
              Sync
            </SharedButton>
          </Space>
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_ROLE_FILTER}>
          {((checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && siteId) || !checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) &&
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
                      children: <PerfectScrollbar><ModulePermission module={module} roles={roles} onChange={onChange}
                                                                    onSave={onSave} /></PerfectScrollbar>
                    }
                  })}
                />
              )}
            </div>
          }
        </AuthSection>
      </Space>
    </PermissionWrapper>
  )
}
export default Permission
