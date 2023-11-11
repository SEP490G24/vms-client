import { RoomWrapper } from './styles.ts'

import { Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { PageableResponse, RoomDto, SortDirection, SortDirectionType, TableAction } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission, resetTableAction } from '~/utils'
import { RoomInfo } from './Info'
import { RoomFilter } from './Filter'
import { RoomFilterPayload, roomService } from '~/service'
import { RoomTable } from '~/pages/Room/Table'
import { FilterValue } from 'antd/es/table/interface'

const Room = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<RoomDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [room, setRoom] = useState<RoomDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<RoomFilterPayload>({})
  const [tableAction, setTableAction] = useState<TableAction>({})

  useEffect(() => {
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as RoomFilterPayload
    roomService.filter(payload, true, {
      page: currentPage - 1,
      size: 10,
      sort: tableAction.sorter?.order ? `${tableAction.sorter?.columnKey},${SortDirection[tableAction.sorter?.order as SortDirectionType]}` : undefined
    }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload, currentPage,tableAction])

  const onFilter = (filterPayload: RoomFilterPayload) => {
    setTableAction(resetTableAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!room ? roomService.update(room.id, payload) : roomService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setTableAction(resetTableAction(tableAction))
          setRoom(undefined)
          roomService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
            setPageableResponse(response?.data)
          })
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.failed.save'))
        }
      })
      .catch(async () => {
        await message.error(t('common.message.error'))
      })
  }

  const openEdit = (roomDto: RoomDto) => {
    setRoom(roomDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setRoom(undefined)
    setOpenModal(false)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setCurrentPage(pagination.current ?? 1)
    setTableAction({ pagination, filters, sorter })
  }

  // const exportData = async () => {
  // }


  return (
    <RoomWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.room.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <RoomFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.room.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.room.table.btn-add')}
                  </SharedButton>
                  {/*<Spin spinning={false}>*/}
                  {/*  <SharedButton onClick={exportData} type={'primary'}>*/}
                  {/*    {t('common.label.export_data')}*/}
                  {/*  </SharedButton>*/}
                  {/*</Spin>*/}
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <RoomTable pageableResponse={pageableResponse} currentPage={currentPage} onChangeTable={handleChangeTable}
                         onEdit={openEdit} />
            </Col>
            {openModal && (
              <Modal
                open={openModal}
                closable={false}
                title={null}
                footer={null}
                confirmLoading={confirmLoading}
                width={650}
                onCancel={onClose}
              >
                <RoomInfo onClose={onClose} room={room} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </RoomWrapper>
  )
}

export default Room
