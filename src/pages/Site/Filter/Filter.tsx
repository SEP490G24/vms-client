// @ts-ignore
import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange } from '~/interface'
import { SiteFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'
import { useLocation } from '~/hook'

interface FilterArgs {
  onFilter: (filterPayload: SiteFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDate, setValueDate] = useState<DateRadioRange>()

  let provinceId = Form.useWatch('provinceId', form)
  let districtId = Form.useWatch('districtId', form)

  let { communes, districts, provinces } = useLocation(provinceId, districtId)


  const onFinish = (values: any) => {
    const payload: SiteFilterPayload = {
      provinceId: values['provinceId'],
      districtId: values['districtId'],
      communeId: values['communeId'],
      keyword: values['keyword'],
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.END_DAY)
    }
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

  return (
    <Card
      title={t('organization.site.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            // permissions={PERMISSION_ROLE_MAP.R_USER_FIND}
            type={'primary'}
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
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        colon={false}
        labelAlign='left'
        className='vms-form'
        onFinish={onFinish}
      >
        <Form.Item className={'mb-3'} label={t('organization.site.search.counselor')} name='keyword'>
          <SharedInput
            placeholder={t('organization.site.search.counselor_placeholder')}
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
        {/*<SharedFilterPeriod label={'common.label.period'} format={'DD-MM-YYYY'} valueDate={valueDate} setValueDate={setValueDate} />*/}
      </Form>
    </Card>
  )
}
export default Filter
