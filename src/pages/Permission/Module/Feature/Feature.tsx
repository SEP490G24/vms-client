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

const Feature: React.FC<FeatureArgs> = (props) => {

  const { i18n } = useTranslation()
  const [title, setTitle] = useState('')

  const onChangeTitle = (value: string) => {
    if (title.trim() === value.trim()) return
    setTitle(value)
    props.onEditLabelFeature(value, props.permissions)
  }

  const onChangeName = (value: string, permission: PermissionDto) => {
    if (permission.label[i18n.language]?.name === value.trim()) return
    props.onEditLabelName(value, permission)
  }

  useEffect(() => {
    setTitle(props.title)
  }, [props.title])

  return (
    <FeatureWrapper>
      <Card title={<Typography.Title
        editable={checkPermission(REALM_ROLE_MAP.REALM_ADMIN) ? { onChange: onChangeTitle } : false}
        level={5}
        style={{ margin: '0 0 0 16px' }}>{title}</Typography.Title>}
      >
        <Table dataSource={props.permissions}
               rowKey={'id'}
               size='small'
               className='permissions-table'
               pagination={false}
        >
          <Column className={'w-1/5'} title=''
                  render={(permission) =>
                    <Space direction={'vertical'} size={2}>
                      <Text
                        editable={checkPermission(REALM_ROLE_MAP.REALM_ADMIN) ? { onChange: (value: string) => onChangeName(value, permission) } : false}
                        style={{ margin: '0 0 0 6px' }} strong>{permission.label[i18n.language]?.name}
                      </Text>
                      <Text type='secondary' style={{ margin: '0 0 0 6px' }}>{permission.name}</Text>
                    </Space>}
                  key='name' />
          {props.roles?.map((role) =>
            <Column align={'center'}
                    title={
                      <Space direction={'vertical'} size={2}>
                        <strong>{role.attributes.name?.join(' ') ?? ''}</strong>
                        <span className={'text-xs text-muted'}>{role.code}</span>
                      </Space>
                    }
                    render={(value) =>
                      <Checkbox
                        defaultChecked={role.permissionDtos.some(r => r.moduleId === value.moduleId && r.name === value.name)}
                        onChange={(event) => props.onChange(role.code, value, event)} />
                    } />)
          }
        </Table>
      </Card>
    </FeatureWrapper>
  )
}
export default Feature

