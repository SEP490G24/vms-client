import React from 'react'
import { Card, Descriptions, Popconfirm, Space } from 'antd'
import { SharedButton, SharedStatus } from '~/common'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { TemplateDto } from '~/interface'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { checkPermission } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

interface TemplateItemProps {
  templateDto: TemplateDto
  onEdit: (templateDto: TemplateDto) => void
  onDelete: (id: string) => void
}

export const TemplateItem: React.FC<TemplateItemProps> = React.memo((props) => {
  const { t } = useTranslation()
  return (
    <Card className={'w-full'} title={props.templateDto.name}
          extra={
            <Space>
              {
                <Popconfirm
                  title={t('common.message.confirm.save.title')}
                  description={t('common.message.confirm.save.description')}
                  onConfirm={() => props.onDelete(props.templateDto.id)}
                  okText={t('common.label.yes')}
                  cancelText={t('common.label.no')}
                > <SharedButton>{t('common.button.delete')}</SharedButton>
                </Popconfirm>}
              <SharedButton type='primary'
                            onClick={() => props.onEdit(props.templateDto)}>{t('common.button.edit')}</SharedButton>
            </Space>
          }
    >
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
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
          < DescriptionsItem label={t('common.field.site_name')} span={3}>
            {props.templateDto.siteName}
          </DescriptionsItem>
        }
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
