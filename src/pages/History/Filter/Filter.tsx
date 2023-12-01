// @ts-ignore
import { Card, Form, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RangePicker, SharedButton, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange, SiteDto } from '~/interface'
import { HistoryFilterPayload, SiteFilterPayload, siteService } from '~/service'
import { DATE_TIME } from '~/constants'
import { AuthSection } from '~/auth'
import { SCOPE_ROLE_MAP } from '~/role'

interface FilterArgs {
  onFilter: (filterPayload: SiteFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDateCheckIn, setValueDateCheckIn] = useState<DateRadioRange>()
  const [valueDateCheckOut, setValueDateCheckOut] = useState<DateRadioRange>()
  const [sites, setSites] = useState<SiteDto[]>([])
  const [disable, setDisable] = useState<boolean>(true)

  useEffect(() => {
    siteService.findAllByOrganization().then((response) => {
      setSites(response?.data)
    })
  }, [])
  const onFinish = (values: any) => {
    const payload: HistoryFilterPayload = {
      site: values['siteId'],
      keyword: values['keyword'],
      formCheckInTime: valueDateCheckIn?.date?.['0']?.format(DATE_TIME.START_DAY),
      toCheckInTime: valueDateCheckIn?.date?.['1']?.format(DATE_TIME.START_DAY),
      formCheckOutTime: valueDateCheckOut?.date?.['0']?.format(DATE_TIME.START_DAY),
      toCheckOutTime: valueDateCheckOut?.date?.['1']?.format(DATE_TIME.START_DAY),
      status: [values['status']],
    }
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDateCheckIn(undefined)
    setValueDateCheckOut(undefined)
    setDisable(true)
    form.resetFields()
    args.onFilter({})
  }
  const onFieldsChange = (value: any) => {
    console.log(value)
    if (value) {
      setDisable(false)
    } else {
      setDisable(true)
    }
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
        onFieldsChange={onFieldsChange}
      >
        <Form.Item className={'mb-3'} label={t('common.field.name')} name='keyword'>
          <SharedInput
            placeholder={t('organization.site.search.counselor_placeholder')}
          />
        </Form.Item>
        <AuthSection permissions={SCOPE_ROLE_MAP.SCOPE_ORGANIZATION}>
          <Form.Item className={'mb-3'} label={t('common.field.site.name')} name='siteId'>
            <SharedSelect options={sites.map((site) => {
              return { label: site.name, value: site.id, key: site.id }
            })}
                          placeholder={t('common.placeholder.province')} />
          </Form.Item>
        </AuthSection>

        <Form.Item className={'mb-3'} label={t('common.field.status')} name='status'>
          <SharedSelect
            options={[{ label: 'CHECK_IN', value: 'CHECK_IN' },
              { label: 'CHECK_OUT', value: 'CHECK_OUT' }]}
            placeholder={t('common.placeholder.province')} />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.check_in')} name='checkIn'>
          <RangePicker
            format={'DD-MM-YYYY'}
            changeOnBlur
            className='vms-picker'
            style={{ width: '100%' }}
            value={valueDateCheckIn?.date}
            onChange={(val) => {
              setValueDateCheckIn({ key: undefined, date: val })
            }}
            placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
          />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.check_out')} name='checkOut'>
          <RangePicker
            format={'YYYY-MM-DD'}
            changeOnBlur
            className='vms-picker'
            style={{ width: '100%' }}
            value={valueDateCheckOut?.date}
            onChange={(val) => {
              setValueDateCheckOut({ key: undefined, date: val })
            }}
            placeholder={[t('common.date_range.start_placeholder'), t('common.date_range.end_placeholder')]}
          />
        </Form.Item>

      </Form>
    </Card>
  )
}
export default Filter
