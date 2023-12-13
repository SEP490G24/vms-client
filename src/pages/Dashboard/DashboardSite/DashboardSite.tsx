import { message, Space } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

import { ContentStyled, DashboardSiteWrapper, TimeLastUpdateStyle } from './styles.ts'
import {
  MeetingCountDown,
  OverviewFilterDashboard,
  OverviewFilterPayload,
  TicketPurposeDashboard,
  TicketStatisticDashboard,
  TicketStatusDashboard
} from '~/pages'
import { DashboardFilterPayload, dashboardService } from '~/service'
import { useEffect, useState } from 'react'
import {
  MultiLineResponse,
  PurposePieResponse,
  TicketsPeriodResponse,
  TotalTicketResponse,
  TotalVisitsResponse
} from '~/interface'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useFirstRender } from '~/hook'


const DashboardSite = () => {

  const { t } = useTranslation()

  const [filterPayload, setFilterPayload] = useState<DashboardFilterPayload>({})
  const [totalTicketResponse, setTotalTicketResponse] = useState<TotalTicketResponse>({})
  const [totalVisitsResponse, setTotalVisitsResponse] = useState<TotalVisitsResponse>({})
  const [ticketStateColumnResponse, setTicketStateColumnResponse] = useState<MultiLineResponse[]>([])
  const [visitsStateColumnResponse, setVisitsStateColumnResponse] = useState<MultiLineResponse[]>([])
  const [ticketPurposeMultiLineResponse, setTicketPurposeMultiLineResponse] = useState<MultiLineResponse[]>([])
  const [ticketPurposePieResponse, setTicketPurposePieResponse] = useState<PurposePieResponse[]>([])
  const [ticketsPeriodResponse, setTicketsPeriodResponse] = useState<TicketsPeriodResponse>({})

  const [lastTimeUpdate, setLastTimeUpdate] = useState<Date>(new Date())
  const [timeClickManual, setTimeClickManual] = useState<Date>()
  const firstRender = useFirstRender()


  useEffect(() => {
    if (firstRender) return
    fetchApi()
  }, [filterPayload])

  const handleFilter = (values: OverviewFilterPayload) => {
    setFilterPayload({
      year: values.year,
      month: values.month,
      siteId: values.siteId ? [values.siteId] : []
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh()
    }, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const onRefresh = () => {
    if (timeClickManual && Date.now() - timeClickManual.getTime() < 60 * 1000) {
      message.warning(t('common.message.warning.try-again')).then()
    } else {
      fetchApi()
      setTimeClickManual(new Date())
      setLastTimeUpdate(new Date())
      message.success(t('common.message.success.refresh')).then()
    }
  }


  const fetchApi = () => {
    fetchDataStatistic()
    fetchStateDataChart()
    fetchPurposeDataChart()
    fetchTicketsPeriod()
  }

  const fetchDataStatistic = () => {
    dashboardService.countTicketsByStatus(filterPayload).then((response) => {
      if (response.data) {
        setTotalTicketResponse(response.data)
      }
    })

    dashboardService.countVisitsByStatus(filterPayload).then((response) => {
      if (response.data) {
        setTotalVisitsResponse(response.data)
      }
    })
  }

  const fetchStateDataChart = () => {
    dashboardService.countVisitsByStatusWithStackedColumn(filterPayload).then((response) => {
      if (response.data) {
        setVisitsStateColumnResponse(response.data)
      }
    })

    dashboardService.countTicketsByStatusWithStackedColumn(filterPayload).then((response) => {
      if (response.data) {
        setTicketStateColumnResponse(response.data)
      }
    })
  }

  const fetchPurposeDataChart = () => {
    dashboardService.countTicketsByPurposeByWithMultiLine(filterPayload).then((response) => {
      if (response.data) {
        setTicketPurposeMultiLineResponse(response.data)
      }
    })

    dashboardService.countTicketsByPurposeWithPie(filterPayload).then((response) => {
      if (response.data) {
        setTicketPurposePieResponse(response.data)
      }
    })
  }

  const fetchTicketsPeriod = () => {
    dashboardService.countTicketsPeriod(filterPayload).then((response) => {
      if (response.data) {
        setTicketsPeriodResponse(response.data)
      }
    })
  }

  return (
    <DashboardSiteWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space className={'w-full justify-between'} align={'center'}>
          <h2>{t('dashboard.title')}</h2>
          <Space className='refresh-dashboard-content' align={'center'}>
            <RedoOutlined className={'refresh-icon'} onClick={onRefresh} />
            <ContentStyled>{t('dashboard.lastUpdate')}</ContentStyled>
            <TimeLastUpdateStyle> {moment(lastTimeUpdate).format('llll')}</TimeLastUpdateStyle>
          </Space>
        </Space>
        <Space className={'w-full mb-10'} size={32} direction={'vertical'}>
          <OverviewFilterDashboard onFilter={handleFilter} />
          <TicketStatisticDashboard totalTicket={totalTicketResponse} totalVisits={totalVisitsResponse}
                                    filterLabel={filterPayload.month ? t('common.label.month') : t('common.label.year')} />
          <TicketStatusDashboard visitsStateColumn={visitsStateColumnResponse}
                                 ticketStateColumn={ticketStateColumnResponse} />
          <TicketPurposeDashboard ticketPurposePie={ticketPurposePieResponse}
                                  ticketPurposeMultiLine={ticketPurposeMultiLineResponse} />
          <MeetingCountDown ticketsPeriod={ticketsPeriodResponse} onRefresh={fetchTicketsPeriod} />
        </Space>
      </Space>
    </DashboardSiteWrapper>
  )
}

export default DashboardSite
