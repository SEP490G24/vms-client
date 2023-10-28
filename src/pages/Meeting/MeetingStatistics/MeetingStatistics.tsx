import { MeetingListWrapper } from './styles.ts'
import { Card, Col, Divider, message, Row, Segmented, Space } from 'antd'
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
import { MeetingFilterPayload, meetingsService } from '~/service'
import MeetingTable from '~/pages/Meeting/MeetingStatistics/MeetingTable/MeetingTable.tsx'
import { MeetingKanban } from './MeetingKanban'
import { SegmentedValue } from 'rc-segmented'

const MeetingStatistics = () => {

  const { t } = useTranslation()
  const [typeViews, setTypeViews] = useState('TABLE')
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
                {typeViews === 'TABLE' ? <MeetingTable pageableResponse={pageableResponse} currentPage={currentPage}
                                                       setCurrentPage={setCurrentPage} onEdit={openEdit} /> :
                  <MeetingKanban pageableResponse={pageableResponse} onEdit={openEdit} />}
              </Card>
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

export default MeetingStatistics
