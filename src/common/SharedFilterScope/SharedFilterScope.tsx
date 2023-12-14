import React, { memo } from 'react'
import { SharedSelect } from '~/common'
import { Form } from 'antd'
import { sitesSelector } from '~/redux/slices/siteSlice.ts'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface SharedFilterScopeProps {
  siteId?: string,
  onChangeSite?: (siteId: string) => void
}

export const SharedFilterScope: React.FC<SharedFilterScopeProps> = memo((props) => {

    const { t } = useTranslation()
    const { sites } = useSelector(sitesSelector)

    // @ts-ignore
    return (
      <>
        <Form.Item className={'mb-3'} label={t('common.field.site.name')} name='siteId'>
          <SharedSelect
            allowClear
            options={sites.map((site) => {
              return { label: site.name, value: site.id, key: site.id }
            }) ?? []}
            onChange={(e?: any) => props.onChangeSite?.(e)}
            placeholder={t('common.placeholder.site')}></SharedSelect>
        </Form.Item>
      </>
    )
  },
)
