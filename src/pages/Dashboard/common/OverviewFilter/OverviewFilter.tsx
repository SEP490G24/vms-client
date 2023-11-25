import { Card, Select, Space } from 'antd'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { checkPermission, enumToArray } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'
import { MONTHS } from '~/interface'
import { useState } from 'react'
import { SharedButton } from '~/common'
import { useTranslation } from 'react-i18next'

interface OverviewFilterPayload {
  siteId?: string
  year?: number
  month?: number
}

function OverviewFilter() {

  const { t } = useTranslation()

  const { sites } = useSelector(sitesSelector)
  const [filterPayload, setFilterPayload] = useState<OverviewFilterPayload>({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  })

  const onReset = () => {
    setFilterPayload({
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    })
  }

  return (
    <Card title={'Overview Filter'}
          extra={
            <Space>
              <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
              <SharedButton
                type={'primary'}
              >
                {t('common.label.search')}
              </SharedButton>
            </Space>
          }>
      <Space className={'w-full'} size={24}>
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
          <Card className={'bg-body'}>
            <strong className={'mr-4'}>Site</strong>
            <Select
              bordered={false}
              className={'w-[140px] bg-white'}
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
          <strong className={'mr-4'}>Year</strong>
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
          <strong className={'mr-4'}>Month</strong>
          <Select bordered={false}
                  className={'bg-white'}
                  allowClear
                  placeholder={'Select months'}
                  value={filterPayload.month}
                  disabled={!filterPayload.year}
                  onChange={(value) => setFilterPayload({ ...filterPayload, month: value })}
                  options={enumToArray(MONTHS).map((month) => {
                    return { label: month.key, value: month.value }
                  })} />
        </Card>
      </Space>
    </Card>
  )
}

export default OverviewFilter
