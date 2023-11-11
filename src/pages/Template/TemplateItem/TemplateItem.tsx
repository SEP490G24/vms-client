import React from 'react'
import { Card, Descriptions } from 'antd'
import { SharedButton, SharedStatus } from '~/common'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { TemplateDto } from '~/interface'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'

interface TemplateItemProps {
  templateDto: TemplateDto
  onEdit: (templateDto: TemplateDto) => void
}

export const TemplateItem: React.FC<TemplateItemProps> = React.memo((props) => {
  const { t } = useTranslation()
  return (
    <Card className={'w-full'} title={props.templateDto.name}
          extra={<SharedButton onClick={() => props.onEdit(props.templateDto)}>Edit</SharedButton>}>
      <Descriptions bordered>
        <DescriptionsItem label={t('common.field.code')} span={3}>
          {props.templateDto.code}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.name')} span={3}>
          {props.templateDto.name}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.type')} span={3}>
          {props.templateDto.type}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.subject')} span={3}>
          {props.templateDto.subject}
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.status')} span={3}>
          <SharedStatus status={props.templateDto.enable} />
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.description')} span={3}>
          {props.templateDto.description}
        </DescriptionsItem>
        <DescriptionsItem label={'Body'} span={3}>
          <PerfectScrollbar className={'h-[200px]'} dangerouslySetInnerHTML={{ __html: props.templateDto.body }}>
          </PerfectScrollbar>
        </DescriptionsItem>
      </Descriptions>
    </Card>
  )
})
