import { Card, Col, Row, DatePicker, Form, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedInput, SharedRadio, SharedSelect } from '~/common'
import { DateRadioRange, getDataRangeOptions, getDateRangeValue } from '~/interface'
import { RoleFilterPayload } from '~/service'
import { useSelector } from 'react-redux'
import { fetchDistrict, fetchProvince, locationsSelector, resetDistrict } from '~/redux/slices/locationSlice'
import { useAppDispatch } from '~/redux'

interface FilterArgs {
  onFilter: (filterPayload: RoleFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const [valueDate, setValueDate] = useState<DateRadioRange | null>()
  const { RangePicker } = DatePicker
  const [disable, setDisable] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')
  const [provinceId, setProvinceId] = useState<string>('')
  const { provinces } = useSelector(locationsSelector)


  useEffect(() => {
    !provinces.length && dispatch(fetchProvince() as any)
  }, [])

  useEffect(() => {
    if ((valueDate?.date?.['0'] && valueDate?.date?.['1']) || keyword.trim() || provinceId) setDisable(false)
    else setDisable(true)
  }, [valueDate, keyword, provinceId])

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValueDate({ key: value, date: getDateRangeValue(value) })
  }


  const onFinish = (values: any) => {
    const payload: RoleFilterPayload = {
      createdOnStart: valueDate?.date?.['0']?.toDate(),
      createdOnEnd: valueDate?.date?.['1']?.toDate(),
    }
    if (values?.query?.trim()) {
      payload.keyword = values?.query?.trim()
    }
    console.log('teccc: ' + values.province)
    if (values?.province) {
      console.log('tec: ' + values?.province)
      payload.provinceId = values?.province
    }
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(null)
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('organization.role.search.title')}
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
        form={form}
        initialValues={{ layout: 'horizontal' }}
        colon={false}
        labelAlign={'right'}
        className='vms-form'
        onFinish={onFinish}
      >
        <Form.Item label={t('common.label.period')} className={'mb-1'} wrapperCol={{span: '24'}}>
          <RangePicker
            value={valueDate?.date}
            onChange={(val) => {
              setValueDate({ key: undefined, date: val })
            }}
            changeOnBlur
            className='vms-picker mr-30'
            placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
          />
          <SharedRadio
            options={getDataRangeOptions(t)}
            onChange={onChange}
            value={valueDate?.key}
            optionType='button'
          />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item label={t('organization.role.search.counselor')} name='query' className={'mb-3'}
                       wrapperCol={{ span: '12' }}>
              <SharedInput
                placeholder={t('organization.role.search.counselor_placeholder')}
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
                            onChange={(e: any) => setProvinceId(e)} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
export default Filter
