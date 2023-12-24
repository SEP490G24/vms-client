import { CheckInManagerWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Card, Col, Divider, notification, Row, Space, TablePaginationConfig } from 'antd'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { PERMISSION_ROLE_MAP } from '~/role'
import { useTranslation } from 'react-i18next'
import { CheckInFilter } from '~/pages/CheckInManager/Filter'
import { useEffect, useState } from 'react'
import { EventSourceObserver, InfoModalData, MeetingQRDto, TableAction, TableData } from '~/interface'
import { CHECK_IN_EVENT, SCAN_CARD_EVENT, StatusTicketCustomer } from '~/constants'
import { CheckInFilterPayload } from '~/service/checkInService.ts'
import { checkInService, meetingTicketService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { CheckInTable } from '~/pages/CheckInManager/Table'
import { TicketInfoModal } from './TicketInfo'
import { CardDto } from '~/interface/Card.ts'


const CheckInManager = () => {

  const { t } = useTranslation()
  const [notificationApi, contextHolder] = notification.useNotification()
  const [tableData, setTableData] = useState<TableData<MeetingQRDto>>({ loading: false })
  const [filterPayload, setFilterPayload] = useState<CheckInFilterPayload>({})
  const [infoModalData, setInfoModalData] = useState<InfoModalData<MeetingQRDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [eventSource, setEventSource] = useState<EventSourceObserver>()
  const [scanCardDto, setScanCardDto] = useState<CardDto>({})

  useEffect(() => {
    fetchCheckIn()
  }, [filterPayload, tableAction])

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
          switch (message.event) {
            case CHECK_IN_EVENT: {
              switch (meetingQRCode.ticketCustomerStatus) {
                case StatusTicketCustomer.CHECK_IN:
                  notificationApi.success({
                    message: t('common.message.success.check-in'),
                    description: t('common.message.check-in.success', { customerName: meetingQRCode.customerInfo.visitorName })
                  })
                  break
                case StatusTicketCustomer.REJECT:
                  notificationApi.error({
                    message: t('common.message.error.check-in'),
                    description: t('common.message.check-in.reject', { customerName: meetingQRCode.customerInfo.visitorName })
                  })
                  break
              }
              setTableAction(resetCurrentPageAction(tableAction))
              break
            }
            case SCAN_CARD_EVENT: {
              setScanCardDto(JSON.parse(message.data))
              break
            }
          }
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

  }
  const openEdit = (checkInDto: MeetingQRDto) => {
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
          {checkPermission(PERMISSION_ROLE_MAP.R_TICKET_FIND_QR_CODE) && (
            <Row gutter={24} wrap={false}>
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
              <TicketInfoModal open={infoModalData.openModal} setCloseModal={setInfoModalData} confirmLoading={infoModalData.confirmLoading} width={1200}
                               scanCardDto={scanCardDto} meetingQRDto={infoModalData.entitySelected}
                               onClose={onClose} />
            </Row>
          )}
        </Space>
      </CheckInManagerWrapper>
    </>
  )
}

export default CheckInManager
