import { CheckInManagerWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Card, Col, Divider, notification, Row, Space, TablePaginationConfig } from 'antd'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { PERMISSION_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { CheckInFilter } from '~/pages/CheckInManager/Filter'
import { useEffect, useState } from 'react'
import { EventSourceObserver, InfoModalData, MeetingQRDto, StatusTicket, TableAction, TableData } from '~/interface'
import { CheckInFilterPayload } from '~/service/checkInService.ts'
import { checkInService, meetingTicketService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { CheckInTable } from '~/pages/CheckInManager/Table'
import Modal from 'antd/es/modal/Modal'
import { TicketInfo } from '~/pages/CheckInManager/TicketInfo'


const CheckInManager = () => {

  const { t } = useTranslation()
  const [notificationApi, contextHolder] = notification.useNotification()
  const [tableData, setTableData] = useState<TableData<MeetingQRDto>>({ loading: false })
  const [filterPayload, setFilterPayload] = useState<CheckInFilterPayload>({})
  const [infoModalData, setInfoModalData] = useState<InfoModalData<MeetingQRDto>>({
    openModal: false,
    confirmLoading: false,
    entitySelected: undefined
  })
  const [meetingQRDto, setMeetingQRDto] = useState<MeetingQRDto>()
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [eventSource, setEventSource] = useState<EventSourceObserver>()

  useEffect(() => {
    fetchCheckIn()
  }, [filterPayload, tableAction])

  useEffect(() => {
    if (infoModalData.entitySelected?.checkInCode) {
      meetingTicketService.findByQRCode(infoModalData.entitySelected?.checkInCode).then((response) => {
        setMeetingQRDto(response.data)
      })
    }
  }, [infoModalData.entitySelected?.checkInCode])

  useEffect(() => {
    !eventSource && meetingTicketService.subscribeCheckIn().then((response) => {
      setEventSource(response)
    })
  }, [])

  useEffect(() => {
    if (eventSource) {
      eventSource.observer.subscribe({
        next: (message) => {
          const meetingQRCode: MeetingQRDto = JSON.parse(message.data)
          switch (meetingQRCode.ticketCustomerStatus) {
            case StatusTicket.CHECK_IN:
              notificationApi.success({
                message: t('common.message.success.check-in'),
                description: t('common.message.check-in.success', { customerName: meetingQRCode.customerInfo.visitorName })
              })
              break
            case StatusTicket.REJECT:
              notificationApi.error({
                message: t('common.message.error.check-in'),
                description: t('common.message.check-in.reject', { customerName: meetingQRCode.customerInfo.visitorName })
              })
              break
          }
          setTableAction(resetCurrentPageAction(tableAction))
        }
      })
      return () => {
        eventSource.close()
      }
    }
  }, [eventSource])

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
  const openEdit = (checkInDto: MeetingQRDto) => {
    console.log(checkInDto.checkInCode)
    setInfoModalData({ ...infoModalData, entitySelected: checkInDto, openModal: true })
  }
  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }
  return (
    <>
      {contextHolder}
      <CheckInManagerWrapper>
        <Space direction='vertical' size={24} style={{ width: '100%' }}>
          <Space>
            <h2>{t('check-in.title')}</h2>
            <Divider type='vertical' />
          </Space>
          {checkPermission(PERMISSION_ROLE_MAP.R_USER_FILTER) && (
            <Row className={'w-full m-0'} gutter={24} wrap={false}>
              <Col flex={'none'} span={12}>
                <CheckInFilter onFilter={onFilter} />
              </Col>
              <Col flex={'auto'}>
                <Card>
                  <CheckInTable loading={tableData.loading}
                                pageableResponse={tableData.pageableResponse}
                                currentPage={tableAction.pagination?.current}
                                onChangeTable={handleChangeTable}
                                onEdit={openEdit}
                  />
                </Card>
              </Col>
              <Modal
                open={infoModalData.openModal}
                closable={false}
                title={null}
                footer={null}
                confirmLoading={infoModalData.confirmLoading}
                width={1000}
                onCancel={onClose}
              >
                <TicketInfo ticketResult={{
                  checkInCode: (infoModalData.entitySelected?.checkInCode) ? infoModalData.entitySelected?.checkInCode : '',
                  meetingQRDto: meetingQRDto
                }} />
              </Modal>
            </Row>
          )}
        </Space>
      </CheckInManagerWrapper>
    </>
  )
}

export default CheckInManager
