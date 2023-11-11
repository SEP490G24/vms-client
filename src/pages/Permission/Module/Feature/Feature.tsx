import { FeatureWrapper } from './styles.ts'
import { Card, Checkbox, Space, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { PermissionDto, RoleDto } from '~/interface/Permission.ts'
import Column from 'antd/es/table/Column'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useTranslation } from 'react-i18next'
import { checkPermission } from '~/utils/common.ts'
import { REALM_ROLE_MAP } from '~/role'

const { Text } = Typography

interface FeatureArgs {
  title: string;
  roles?: RoleDto[];
  permissions: PermissionDto[];
  onChange: (rId: string, permission: PermissionDto, event: CheckboxChangeEvent) => void,
  onSave: () => void,
  onEditLabelFeature: (value: string, permissions: PermissionDto[]) => void
  onEditLabelName: (value: string, permission: PermissionDto) => void
}

const Feature: React.FC<FeatureArgs> = (args) => {

  const { i18n } = useTranslation()
  const [title, setTitle] = useState('')

  const onChangeTitle = (value: string) => {
    if (title.trim() === value.trim()) return
    setTitle(value)
    args.onEditLabelFeature(value, args.permissions)
  }

  const onChangeName = (value: string, permission: PermissionDto) => {
    if (permission.label[i18n.language]?.name === value.trim()) return
    args.onEditLabelName(value, permission)
  }

  useEffect(() => {
    setTitle(args.title)
  }, [args.title])

  return (
    <FeatureWrapper>
      <Card title={<Typography.Title editable={{ onChange: onChangeTitle }}
                                     level={5}
                                     style={{ margin: '0 0 0 16px' }}>{title}</Typography.Title>}
      >
        <Table dataSource={args.permissions}
               rowKey={'id'}
               size='small'
               className='permissions-table'
               pagination={false}
        >
          <Column className={'w-1/5'} title=''
                  render={(permission) =>
                    <Space direction={'vertical'} size={2}>
                      <Text editable={checkPermission(REALM_ROLE_MAP.REALM_ADMIN) ? { onChange: (value: string) => onChangeName(value, permission) } : false}
                            style={{ margin: '0 0 0 6px' }} strong>{permission.label[i18n.language]?.name}
                      </Text>
                      <Text type='secondary' style={{ margin: '0 0 0 6px' }}>{permission.name}</Text>
                    </Space>}
                  key='name' />
          {args.roles?.map((role) =>
            <Column align={'center'} title={role.code} render={(value) =>
              <Checkbox
                defaultChecked={role.permissionDtos.some(r => r.moduleId === value.moduleId && r.name === value.name)}
                onChange={(event) => args.onChange(role.code, value, event)} />
            } />)
          }
        </Table>
      </Card>
    </FeatureWrapper>
  )
}
export default Feature

