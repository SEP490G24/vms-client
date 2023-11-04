import { PermissionWrapper } from '../Permission/styles.ts'
import { Card, Col, Divider, Form, Radio, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { SharedButton, SharedInput, SharedRadio, SharedSelect } from '~/common'
import { InfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { CreateRoleInfo } from '~/service'
import TextArea from 'antd/es/input/TextArea'
import { PermissionTable } from '~/pages/Role/Permission/Table'
import {
  fetchCommune,
  fetchDistrict,
  fetchProvince,
  locationsSelector, resetCommune,
  resetDistrict,
} from '~/redux/slices/locationSlice.ts'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '~/redux'
import { rolesSelector } from '~/redux/slices/roleSlice.ts'
import moment from 'moment/moment'
import { getDataRangeOptions } from '~/interface'

interface CreateRoleFormArgs {
  onSave: (role: CreateRoleInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateRoleFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const { roleSelected } = useSelector(rolesSelector)
  const { communes, districts, provinces } = useSelector(locationsSelector)
  const provinceId = Form.useWatch('provinceId', form)
  const districtId = Form.useWatch('districtId', form)

  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    provinceId ? dispatch(fetchDistrict(provinceId) as any) : dispatch(resetDistrict())
  }, [provinceId])

  useEffect(() => {
    districtId ? dispatch(fetchCommune(districtId) as any) : dispatch(resetCommune())
  }, [districtId])

  useEffect(() => {
    !provinces.length && dispatch(fetchProvince() as any)
  }, [])

  useEffect(() => {
    if (roleSelected) {
      form.setFieldsValue({
        name: roleSelected.name,
        phoneNumber: roleSelected.phoneNumber,
        provinceId: roleSelected.provinceId,
        districtId: roleSelected.districtId,
        communeId: roleSelected.communeId,
        address: roleSelected.address,
        taxCode: roleSelected.taxCode,
        description: roleSelected.description,
        enable: roleSelected.enable,
      })
    }
    console.log(roleSelected)
  }, [roleSelected])

  const resetDistrictAndCommune = () => {
    form.resetFields(['districtId', 'communeId'])
  }

  const onClose = () => {
    props.onClose()
    form.resetFields()
  }

  return (
    <PermissionWrapper>
      <Card className={'mt-10'}
            title={t('common.field.role_info.title')}
            extra={
              <Space>
                <SharedButton>{t('common.label.reset')}</SharedButton>
                <SharedButton
                  // permissions={BUTTON_ROLE_MAP.R_USER_FIND}
                  onClick={form.submit}

                >
                  {t('common.label.search')}
                </SharedButton>
              </Space>
            }
            bordered={false}
            className='vms-card filter-card'
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          initialValues={{ layout: 'horizontal' }}
          colon={false}
          labelAlign={'right'}
          className='vms-form'
        >
          <Form.Item label={t('common.label.period')} className={'mb-1'} wrapperCol={{ span: '24' }}>
            <SharedInput
              placeholder={t('organization.site.search.counselor_placeholder')}
              value={keyword}
              onChange={(e: any) => setKeyword(e.target.value)}
            />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item label={t('organization.site.search.counselor')} name='query' className={'mb-3'}
                         wrapperCol={{ span: '12' }}>
                <SharedInput
                  placeholder={t('organization.site.search.counselor_placeholder')}
                  value={keyword}
                  onChange={(e: any) => setKeyword(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={'mb-0'} label={t('common.field.province')} name='province'
                         wrapperCol={{ span: '12' }}>
                <SharedSelect options={provinces.map((province) => {
                  return { label: province.name, value: province.id, key: province.id }
                })}
                              placeholder={t('common.placeholder.province')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card className={'mt-10'}>
        <strong> {t('organization.role.table.title')}</strong>
        <Space>
          <SharedButton
            // permissions={BUTTON_ROLE_MAP.R_USER_CREATE}
            type='default'
          >
            {t('common.label.create')}
          </SharedButton>
        </Space>

        <PermissionTable></PermissionTable>
      </Card>

    </PermissionWrapper>
  )
}

export default Info
