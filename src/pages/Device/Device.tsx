import { DeviceWrapper } from './styles.ts'

import { Col, Divider, message, Row, Space} from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { DeviceDto, PageableResponse} from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'
import { DeviceInfo } from './Info'
import { DeviceFilter } from './Filter'
import { DeviceFilterPayload, deviceService } from '~/service'
import { DeviceTable } from '~/pages/Device/Table'

const Device = () => {

  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<DeviceDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [device, setDevice] = useState<DeviceDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<DeviceFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    deviceService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      setPageableResponse(response?.data)
    })
    console.log(pageableResponse)
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: DeviceFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    const request = !!device ? deviceService.update(device.id, payload) : deviceService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setDevice(undefined)
          deviceService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
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

  const openEdit = (deviceDto: DeviceDto) => {
    setDevice(deviceDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setDevice(undefined)
    setOpenModal(false)
  }

  return (
    <DeviceWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.device.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_DEVICE_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <DeviceFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.device.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.device.table.btn-add')}
                  </SharedButton>
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <DeviceTable pageableResponse={pageableResponse} loading={false} onEdit={openEdit} />
            </Col>
            {openModal && (
              <Modal
                open={openModal}
                closable={false}
                title={null}
                footer={null}
                confirmLoading={confirmLoading}
                width={750}
                onCancel={onClose}
              >
                <DeviceInfo onClose={onClose} device={device} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </DeviceWrapper>
  )
}

export default Device
