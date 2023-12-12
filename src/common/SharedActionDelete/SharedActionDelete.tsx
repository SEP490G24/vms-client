import React from 'react'
import { Dropdown, MenuProps } from 'antd'
import { EllipsisOutlined, MoreOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface MeetingActionProps {
  id: string;
  onDelete: (id: string) => void;
  directionIcon?: 'horizontal' | 'vertical';
}

export const SharedActionDelete: React.FC<MeetingActionProps> = React.memo((props) => {
  const { t } = useTranslation()

  const deleteActions: MenuProps['items'] = [
    {
      label: t('common.field.action_delete'),
      key: '1',
      danger: true,
      onClick: () => props.onDelete(props.id),
    },

  ]

  return (
    <>
      <Dropdown menu={{ items: deleteActions }} placement='bottom'>
        {props.directionIcon === 'vertical' ? <MoreOutlined key='ellipsis' /> : <EllipsisOutlined key='ellipsis' />}
      </Dropdown>
    </>
  )
})
