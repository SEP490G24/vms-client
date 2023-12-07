import { ModuleWrapper } from './styles.ts'
import { message, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { ModuleDto, PermissionDto, RoleDto } from '~/interface/Permission.ts'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTranslation } from 'react-i18next'
import { groupBy } from '~/utils'
import { FeaturePermission } from './Feature'
import { permissionService } from '~/service'
import { useForceUpdate } from '~/hook'

interface ModuleArgs {
  module: ModuleDto;
  roles?: RoleDto[];
  onChange: (rId: string, permission: PermissionDto, event: CheckboxChangeEvent) => void,
  onSave: () => void,
}

interface ModuleFeature {
  group: string,
  label: string,
  permissions: PermissionDto[]
}

const Module: React.FC<ModuleArgs> = (args) => {
  const { t, i18n } = useTranslation()
  const forceUpdate = useForceUpdate()
  const [moduleFeatures, setModuleFeatures] = useState<ModuleFeature[]>([])

  useEffect(() => {
    const groupPermissions = groupBy(args.module.permissionDtos, permission => permission.group ?? '')
    const _moduleFeatures = Array.from(groupPermissions.entries()).map((entry) => {
      const [firstElement] = entry[1]
      return {
        group: entry[0],
        label: firstElement.label?.[i18n.language]?.feature,
        permissions: entry[1]
      } as ModuleFeature
    })
    setModuleFeatures(_moduleFeatures)
  }, [args.module, i18n.language])

  useEffect(() => {

  }, [])

  const onEditLabelFeature = (value: string, permissions: PermissionDto[]) => {
    permissionService.updateAttribute(args.module.id, {
      attributes: { [`feature:${i18n.language}`]: [value] },
      permissionDtos: permissions
    })
      .then(() => message.success(t('common.message.success.save')))
      .catch((error) => message.error(error.data.message))
  }

  const onEditLabelName = (value: string, permission: PermissionDto) => {
    if (value === permission.label[i18n.language].name) return
    permissionService.updateAttribute(args.module.id, {
      attributes: { [`name:${i18n.language}`]: [value] },
      permissionDtos: [permission]
    })
      .then(() => permission.label[i18n.language].name = value)
      .then(() => forceUpdate())
      .then(() => message.success(t('common.message.success.save')))
      .catch((error) => message.error(error.data.message))
  }

  return (
    <ModuleWrapper>
      <Space size={24} direction={'vertical'} className={'w-full'}>
        {moduleFeatures.map((item, index) => {
          return (
            <FeaturePermission key={index} title={item.label}
                               permissions={item.permissions}
                               roles={args.roles} onSave={args.onSave}
                               onChange={args.onChange}
                               onEditLabelName={onEditLabelName}
                               onEditLabelFeature={onEditLabelFeature} />)
        })}
      </Space>
    </ModuleWrapper>
  )
}
export default Module

