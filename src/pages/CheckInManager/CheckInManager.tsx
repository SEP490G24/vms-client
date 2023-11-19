import { CheckInManagerWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Card, Col, Divider, Row, Space, TablePaginationConfig } from 'antd'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { PERMISSION_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { CheckInFilter } from '~/pages/CheckInManager/Filter'
import { useEffect, useState } from 'react'
import { CheckInDto, TableAction, TableData } from '~/interface'
import { CheckInFilterPayload } from '~/service/checkInService.ts'
import { checkInService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { CheckInTable } from '~/pages/CheckInManager/Table'



const CheckInManager = () => {

  const { t } = useTranslation()
  const [tableData, setTableData] = useState<TableData<CheckInDto>>({ loading: false })
  const [filterPayload, setFilterPayload] = useState<CheckInFilterPayload>({})
  const [tableAction, setTableAction] = useState<TableAction>({})
  useEffect(() => {
    fetchCheckIn()
  }, [filterPayload, tableAction])
  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }
  const fetchCheckIn = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as CheckInFilterPayload
    checkInService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ loading: false })
    })
  }
  const onFilter = (filterPayload: CheckInFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
    console.log(filterPayload)
  }
  return (
    <CheckInManagerWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('check-in.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_USER_FIND) && (
          <Row className={'w-full m-0'} gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <CheckInFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card>
                <CheckInTable loading={tableData.loading}
                              pageableResponse={tableData.pageableResponse}
                              currentPage={tableAction.pagination?.current}
                              onChangeTable={handleChangeTable}/>
              </Card>
            </Col>
          </Row>
        )}
      </Space>
    </CheckInManagerWrapper>
  )
}

export default CheckInManager
