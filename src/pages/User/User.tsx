import { Col, Divider, message, Row, Space, Spin, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExcelTitle, ExportProps, SharedButton, ShareExportExcel } from '~/common'
import { PageableResponse, UserDto, UserFilterPayload } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { checkPermission } from '~/utils'
import { UserInfo } from './Info'
import { UserFilter } from './Filter'
import { userService } from '~/service'

const User = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<UserDto>>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [user, setUser] = useState<UserDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<UserFilterPayload>({})
  const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    userService.filter(filterPayload).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setFilterPayload({ ...filterPayload, pageNumber: page - 1 })
  }

  const onFilter = (filterPayload: UserFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request
    if (!!user) {
      request = userService.update(payload.username, payload)
    } else {
      request = userService.insert(payload)
    }
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setUser(undefined)
          userService.filter(filterPayload).then((response) => {
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
    // const dataExport = await userService.filter({}).then((res) => {
    //   return res?.data
    // })
    const titles: ExcelTitle[] = [
      {
        name: t('common.field.username'),
        width: 20,
        field: 'id',
        textAlign: 'center',
      },
      {
        name: t('common.field.first_name'),
        width: 15,
        field: 'firstName',
        textAlign: 'center',
      },
      {
        name: t('common.field.last_name'),
        width: 15,
        field: 'lastName',
        textAlign: 'center',
      },
      {
        name: t('common.field.phoneNumber'),
        width: 15,
        field: 'phoneNumber',
        textAlign: 'center'
      },

      {
        name: t('common.field.email'),
        field: 'email',
        width: 30,
        textAlign: 'center'
      },
      {
        name: t('common.field.used'),
        width: 15,
        field: 'enable',
        textAlign: 'center'
      },
      {
        name: t('common.field.created_by'),
        width: 15,
        field: 'createdBy',
        textAlign: 'center'
      },
      {
        name: t('common.field.registration_date'),
        width: 30,
        field: 'createdOn',
        textAlign: 'center'
      },
      {
        name: t('common.field.modification_date'),
        width: 30,
        field: 'lastUpdatedOn',
        textAlign: 'center'
      }
    ]
    const exportProps: ExportProps = {
      fileName: t('organization.user.export.file_name', {time: Date.now()}),
      titles: titles,
      data: pageableResponse?.content ?? []
    }
    await ShareExportExcel(exportProps)
    setExportEx(false)
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
            <Col flex={'none'} style={{ width: 450 }}>
              <UserFilter onFilter={onFilter} />
            </Col>
            <Col flex={'auto'}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <span> {t('organization.user.table.title', { count: pageableResponse?.totalElements ?? 0 })}</span>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
                    onClick={() => setOpenModal(true)}
                  >
                    {t('organization.user.table.btn-add')}
                  </SharedButton>
                  <Spin spinning={exportEx}>
                    <SharedButton onClick={exportData} type={'primary'}>
                      {t('common.label.export_data')}
                    </SharedButton>
                  </Spin>
                </Space>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <Table
                dataSource={pageableResponse?.content}
                rowKey='username'
                pagination={{
                  current: currentPage,
                  total: pageableResponse?.totalElements as number,
                  onChange: handlePageChange,
                  pageSize: pageableResponse?.pageable?.pageSize as number,
                  showSizeChanger: false,
                  position: ['bottomCenter']
                }}
                className='vms-table no-bg'
                scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
                size='middle'
              >
                <Column
                  title={t('common.field.user')}
                  render={(value) => <a onClick={() => openEdit(value)}>{value.firstName + ' ' + value.lastName}</a>}
                />
                <Column title={t('common.field.phoneNumber')} dataIndex='phoneNumber' key='phoneNumber' />
                <Column title={t('common.field.email')} dataIndex='email' key='email' />
                <Column
                  title={t('common.field.used')}
                  dataIndex='enable'
                  key='enable'
                  render={(enable) =>
                    enable ? t('common.label.use') : t('common.label.not_use')
                  }
                />
                <Column title={t('common.field.registration_date')} dataIndex='createdOn' key='createdOn' />
                <Column title={t('common.field.modification_date')} dataIndex='lastUpdatedOn' key='lastUpdatedOn' />
              </Table>
            </Col>
            {openModal && (
              <Modal
                open={openModal}
                closable={false}
                title={null}
                footer={null}
                confirmLoading={confirmLoading}
                width={550}
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
