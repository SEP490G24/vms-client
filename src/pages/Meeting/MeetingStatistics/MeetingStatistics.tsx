import { MeetingListWrapper } from './styles.ts'
import { Card, Col, Divider, Row, Segmented, Space, TablePaginationConfig } from 'antd'
import { PERMISSION_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Modal from 'antd/es/modal/Modal'
import { AppstoreOutlined, TableOutlined } from '@ant-design/icons'
import { MeetingFilterPayload, ticketService } from '~/service'
import { SegmentedValue } from 'rc-segmented'
import { FilterValue } from 'antd/es/table/interface'
import { SharedButton } from '~/common'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { InfoModalData, MeetingDto, TableAction, TableData } from '~/interface'
import { MeetingCancelModals, MeetingFilter, MeetingInfo, MeetingKanban, MeetingTable } from '~/pages'


const MeetingStatistics = () => {

  const { t } = useTranslation()
  const [viewType, setViewType] = useState('TABLE')
  const [tableData, setTableData] = useState<TableData<MeetingDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<MeetingDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [cancelModal, setCancelModal] = useState({ openModal: false, meeting: {} as MeetingDto })
  const [filterPayload, setFilterPayload] = useState<MeetingFilterPayload>({})

  const viewTypeOptions = [
    { label: t('common.label.table'), value: 'TABLE', icon: <TableOutlined /> },
    { label: t('common.label.kanban'), value: 'KANBAN', icon: <AppstoreOutlined /> }
  ]

  useEffect(() => {
    fetchMeetings()
  }, [filterPayload, tableAction])

  const fetchMeetings = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      purpose: tableAction.filters?.purpose?.[0],
      status: tableAction.filters?.status?.[0]
    } as MeetingFilterPayload
    ticketService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: MeetingFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const openEdit = (meetingDto: MeetingDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: meetingDto, openModal: true })
  }

  const onEditClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const onCancelMeeting = (values: any) => {
    console.log(values)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }

  return (
    <MeetingListWrapper>
      <Space direction='vertical' size={24} className={'w-full'}>
        <Space className={'w-full justify-between'}>
          <h2>{t('meeting.manager.title')}</h2>
          <Segmented
            onChange={(value: SegmentedValue) => setViewType(value as string)}
            options={viewTypeOptions}
          />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <MeetingFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card>
                <Space className={'w-full justify-between'}>
                  <strong> {t('meeting.manager.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>
                  <Space>
                    <SharedButton
                      // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                      type='primary'
                      onClick={() => setInfoModalData({
                        ...infoModalData,
                        entitySelected: undefined,
                        openModal: true
                      })}
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
                {viewType === 'TABLE' ?
                  <MeetingTable
                    pageableResponse={tableData.pageableResponse}
                    currentPage={tableAction.pagination?.current}
                    loading={tableData.loading}
                    onCancelMeeting={(meeting: MeetingDto) => setCancelModal({ openModal: true, meeting })}
                    onChangeTable={handleChangeTable} onEdit={openEdit} /> :
                  <MeetingKanban
                    pageableResponse={tableData.pageableResponse}
                    loading={tableData.loading}
                    onCancelMeeting={(meeting: MeetingDto) => setCancelModal({ openModal: true, meeting })}
                    onEdit={openEdit} />}
              </Card>
            </Col>
            <Modal
              open={infoModalData.openModal}
              confirmLoading={infoModalData.confirmLoading}
              closable={false}
              title={null}
              footer={null}
              width={750}
              onCancel={onEditClose}
            >
              <MeetingInfo onClose={onEditClose} id={infoModalData.entitySelected?.id} />
            </Modal>
            <MeetingCancelModals
              openModal={cancelModal.openModal}
              meeting={cancelModal.meeting}
              onOk={onCancelMeeting}
              onClose={() => setCancelModal({ openModal: false, meeting: {} as MeetingDto })} />
          </Row>
        )}
      </Space>
    </MeetingListWrapper>
  )
}

export default MeetingStatistics
