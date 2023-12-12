import { Card, Select, Space } from 'antd'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { checkPermission, enumToArray } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'
import { MONTHS } from '~/constants'
import React, { useEffect, useState } from 'react'
import { SharedButton } from '~/common'
import { useTranslation } from 'react-i18next'

export interface OverviewFilterPayload {
  siteId?: string
  year?: number
  month?: number
}

interface Props {
  onFilter: (filterPayload: OverviewFilterPayload) => void
}

const OverviewFilter: React.FC<Props> = (props) => {

  const { t } = useTranslation()
  const defaultValue = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  }

  const { sites } = useSelector(sitesSelector)
  const [filterPayload, setFilterPayload] = useState<OverviewFilterPayload>(defaultValue)

  useEffect(() => {
    onFilter()
  }, [])

  const onReset = () => {
    setFilterPayload(defaultValue)
    props.onFilter(defaultValue)
  }

  const onFilter = () => {
    props.onFilter(filterPayload)
  }

  return (
    <Card title={t('dashboard.search.title')}
          extra={
            <Space>
              <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
              <SharedButton
                type={'primary'}
                onClick={onFilter}
              >
                {t('common.label.search')}
              </SharedButton>
            </Space>
          }>
      <Space className={'w-full'} size={24}>
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
          <Card className={'bg-body'}>
            <strong className={'mr-4'}>{t('common.field.site.name')}</strong>
            <Select
              bordered={false}
              className={'w-[240px] bg-white'}
              value={filterPayload.siteId}
              placeholder={'Select Site '}
              allowClear
              onChange={(value) => setFilterPayload({ ...filterPayload, siteId: value })}
              options={sites.map((site) => {
                return { label: site.name, value: site.id, key: site.id }
              }) ?? []}
            />
          </Card>
        }
        <Card className={'bg-body'}>
          <strong className={'mr-4'}>{t('common.label.year')}</strong>
          <Select bordered={false}
                  className={'bg-white'}
                  allowClear
                  placeholder={'Select year'}
                  value={filterPayload.year}
                  onChange={(value) => setFilterPayload({ ...filterPayload, year: value })}
                  options={Array.from(Array(5)).map((_, index) => {
                    const year = new Date().getFullYear() - index
                    return { label: year, value: year }
                  })} />
        </Card>
        <Card className={'bg-body'}>
          <strong className={'mr-4'}>{t('common.label.month')}</strong>
          <Select bordered={false}
                  className={'bg-white'}
                  allowClear
                  placeholder={'Select months'}
                  value={filterPayload.month}
                  disabled={!filterPayload.year}
                  onChange={(value) => setFilterPayload({ ...filterPayload, month: value })}
                  options={enumToArray(MONTHS).map((month) => {
                    return { label: month.key, value: +month.value + 1 }
                  })} />
        </Card>
      </Space>
    </Card>
  )
}

export default OverviewFilter
