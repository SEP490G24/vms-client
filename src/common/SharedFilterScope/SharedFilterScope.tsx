import React, { memo, useEffect } from 'react'
import { SharedSelect } from '~/common'
import { Form } from 'antd'
import { findAllSites, sitesSelector } from '~/redux/slices/siteSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface SharedFilterScopeProps {
  siteId?: string,
  onChangeSite?: (siteId: string) => void
}

export const SharedFilterScope: React.FC<SharedFilterScopeProps> = memo((props) => {

    const { t } = useTranslation()
    const { sites } = useSelector(sitesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(findAllSites({}) as any)
    }, [])

    // @ts-ignore
  return (
      <>
        <Form.Item label={t('common.field.site.name')} name='siteId'>
          <SharedSelect allowClear options={sites.map((site) => {
            return { label: site.name, value: site.id, key: site.id }
          }) ?? []}
                        onChange={(e?:any) => props.onChangeSite?.(e)}
                        placeholder={t('common.placeholder.site')}></SharedSelect>
        </Form.Item>
      </>
    )
  }
)
