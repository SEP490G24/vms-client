import { MeetingListWrapper } from './styles.ts'
import { Col, Divider, message, Row, Segmented, Space, Table } from 'antd'
import { checkPermission } from '~/utils'
import { BUTTON_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { MeetingFilter } from '~/pages/Meeting/MeetingList/Filter'
import { useEffect, useState } from 'react'
import { MeetingDto, PageableResponse, UserDto } from '~/interface'
import { SharedButton } from '~/common'
import Column from 'antd/es/table/Column'
import moment from 'moment'
import Modal from 'antd/es/modal/Modal'
import { MeetingInfo } from '~/pages/Meeting/MeetingList/Info'
import { BarsOutlined, TableOutlined } from '@ant-design/icons'
import { MeetingFilterPayload, meetingsService } from '~/service'

const MeetingList = () => {

  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<MeetingDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [meeting, setMeeting] = useState<MeetingDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})

  useEffect(() => {
    meetingsService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!meeting ? meetingsService.update(meeting.id, payload) : meetingsService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setMeeting(undefined)
          meetingsService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
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

  const openEdit = (meetingDto: MeetingDto) => {
    setMeeting(meetingDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setMeeting(undefined)
    setOpenModal(false)
  }

  return (
    <MeetingListWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.manager.title')}</h2>
          <Segmented
            options={[
              {
                label: 'Table',
                value: 'Table',
                icon: <TableOutlined />
              },
              {
                label: 'List',
                value: 'List',
                icon: <BarsOutlined />
              }
            ]}
          />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} style={{ width: 450 }}>
              <MeetingFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space className={'w-full justify-between'}>
                <strong> {t('meeting.manager.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='primary'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('common.label.create')}
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
                rowKey='sitename'
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
                  title={t('common.field.site.name')}
                  render={(value: MeetingDto) => <a onClick={() => openEdit(value)}>{value.name}</a>}
                />
                <Column title={t('common.field.phoneNumber')} dataIndex='phoneNumber' key='phoneNumber' />
                <Column title={t('common.field.province')} dataIndex='province' key='province' />
                <Column title={t('common.field.district')} dataIndex='district' key='district' />
                <Column title={t('common.field.ward')} dataIndex='ward' key='ward' />
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
                <MeetingInfo onClose={onClose} meeting={meeting} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </MeetingListWrapper>
  )
}

export default MeetingList
