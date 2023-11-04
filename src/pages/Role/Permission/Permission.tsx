import { PermissionWrapper } from './styles.ts'

import { Card, Col, Divider, message, Row, Space, TablePaginationConfig } from 'antd'
import Modal from 'antd/es/modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { PermissionDto } from '~/interface'
import { BUTTON_ROLE_MAP } from '~/role'
import { checkPermission } from '~/utils'
import { PermissionInfo } from './Info'
import { PermissionFilter } from './Filter'
import { PermissionTable } from './Table'
import { PermissionFilterPayload, PermissionService } from '~/service'
import { FilterValue } from 'antd/es/table/interface'
import { useAppDispatch } from '~/redux'
import { useSelector } from 'react-redux'
import { filterPermissions, setPermissionSelected, PermissionsSelector } from '~/redux/slices/PermissionSlice.ts'

const Permission = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const { pageableResponse, PermissionSelected } = useSelector(PermissionsSelector)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filterPayload, setFilterPayload] = useState<PermissionFilterPayload>({})
  // const [exportEx, setExportEx] = useState<boolean>(false)


  useEffect(() => {
    dispatch(filterPermissions({
      filterPayload,
      isPageable: true,
      pageableRequest: { page: currentPage - 1, size: 10 }
    }) as any)
    // PermissionService.filter(filterPayload, true, { page: currentPage - 1, size: 10 }).then((response) => {
    //   setPageableResponse(response?.data)
    // })
  }, [filterPayload, currentPage])

  const onFilter = (filterPayload: PermissionFilterPayload) => {
    setCurrentPage(1)
    setFilterPayload(filterPayload)
  }

  const onSave = (payload: any) => {
    setConfirmLoading(true)
    let request = !!PermissionSelected ? PermissionService.update(PermissionSelected.id, payload) : PermissionService.insert(payload)
    request
      .then(async (res: any) => {
        if (res?.status === 200) {
          setOpenModal(false)
          setConfirmLoading(false)
          dispatch(setPermissionSelected({}))
          dispatch(filterPermissions({
            filterPayload,
            isPageable: true,
            pageableRequest: { page: currentPage - 1, size: 10 }
          }) as any)
          await message.success(t('common.message.success.save'))
        } else {
          await message.error(t('common.message.error.save'))
        }
      })
      .catch(async () => {
        await message.error(t('common.message.error'))
      })
  }

  const openEdit = (PermissionDto: PermissionDto) => {
    dispatch(setPermissionSelected(PermissionDto))
    setOpenModal(true)
  }

  const onClose = () => {
    dispatch(setPermissionSelected({}))
    setOpenModal(false)
  }

  const handleChangeTable = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => {
    setCurrentPage(pagination.current ?? 1)
    console.log(pagination, filters, sorter)
  }


  return (
    <PermissionWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('organization.Permission.title')}</h2>
          <Divider type='vertical' />
        </Space>
        {checkPermission(BUTTON_ROLE_MAP.R_USER_FIND) && (
          <Col className={'w-full m-0'} gutter={24} wrap={false}>
              <PermissionFilter onFilter={onFilter} />
              <Card className={'mt-10'} title={<Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <strong> {t('organization.Permission.table.title', { count: pageableResponse?.totalElements ?? 0 })}</strong>
                <Space>
                  <SharedButton
                    // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
                    type='default'
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
              </Space>}>
                <Divider style={{ margin: '16px 0 0' }} />
                <PermissionTable onChangeTable={handleChangeTable} pageableResponse={pageableResponse}
                           currentPage={currentPage}
                           onEdit={openEdit} />
              </Card>
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
                <PermissionInfo onClose={onClose} onSave={onSave} />
              </Modal>
            )}
          </Col>
        )}
      </Space>
    </PermissionWrapper>
  )
}

export default Permission
