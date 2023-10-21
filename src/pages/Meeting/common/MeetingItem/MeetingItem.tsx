import React from 'react'
import { Badge, Card, Descriptions } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import DescriptionsItem from 'antd/es/descriptions/Item'

interface MeetingItemProps {
}

export const MeetingItem: React.FC<MeetingItemProps> = React.memo(() => {

  return (
    <Card
      className={'bg-body w-full'}
      actions={[
        <SettingOutlined key='setting' />,
        <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' />
      ]}
    >
      <Descriptions bordered>
        <DescriptionsItem label={'Product'} span={3}>
          Cloud Database
        </DescriptionsItem>
        <DescriptionsItem label={'Room'} span={3}>
          Room Meeting 2
        </DescriptionsItem>
        <DescriptionsItem label={'Order time'} span={3}>
          2018-04-24 18:00:00
        </DescriptionsItem>
        <DescriptionsItem label={'Status'} span={3}>
          <Badge status='processing' text='Running' />
        </DescriptionsItem>
      </Descriptions>
    </Card>
  )
})
