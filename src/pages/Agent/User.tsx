import { Col, Divider, message, Row, Space, Table } from 'antd'
import Modal from 'antd/es/modal/Modal'
import Column from 'antd/es/table/Column'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedPagination } from '~/common'
import { UserDto, UserFilterPayload, UserPayload } from '~/interface/User.ts'
import { PageableResponse } from '~/interface/PageableResponse.ts'
import { BUTTON_ROLE_MAP } from '~/role/index.ts'
import { PageWrapper } from '~/themes'
import { checkPermission } from '~/utils/common.ts'
import { PagainationStyled } from './styles'
import { UserInfo } from '~/pages/Agent/Info'
import { UserFilter } from '~/pages/Agent/Filter'
import { userService } from '~/service'

const User = () => {
  const { t } = useTranslation()
  const [pageableResponse, setPageableResponse] = useState<PageableResponse<UserDto> | null>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [user, setUser] = useState<UserDto>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<UserFilterPayload>({})

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

  const onSave = (payload: UserPayload) => {
    setConfirmLoading(true)
    let request
    if (!!user) {
      request = userService.update(payload)
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
                <SharedButton
                  // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                  type='primary'
                  onClick={() => setOpenModal(true)}
                >
                  {t('organization.user.table.btn-add')}
                </SharedButton>
              </Space>
              <Divider style={{ margin: '16px 0 0' }} />
              <Table
                dataSource={pageableResponse?.content}
                rowKey='username'
                pagination={false}
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
                  dataIndex='isEnable'
                  key='isEnable'
                  render={(enable) =>
                    enable ? t('common.label.use') : t('common.label.not_use')
                  }
                />
                <Column title={t('common.field.registration_date')} dataIndex='createdOn' key='createdOn' />
                <Column title={t('common.field.modification_date')} dataIndex='lastUpdatedOn' key='lastUpdatedOn' />
              </Table>
              <PagainationStyled>
                <SharedPagination
                  current={currentPage}
                  total={pageableResponse?.totalElements as number}
                  onChangePage={handlePageChange}
                  pageSize={pageableResponse?.pageable?.pageSize as number}
                  showSizeChanger={false}
                />
              </PagainationStyled>
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
