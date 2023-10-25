import { ModuleWrapper } from './styles.ts'
import { message, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { ModuleDto, PermissionDto, RoleDto } from '~/interface/Permission.ts'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTranslation } from 'react-i18next'
import { groupBy } from '~/utils'
import { FeaturePermission } from './Feature'
import { permissionService } from '~/service'

interface ModuleArgs {
  module: ModuleDto;
  roles?: RoleDto[];
  onChange: (rId: string, permission: PermissionDto, event: CheckboxChangeEvent) => void,
  onSave: () => void,
}

const Module: React.FC<ModuleArgs> = (args) => {
  const { t, i18n } = useTranslation()
  const [features, setFeatures] = useState<Map<string, PermissionDto[]>>()

  useEffect(() => {
    setFeatures(groupBy(args.module.permissionDtos, permission => permission.group ?? ''))
  }, [args, i18n.language])

  const onEditLabelFeature = (value: string, permissions: PermissionDto[]) => {
    permissionService.updateAttribute(args.module.id, {
      attributes: { [`feature:${i18n.language}`]: [value] },
      permissionDtos: permissions
    }).then(() => message.success(t('common.message.success.save')))
  }

  return (
    <ModuleWrapper>
      <Space size={24} direction={'vertical'} className={'w-full'}>
        {Array.from(features?.entries() ?? []).map((entry, index) => {
          return (
            <FeaturePermission key={index} title={entry[1][0].label[i18n.language].feature ?? ''}
                               permissions={entry[1]}
                               roles={args.roles} onSave={args.onSave}
                               onChange={args.onChange} onEditLabelFeature={onEditLabelFeature} />)
        })}
      </Space>
    </ModuleWrapper>
  )
}
export default Module

