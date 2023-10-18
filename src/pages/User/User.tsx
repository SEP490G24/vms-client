import { Col, Divider, message, Row, Space, Spin, Table, TablePaginationConfig, Tag, Upload } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { PageableResponse, UserDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { PageWrapper } from '~/themes'
import { checkPermission } from '~/utils'
import { UserInfo } from './Info'
import { UserFilter } from './Filter'
import { UserFilterPayload, userService } from '~/service'
import moment from 'moment'
import { FilterValue } from 'antd/es/table/interface'
import { RcFile } from 'antd/es/upload'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'

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
    userService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
      setPageableResponse(response?.data)
    })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: UserFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!user ? userService.update(user.username, payload) : userService.insert(payload)
    request
      .then(async (res: any) => {
        console.log('res', res)
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          setUser(undefined)
          userService.filter(filterPayload, true, { page: currentPage, size: 10 }).then((response) => {
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

  const handleChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    console.log(pagination, filters, sorter)
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
            <Col flex={'none'} style={{ width: 450 }}>
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
              <Table
                dataSource={pageableResponse?.content}
                rowKey='username'
                pagination={{
                  current: currentPage,
                  total: pageableResponse?.totalElements as number,
                  onChange: setCurrentPage,
                  pageSize: pageableResponse?.pageable?.pageSize as number,
                  showSizeChanger: false,
                  position: ['bottomCenter']
                }}
                onChange={handleChange}
                className='vms-table no-bg'
                scroll={{ x: 1000, y: 'calc(100vh - 300px)' }}
                size='middle'
              >
                <Column
                  title={t('common.field.user')}
                  render={(value) => <a onClick={() => openEdit(value)}>{value.firstName + ' ' + value.lastName}</a>}
                />
                <Column title={t('common.field.username')} dataIndex='username' key='username' sorter={true} />
                <Column title={t('common.field.phoneNumber')} dataIndex='phoneNumber' key='phoneNumber' />
                <Column title={t('common.field.email')} dataIndex='email' key='email' />
                <Column
                  title={t('common.field.status')}
                  dataIndex='enable'
                  key='enable'
                  filters={[
                    { text: t('common.label.enable'), value: true },
                    { text: t('common.label.disable'), value: false }
                  ]}
                  filterMultiple={false}
                  render={(enable) =>
                    enable ? <Tag color='#87d068'>{t('common.label.enable')}</Tag> :
                      <Tag color='#f50'>{t('common.label.disable')}</Tag>
                  }
                />
                <Column title={t('common.field.registration_date')} key='createdOn'
                        render={(value: UserDto) => moment(value.createdOn).format('L')} />
                <Column title={t('common.field.modification_date')} key='lastUpdatedOn'
                        render={(value: UserDto) => moment(value.lastUpdatedOn ?? value.createdOn).format('L')} />
                {/*<Column title={t('common.label.action')} fixed={'right'} key='action' width={70}*/}
                {/*        render={() => <DeleteOutlined className={'text-[#f50]'}/>} />*/}
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
