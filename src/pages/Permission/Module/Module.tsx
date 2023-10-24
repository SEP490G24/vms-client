import { ModuleWrapper } from './styles.ts'
import { Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { ModuleDto, PermissionDto, RoleDto } from '~/interface/Permission.ts'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import permissionService from '~/service/permissionService.ts'
import { useTranslation } from 'react-i18next'
import { groupBy } from '~/utils'
import { FeaturePermission } from './Feature'

interface ModuleArgs {
  module: ModuleDto;
  roles?: RoleDto[];
  onChange: (rId: string, permission: PermissionDto, event: CheckboxChangeEvent) => void,
  onSave: () => void,
}

const Module: React.FC<ModuleArgs> = (args) => {
  const { i18n } = useTranslation()
  const [features, setFeatures] = useState<Map<string, PermissionDto[]>>()

  useEffect(() => {
    setFeatures(groupBy(args.module.permissionDtos, permission => permission.group ?? ''))
  }, [args, i18n.language])

  const onEditLabelFeature = (value: string, permissions: PermissionDto[]) => {
    let objTmp: any = {}
    objTmp[`feature:${i18n.language}`] = [value]
    permissionService.updateAttribute(args.module.id, { attributes: objTmp, permissionDtos: permissions }).then(
      (response) => {
        console.log(response)
      }
    )
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

