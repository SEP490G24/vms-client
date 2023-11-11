import { Col, Divider, message, Row, Space, Spin, TablePaginationConfig, Upload } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { PageableResponse, SortDirection, SortDirectionType, TableAction, UserDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { checkPermission, resetTableAction } from '~/utils'
import { UserInfo } from './Info'
import { UserFilter } from './Filter'
import { UserFilterPayload, userService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { RcFile } from 'antd/es/upload'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { UserTable } from '~/pages/User/Table'

const User = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<UserDto>>()
  const [user, setUser] = useState<UserDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [tableAction, setTableAction] = useState<TableAction>({})
  const [filterPayload, setFilterPayload] = useState<UserFilterPayload>({})
  const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    const payload = {
      ...filterPayload,
      enable: tableAction.filters?.enable?.[0]
    } as UserFilterPayload
    userService.filter(payload, true, {
      page: (tableAction.pagination?.current ?? 1) - 1,
      size: 10,
      sort: tableAction.sorter?.order ? `${tableAction.sorter?.columnKey},${SortDirection[tableAction.sorter?.order as SortDirectionType]}` : undefined
    }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload, tableAction])

  const onFilter = (filterPayload: UserFilterPayload) => {
    setTableAction(resetTableAction(tableAction))
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    let request = !!user ? userService.update(user.username, payload) : userService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setOpenModal(false)
          setUser(undefined)
          setTableAction(resetTableAction(tableAction))
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
        }
      })
      .catch(async () => {
        await message.error(t('common.message.error'))
      })
  }

  const openEdit = (userDto: UserDto) => {
    setUser(userDto)
    setOpenModal(true)
  }

  const onClose = () => {
    setUser(undefined)
    setOpenModal(false)
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
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Row gutter={24} wrap={false}>
            <Col flex={'none'} span={12}>
              <UserFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.user.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <Spin spinning={exportEx}>
                    <SharedButton onClick={exportData} icon={<DownloadOutlined />}>
                      {t('common.label.export_data')}
                    </SharedButton>
                  </Spin>
                  <Upload beforeUpload={beforeUpload} showUploadList={false}>
                    <SharedButton icon={<UploadOutlined />}>{t('common.label.import_data')}</SharedButton>
                  </Upload>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type={'primary'}
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.user.table.btn-add')}
                  </SharedButton>
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <UserTable onChangeTable={handleChangeTable} pageableResponse={pageableResponse}
                         currentPage={tableAction.pagination?.current}
                         onEdit={openEdit} />
            </Col>
            {openModal && (
              <Modal
                open={openModal}
                closable={false}
                title={null}
                footer={null}
                width={650}
                onCancel={onClose}
              >
                <UserInfo onClose={onClose} user={user} onSave={onSave} />
              </Modal>
            )}
          </Row>
        )}
      </Space>
    </PageWrapper>
  )
}

export default User
