import { RoomWrapper } from './styles.ts'

import { Col, Divider, message, Row, Space, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { DepartmentDto, PageableResponse, RoomDto, UserDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'
import { RoomInfo } from './Info'
import { RoomFilter } from './Filter'
import { RoomFilterPayload, roomService } from '~/service'
import moment from 'moment/moment'

const Room = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<RoomDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [room, setRoom] = useState<RoomDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<RoomFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    roomService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: RoomFilterPayload) => {
    setCurrentPage(1)
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
          setRoom(undefined)
          roomService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
            setPageableResponse(response?.data)
          })
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
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
              <Table
                dataSource={pageableResponse?.content}
                rowKey='roomname'
                pagination={{
                  current: currentPage,
                  total: pageableResponse?.totalElements as number,
                  onChange: setCurrentPage,
                  pageSize: pageableResponse?.pageable?.pageSize as number,
                  showSizeChanger: false,
                  position: ['bottomCenter']
                }}
                className='vms-table no-bg'
                scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
                size='middle'
              >
                <Column
                  title={t('common.field.room')}
                  render={(value: DepartmentDto) => <a onClick={() => openEdit(value)}>{value.name}</a>}
                />
                <Column title={t('common.field.code')} dataIndex='code' key='code' />
                <Column
                  title={t('common.field.status')}
                  dataIndex='enable'
                  key='enable'
                  render={(enable) =>
                    enable ? t('common.label.enable') : t('common.label.disable')
                  }
                />
                <Column title={t('common.field.registration_date')} key='createdOn'
                        render={(value: UserDto) => moment(value.createdOn).format('L')} />
                <Column title={t('common.field.modification_date')} key='lastUpdatedOn'
                        render={(value: UserDto) => moment(value.lastUpdatedOn ?? value.createdOn).format('L')} />
              </Table>
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
