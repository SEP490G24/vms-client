import React from 'react'
import { Badge, Card, Descriptions } from 'antd'
import { SharedButton } from '~/common'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { TemplateDto } from '~/interface'
import { useTranslation } from 'react-i18next'

interface TemplateItemProps {
  templateDto?: TemplateDto
  onEdit: (templateDto?: TemplateDto) => void
}

export const TemplateItem: React.FC<TemplateItemProps> = React.memo((props) => {
  const { t } = useTranslation()
  return (
    <Card title={props.dataList.name}
          extra={<SharedButton onClick={() => props.onEdit(props.dataList)}>Edit</SharedButton>}>
      <Descriptions bordered>
        <DescriptionsItem label={t('common.field.code')} span={3}>
          {props.dataList.code}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.name')} span={3}>
          {props.dataList.name}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.type')} span={3}>
          {props.dataList.type}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.subject')} span={3}>
          {props.dataList.subject}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.status')} span={3}>
          {
            props.dataList.enable == true ? <Badge status='success' text='Enable' /> : <Badge status='error' text='Disable' />
          }
        </DescriptionsItem>
        <DescriptionsItem label={'Body'} span={3}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.description')} span={3}>
          {props.dataList.description}
        </DescriptionsItem>
      </Descriptions>
    </Card>
  )
})
