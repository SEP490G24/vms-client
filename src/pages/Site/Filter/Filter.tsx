// @ts-ignore
import { Card, Form ,Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange} from '~/interface'
import { SiteFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'
import { useAppDispatch } from '~/redux'
import {
  fetchCommune,
  fetchDistrict,
  fetchProvince,
  locationsSelector, resetCommune,
  resetDistrict,
} from '~/redux/slices/locationSlice.ts'
import { useSelector } from 'react-redux'

interface FilterArgs {
  onFilter: (filterPayload: SiteFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const dispatch = useAppDispatch()
  const { communes, districts, provinces } = useSelector(locationsSelector)
  const provinceId = Form.useWatch('provinceId', form)
  const districtId = Form.useWatch('districtId', form)
  const communeId = Form.useWatch('communeId', form)
  const [disable, setDisable] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')
  //const [provinceId, setProvinceId] = useState<string>('')

  useEffect(() => {
    provinceId ? dispatch(fetchDistrict(provinceId) as any) : dispatch(resetDistrict())
  }, [provinceId])

  useEffect(() => {
    districtId ? dispatch(fetchCommune(districtId) as any) : dispatch(resetCommune())
  }, [districtId])
  useEffect(() => {
    if ((valueDate?.date?.['0'] && valueDate?.date?.['1']) || keyword.trim() || provinceId ) setDisable(false)
    else setDisable(true)
  }, [valueDate,keyword,provinceId])

  //Call API province
  useEffect(() => {
    !provinces.length && dispatch(fetchProvince() as any)
  }, [])

  const onFinish = (values: any) => {
    const payload: SiteFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.START_DAY)
    }
    if (values?.query?.trim()) payload.keyword = values?.query?.trim()
    if (provinceId) payload.provinceId = provinceId
    console.log("district: " + districtId)
    if (districtId) payload.districtId = districtId
    if (communeId) payload.communeId = communeId
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(undefined)
    form.resetFields()
    args.onFilter({})
  }

  const resetDistrictAndCommune = () =>{
    form.resetFields(["districtId","communeId"]);
  }
  const resetDistrictCombobox = () =>{
    form.resetFields(["communeId"]);
  }
  // @ts-ignore
  return (
    <Card
      title={t('organization.site.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={BUTTON_ROLE_MAP.R_USER_FIND}
            onClick={form.submit}
            disabled={disable}
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
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        colon={false}
        labelAlign='left'
        className='vms-form'
        onFinish={onFinish}
      >
        <Form.Item label={t('organization.site.search.counselor')} name='query'>
          <SharedInput
            placeholder={t('organization.site.search.counselor_placeholder')}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.province')} name='provinceId'>
          <SharedSelect options={provinces.map((province) => {
            return { label: province.name, value: province.id, key: province.id }
          })}
                        onChange = {resetDistrictAndCommune}
                        placeholder={t('common.placeholder.province')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.district')} name='districtId'>
          <SharedSelect
            options={districts?.map((district) => {
              return { label: district.name, value: district.id, key: district.id }
            }) ?? []}
            onChange = {resetDistrictCombobox}
            disabled={!provinceId}
            placeholder={t('common.placeholder.district')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.commune')} name='communeId'>
          <SharedSelect options={communes?.map((commune) => {
            return { label: commune.name, value: commune.id, key: commune.id }
          }) ?? []}
                        disabled={!districtId}
                        placeholder={t('common.placeholder.commune')} />
        </Form.Item>
        <SharedFilterPeriod valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
