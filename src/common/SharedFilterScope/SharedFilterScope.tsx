import React, { memo, useEffect, useState } from 'react'
import { SharedSelect } from '~/common'
import { Form } from 'antd'
import { findAllSites, sitesSelector } from '~/redux/slices/siteSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface SharedFilterScopeProps {

}

export const SharedFilterScope: React.FC<SharedFilterScopeProps> = memo(() => {

    const { t } = useTranslation()
    const { sites } = useSelector(sitesSelector)
    const dispatch = useDispatch()
    const [scope, setScope] = useState('ORGANIZATION')

    useEffect(() => {
      dispatch(findAllSites({}) as any)
    }, [])

    return (
      <>
        <Form.Item label={t('common.label.scope')} name='scope'>
          <SharedSelect
            options={[{ label: 'Organization', value: 'ORGANIZATION' }, { label: 'Site', value: 'SITE' }]}
            placeholder={t('common.label.scope')}
            onChange={setScope}
            defaultValue={scope}
          />
        </Form.Item>
        {scope === 'ORGANIZATION' && <Form.Item label={t('common.field.site.name')} name='siteId'>
          <SharedSelect options={sites.map((site) => {
            return { label: site.name, value: site.id, key: site.id }
          }) ?? []}
                        placeholder={t('common.placeholder.site')}></SharedSelect>
        </Form.Item>
        }
      </>
    )
  }
)
