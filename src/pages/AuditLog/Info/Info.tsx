import { Descriptions, Divider, Space } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AuditLogDto } from '~/interface'
import DescriptionsItem from 'antd/es/descriptions/Item'

interface CreateAuditLogFormArgs {
  auditLog?: AuditLogDto
  onClose: () => void
}

const Info: React.FC<CreateAuditLogFormArgs> = (props) => {
  const { t } = useTranslation()

  return (
    <Space className={'w-full'} direction={'vertical'}
           size={32}>
      <Divider orientation={'left'}>{t('common.field.audit_log_Info')}</Divider>
      <Descriptions bordered>
        <DescriptionsItem span={3}
          label={t('common.field.old_value')}>{props.auditLog?.oldValue}</DescriptionsItem>
        <DescriptionsItem span={3}
          label={t('common.field.new_value')}>{props.auditLog?.newValue}</DescriptionsItem>
      </Descriptions>
    </Space>
  )
}

export default Info
