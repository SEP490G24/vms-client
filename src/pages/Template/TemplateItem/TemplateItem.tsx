import React from 'react'
import { Badge, Card, Descriptions } from 'antd'
import { SharedButton } from '~/common'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { TemplateDto } from '~/interface'

interface TemplateItemProps {
  templateDto?: TemplateDto
  onEdit: (templateDto?: TemplateDto) => void
}

export const TemplateItem: React.FC<TemplateItemProps> = React.memo((props) => {


  return (
    <Card title={'Send Mail Confirm'}
          extra={<SharedButton onClick={() => props.onEdit(props.templateDto)}>Edit</SharedButton>}>
      <Descriptions bordered>
        <DescriptionsItem label={'Type'} span={3}>
          Email
        </DescriptionsItem>
        <DescriptionsItem label={'Room'} span={3}>
          Name
        </DescriptionsItem>
        <DescriptionsItem label={'Order time'} span={3}>
          Template Confirm
        </DescriptionsItem>
        <DescriptionsItem label={'Order time'} span={3}>
          Template for send mail confirm customer
        </DescriptionsItem>
        <DescriptionsItem label={'Status'} span={3}>
          <Badge status='processing' text='Running' />
        </DescriptionsItem>
        <DescriptionsItem label={'Body'}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </DescriptionsItem>
      </Descriptions>
    </Card>
  )
})
