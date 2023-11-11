import { Card, Col, Divider, message, Row, Space, Spin, TablePaginationConfig, Upload } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { InfoModalData, TableAction, TableData, UserDto } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { checkPermission, formatSortParam, resetCurrentPageAction } from '~/utils'
import { UserInfo } from './Info'
import { UserFilter } from './Filter'
import { UserFilterPayload, userService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { RcFile } from 'antd/es/upload'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { UserTable } from '~/pages/User/Table'

const User = () => {
  const { t } = useTranslation()
  const [tableData, setTableData] = useState<TableData<UserDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<UserDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<UserFilterPayload>({})
  const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    fetchUser()
  }, [filterPayload, tableAction])

  const fetchUser = () => {
    setTableData({ ...tableData, loading: true })
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as UserFilterPayload
    userService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: formatSortParam(tableAction.sorter?.columnKey, tableAction.sorter?.order)
    }).then((response) => {
      setTableData({ pageableResponse: response.data, loading: false })
    }).catch(() => {
      setTableData({ ...infoModalData, loading: false })
    })
  }

  const onFilter = (filterPayload: UserFilterPayload) => {
    setTableAction(resetCurrentPageAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setInfoModalData({ ...infoModalData, confirmLoading: true })
    let request = !!infoModalData.entitySelected ? userService.update(infoModalData.entitySelected.username, payload) : userService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setInfoModalData({ confirmLoading: false, openModal: false, entitySelected: undefined })
          setTableAction(resetCurrentPageAction(tableAction))
          await message.success(t('common.message.success.save'))
        }
      })
      .catch(async () => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(t('common.message.error'))
      })
  }

  const openEdit = (userDto: UserDto) => {
    setInfoModalData({ ...infoModalData, entitySelected: userDto, openModal: true })
  }

  const onClose = () => {
    setInfoModalData({ ...infoModalData, entitySelected: undefined, openModal: false })
  }

  const exportData = async () => {
    setExportEx(true)
    userService.exportUser(filterPayload).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response?.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${t('organization.user.export.file_name', { time: Date.now() })}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    setExportEx(false)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }

  const beforeUpload = (file: RcFile) => {
    const formData = new FormData()
    formData.append('file', file as RcFile)
    userService.importUser(formData).then((res) => {
      console.log(res?.data)
    })
      .then(() => {
        message.success('upload successfully.').then()
      })
      .catch(() => {
        message.error('upload failed.').then()
      })
  }

  return (
    <PageWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.user.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(PERMISSION_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <UserFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Card
                title={
                  <strong>{t('organization.user.table.title', { count: tableData.pageableResponse?.totalElements ?? 0 })}</strong>}
                extra={<Space>
                  <Spin spinning={exportEx}>
                    <SharedButton onClick={exportData} icon={<DownloadOutlined />}>
                      {t('common.label.export_data')}
                    </SharedButton>
                  </Spin>
                  <Upload beforeUpload={beforeUpload} showUploadList={false}>
                    <SharedButton icon={<UploadOutlined />}>{t('common.label.import_data')}</SharedButton>
                  </Upload>
                  <SharedButton
                    // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                    type={'primary'}
                    onClick={() => setInfoModalData({
                      ...infoModalData,
                      entitySelected: undefined,
                      openModal: true
                    })}
                  >
                    {t('organization.user.table.btn-add')}
                  </SharedButton>
                </Space>
                }>
                <UserTable onChangeTable={handleChangeTable}
                           loading={tableData.loading}
                           pageableResponse={tableData.pageableResponse}
                           currentPage={tableAction.pagination?.current}
                           onEdit={openEdit} />
              </Card>
            </Col>
            <Modal
              open={infoModalData.openModal}
              confirmLoading={infoModalData.confirmLoading}
              closable={false}
              title={null}
              footer={null}
              width={650}
              onCancel={onClose}
            >
              <UserInfo onClose={onClose} user={infoModalData.entitySelected} onSave={onSave} />
            </Modal>
          </Row>
        )}
      </Space>
    </PageWrapper>
  )
}

export default User
