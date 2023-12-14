import { RoomWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { InfoModalData, RoomDto, TableAction, TableData } from '~/interface'
import { PERMISSION_ROLE_MAP, SCOPE_ROLE_MAP } from '~/role'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { RoomFilter } from './Filter'
import { RoomFilterPayload, roomService } from '~/service'
import { RoomTable } from '~/pages/Room/Table'
import { FilterValue } from 'antd/es/table/interface'
import { RoomInfoModal } from '~/pages/Room/Info'
import { findAllRoom } from '~/redux'
import { useDispatch } from 'react-redux'


const Room = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState<TableData<RoomDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<RoomDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<RoomFilterPayload>({})

  useEffect(() => {
    fetchRooms()
  }, [filterPayload, tableAction])

  const fetchRooms = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as RoomFilterPayload
    roomService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
      if (!checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) dispatch(findAllRoom({}) as any)
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: RoomFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setInfoModalData({ ...infoModalData, confirmLoading: true })
    if(!payload.deviceId){
      payload.deviceId = null;
    }
    let request = !!infoModalData.entitySelected ? roomService.update(infoModalData.entitySelected.id, payload) : roomService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setInfoModalData({ confirmLoading: false, openModal: false, entitySelected: undefined })
          setTableAction(resetCurrentPageAction(tableAction))
          await message.success(t('common.message.success.save'))
        }
      })
      .catch(async (error) => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(error.data.message)
      })
  }

  const openEdit = (roomDto: RoomDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: roomDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const onDelete = (roomId: string) => {
    roomService.remove(roomId).then( (response) => {
      if(response.status === 200){
        message.success(t('common.message.success.delete'))
        fetchRooms()
      }
    }).catch( async () => {
      await  message.error(t('common.message.error.delete'))
    })
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }


  return (
    <RoomWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.room.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_ROOM_FILTER) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <RoomFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card
                title={
                  <strong> {t('organization.room.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>}
                extra={<SharedButton
                  // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                  type='default'
                  onClick={() => setInfoModalData({
                    ...infoModalData,
                    entitySelected: undefined,
                    openModal: true
                  })}
                >
                  {t('organization.room.table.btn-add')}
                </SharedButton>}
              >
                <RoomTable
                  loading={tableData.loading}
                  pageableResponse={tableData.pageableResponse}
                  currentPage={tableAction.pagination?.current}
                  onChangeTable={handleChangeTable}
                  onEdit={openEdit} onDelete={onDelete}
                />
              </Card>
            </Col>
            <RoomInfoModal open={infoModalData.openModal} confirmLoading={infoModalData.confirmLoading} width={650}
                           room={infoModalData.entitySelected}  onClose={onClose} onSave={onSave} />
          </Row>
        )}
      </Space>
    </RoomWrapper>
  )
}

export default Room
