import { Card, Form, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput } from '~/common'
import { DateRadioRange } from '~/interface'
import { MeetingFilterPayload } from '~/service'
import { DATE_TIME_HOUR } from '~/constants'
import { checkPermission } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

interface FilterArgs {
  onFilter: (filterPayload: MeetingFilterPayload) => void
}

const MeetingFilter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDateStart, setValueDateStart] = useState<DateRadioRange>()
  const [valueDateEnd, setValueDateEnd] = useState<DateRadioRange>()
  const [disable, setDisable] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    if ((valueDateStart?.date?.['0'] && valueDateStart?.date?.['1']) || (valueDateEnd?.date?.['0'] && valueDateEnd?.date?.['1']) ||  keyword.trim()) setDisable(false)
    else setDisable(true)
  }, [valueDateStart,valueDateEnd, keyword])

  const onFinish = (values: any) => {
    const payload: MeetingFilterPayload = {
      siteId: values['siteId'],
      keyword: values['keyword'],
      startTimeStart: valueDateStart?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeStart: valueDateStart?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY),
      startTimeEnd: valueDateEnd?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeEnd: valueDateEnd?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY)
    }
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDateStart(undefined)
    setValueDateEnd(undefined)
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('meeting.manager.search.title')}
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
      >
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && <SharedFilterScope />} <Form.Item
        label={t('meeting.manager.search.counselor')} name='keyword'>
        <SharedInput
          placeholder={t('meeting.manager.search.counselor_placeholder')}
          value={keyword}
          onChange={(e: any) => setKeyword(e.target.value)}
        />
      </Form.Item>
        <SharedFilterPeriod label={'common.field.start_time'} format={'DD-MM-YYYY HH:mm'} valueDate={valueDateStart} setValueDate={setValueDateStart} hiddenRadio={true} showTime={true}/>
        <SharedFilterPeriod label={'common.field.end_time'} format={'DD-MM-YYYY HH:mm'} valueDate={valueDateEnd} setValueDate={setValueDateEnd} hiddenRadio={true} showTime={true}/>
      </Form>

    </Card>
  )
}
export default MeetingFilter
