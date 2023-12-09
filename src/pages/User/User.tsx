import { Card, Col, Divider, message, Row, Space, Spin, TablePaginationConfig } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedUploadModal } from '~/common'
import { InfoModalData, TableAction, TableData, UserDto } from '~/interface'
import { PERMISSION_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { exportFile, formatSortParam, resetCurrentPageAction } from '~/utils'
import { UserInfoModal } from './Info'
import { UserFilter } from './Filter'
import { UserFilterPayload, userService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { RcFile } from 'antd/es/upload'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { UserTable } from '~/pages/User/Table'
import { AuthSection } from '~/auth'

const User = () => {
  const { t } = useTranslation()
  const [tableData, setTableData] = useState<TableData<UserDto>>({ loading: false })
  const [infoModalData, setInfoModalData] = useState<InfoModalData<UserDto>>({
    openModal: false,
    confirmLoading: false
  })
  const [uploadModalData, setUploadModalData] = useState<InfoModalData<any>>({
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
      .catch(async (error) => {
        setInfoModalData({ ...infoModalData, confirmLoading: false })
        await message.error(error.data.message)
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
      if (response.data) {
        message.success(t('common.message.success.export'))
        exportFile(response.data, `${t('organization.user.export.file_name', { time: Date.now() })}.xlsx`)
      }
    }).catch((error) => message.error(error.data.message))
      .finally(() => setExportEx(false))
  }

  const downloadSample = async () => {
    userService.exportSample().then((response) => {
      if (response.data) {
        exportFile(response.data, `${t('organization.user.export.file_sample', { time: Date.now() })}.xlsx`)
      }
    }).catch((error) => message.error(error.data.message))
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setTableAction({ pagination, filters, sorter })
  }

  const openUploadModal = () => {
    setUploadModalData({ ...uploadModalData, openModal: true })
  }

  const closeUploadModal = () => {
    setUploadModalData({ ...uploadModalData, openModal: false })
  }

  const onImport = (file: RcFile) => {
    setUploadModalData({ ...uploadModalData, confirmLoading: false })
    userService.importUser(file).then(async () => {
      setUploadModalData({ confirmLoading: false, openModal: false })
      fetchUser()
      await message.success(t('common.message.success.upload'))
    })
      .catch(async (error) => {
        switch (error.status) {
          case 406: {
            message.error(t('common.message.error.import'))
            exportFile(error.data, `${t('organization.user.export.report_error_name', { time: Date.now() })}.xlsx`)
            break
          }
          case 500: {
            await message.error(error.data.message)
            break
          }
        }
        setUploadModalData({ ...uploadModalData, confirmLoading: false })
      }).finally(() => setExportEx(false))
  }

  return (
    <PageWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.user.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_USER_FILTER}>
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
                  <Spin spinning={exportEx}>
                    <SharedButton icon={<UploadOutlined />} onClick={openUploadModal}>
                      {t('common.label.import_data')}
                    </SharedButton>
                  </Spin>
                  <SharedButton
                    permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
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
            <UserInfoModal
              open={infoModalData.openModal} confirmLoading={infoModalData.confirmLoading} width={650}
              onClose={onClose} user={infoModalData.entitySelected} onSave={onSave} />
            <SharedUploadModal
              open={uploadModalData.openModal} confirmLoading={uploadModalData.confirmLoading} width={500}
              title={t('common.label.uploadFile')} onOk={onImport} onCancel={closeUploadModal}
              onDownloadSample={downloadSample} />
          </Row>
        </AuthSection>
      </Space>
    </PageWrapper>
  )
}

export default User
