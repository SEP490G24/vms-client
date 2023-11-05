import { MeetingListWrapper } from './styles.ts'
import { Card, Col, Divider, Row, Segmented, Space, TablePaginationConfig } from 'antd'
import { checkPermission } from '~/utils'
import { BUTTON_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { MeetingFilter } from '~/pages/Meeting/MeetingStatistics/Filter'
import { useEffect, useState } from 'react'
import { MeetingDto, PageableResponse } from '~/interface'
import { SharedButton } from '~/common'
import Modal from 'antd/es/modal/Modal'
import { MeetingInfo } from '~/pages/Meeting/common/MeetingInfo'
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons'
import { MeetingFilterPayload, ticketService } from '~/service'
import MeetingTable from '~/pages/Meeting/MeetingStatistics/MeetingTable/MeetingTable.tsx'
import { MeetingKanban } from './MeetingKanban'
import { SegmentedValue } from 'rc-segmented'
import { FilterValue } from 'antd/es/table/interface'
import { MeetingCancelModals } from '~/pages/Meeting/common/MeetingCancelModal'

const MeetingStatistics = () => {

  const { t } = useTranslation()
  const [typeViews, setTypeViews] = useState('TABLE')
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<MeetingDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [meeting, setMeeting] = useState<MeetingDto>()
  const [editModal, setEditModal] = useState({ openModal: false })
  const [cancelModal, setCancelModal] = useState({ openModal: false, meeting: {} as MeetingDto })
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})

  useEffect(() => {
    ticketService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      console.log(response.data)
      setPageableResponse(response?.data)
    })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const openEdit = (meetingDto: MeetingDto) => {
    setMeeting(meetingDto)
    setEditModal({ openModal: true })
  }

  const onEditClose = () => {
    setMeeting(undefined)
    setEditModal({ openModal: false })
  }

  const onCancelMeeting = (values: any) => {
    console.log(values)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setCurrentPage(pagination.current ?? 1)
    console.log(pagination, filters, sorter)
  }

  return (
    <MeetingListWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.manager.title')}</h2>
          <Segmented
            onChange={(value: SegmentedValue) => setTypeViews(value as string)}
            options={[
              {
                label: 'Table',
                value: 'TABLE',
                icon: <TableOutlined />
              },
              {
                label: 'Kanban',
                value: 'KANBAN',
                icon: <AppstoreOutlined />
              }
            ]}
          />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <MeetingFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card>
                <Space className={'w-full justify-between'}>
                  <strong> {t('meeting.manager.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                  <Space>
                    <SharedButton
                      // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                      type='primary'
                      onClick={() => setEditModal({ openModal: true })}
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
                {typeViews === 'TABLE' ?
                  <MeetingTable onCancelMeeting={(meeting: MeetingDto) => setCancelModal({ openModal: true, meeting })}
                                pageableResponse={pageableResponse} currentPage={currentPage}
                                onChangeTable={handleChangeTable} onEdit={openEdit} /> :
                  <MeetingKanban onCancelMeeting={(meeting: MeetingDto) => setCancelModal({ openModal: true, meeting })}
                                 pageableResponse={pageableResponse} onEdit={openEdit} />}
              </Card>
            </Col>
            {editModal.openModal && (
              <Modal
                open={editModal.openModal}
                closable={false}
                title={null}
                footer={null}
                width={750}
                onCancel={onEditClose}
              >
                <MeetingInfo onClose={onEditClose} id={meeting?.id} />
              </Modal>
            )}
            {cancelModal.openModal && (
              <MeetingCancelModals openModal={cancelModal.openModal} meeting={cancelModal.meeting}
                                   onOk={onCancelMeeting}
                                   onClose={() => setCancelModal({ openModal: false, meeting: {} as MeetingDto })} />
            )}
          </Row>
        )}
      </Space>
    </MeetingListWrapper>
  )
}

export default MeetingStatistics
