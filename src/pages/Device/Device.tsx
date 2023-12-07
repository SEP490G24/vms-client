import { DeviceWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { DeviceDto, InfoModalData, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { DeviceInfoModal } from './Info'
import { DeviceFilter } from './Filter'
import { DeviceFilterPayload, deviceService } from '~/service'
import { DeviceTable } from '~/pages/Device/Table'

const Device = () => {

  const { t } = useTranslation()

  const [tableData, setTableData] = useState<TableData<DeviceDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<DeviceDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<DeviceFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)

  useEffect(() => {
    fetchDevice()
  }, [filterPayload, tableAction])

  const fetchDevice = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as DeviceFilterPayload
    deviceService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: DeviceFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    console.log("trec")
    setInfoModalData({ ...infoModalData, confirmLoading: true })
    const request = !!infoModalData.entitySelected ? deviceService.update(infoModalData.entitySelected.id, payload) : deviceService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setInfoModalData({ confirmLoading: false, openModal: false, entitySelected: undefined })
          setTableAction(resetCurrentPageAction(tableAction))
          await message.success(t('common.message.success.save'))
        }
      })
      .catch(async () => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(t('common.message.error.save'))
      })
  }

  const openEdit = (deviceDto: DeviceDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: deviceDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  return (
    <DeviceWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.device.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_DEVICE_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <DeviceFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card
                title={
                  <strong> {t('organization.device.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>}
                extra={<Space>
                  <SharedButton
                    // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setInfoModalData({
                      ...infoModalData,
                      entitySelected: undefined,
                      openModal: true
                    })}
                  >
                    {t('organization.device.table.btn-add')}
                  </SharedButton>
                </Space>}
              >
                <DeviceTable pageableResponse={tableData.pageableResponse} loading={tableData.loading}
                             onEdit={openEdit} />
              </Card>
            </Col>

            <DeviceInfoModal open={infoModalData.openModal} confirmLoading={infoModalData.confirmLoading} width={750}
                             onClose={onClose} device={infoModalData.entitySelected} onSave={onSave} />
          </Row>
        )}
      </Space>
    </DeviceWrapper>
  )
}

export default Device
