import React, { memo } from 'react'
import { Badge } from 'antd'
import { useTranslation } from 'react-i18next'

interface SharedStatusProps {
  status: boolean
}

export const SharedStatus: React.FC<SharedStatusProps> = memo(
  ({ status }) => {
    const { t } = useTranslation()

    return status ? <Badge status='processing' text={t('common.label.enable')} /> :
      <Badge status='error' text={t('common.label.disable')} />
  }
)
