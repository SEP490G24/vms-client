import React from 'react'
import { Dropdown, MenuProps } from 'antd'
import { EllipsisOutlined, MoreOutlined } from '@ant-design/icons'
import { RoleDto } from '~/interface'

interface RoleActionProps {
  role: RoleDto
  directionIcon?: 'horizontal' | 'vertical';
}

export const RoleActions: React.FC<RoleActionProps> = React.memo((props) => {

  const meetingActions: MenuProps['items'] = []

  return (
    <>
      <Dropdown menu={{ items: meetingActions }} placement='bottom'>
        {props.directionIcon === 'vertical' ? <MoreOutlined key='ellipsis' /> : <EllipsisOutlined key='ellipsis' />}
      </Dropdown>
    </>
  )
})
