import React from 'react'
import { Card, Descriptions } from 'antd'
import { SharedButton, SharedStatus } from '~/common'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { TemplateDto } from '~/interface'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'

interface TemplateItemProps {
  templateDto: TemplateDto
  onEdit: (templateDto?: TemplateDto) => void
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
          <PerfectScrollbar className={'h-[200px]'}>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
            section 1.10.32.
            {props.templateDto.body}
          </PerfectScrollbar>
        </DescriptionsItem>
      </Descriptions>
    </Card>
  )
})
