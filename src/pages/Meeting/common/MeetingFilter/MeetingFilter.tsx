import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput, SharedSelect } from '~/common'
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
  const [valueDateCreated, setValueDateCreated] = useState<DateRadioRange>()
  const [disable, setDisable] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')


  const onFinish = (values: any) => {
    const payload: MeetingFilterPayload = {
      siteId: values['siteId'],
      keyword: values['keyword'],
      startTimeStart: valueDateStart?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeStart: valueDateEnd?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      startTimeEnd: valueDateStart?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeEnd: valueDateEnd?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY),
      createdOnStart: valueDateCreated?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      createdOnEnd: valueDateCreated?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY),
      statuss: values['status'],
      purpose: values['purpose']
    }
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDateStart(undefined)
    setValueDateEnd(undefined)
    form.resetFields()
    args.onFilter({})
    setDisable(true)
  }

  const onFieldsChange = () => {
    setDisable(false)
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
        onFieldsChange={onFieldsChange}
      >
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && <SharedFilterScope />}
        <Form.Item
          label={t('meeting.manager.search.counselor')} name='keyword'>
          <SharedInput
            placeholder={t('common.placeholder.meeting')}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={t('common.field.status')} name='status'>
          <SharedSelect
            placeholder={t('common.placeholder.status')}
            options={[
              { value: 'DRAFT', label: 'DRAFT' },
              { value: 'PENDING', label: 'PENDING' },
              { value: 'CHECK_IN', label: 'CHECK_IN' },
              { value: 'CHECK_OUT', label: 'CHECK_OUT' },
              { value: 'DONE', label: 'DONE' },
              { value: 'CANCEL', label: 'CANCEL' },
              { value: 'REJECT', label: 'REJECT' },
              { value: 'COMPLETE', label: 'COMPLETE' },
            ]}/>
        </Form.Item>
        <Form.Item
          label={t('common.field.purpose')} name='purpose'>
          <SharedSelect
            placeholder={t('common.placeholder.purpose')}
            options={[
              { value: 'CONFERENCES', label: 'CONFERENCES' },
              { value: 'INTERVIEW', label: 'INTERVIEW' },
              { value: 'MEETING', label: 'MEETING' },
              { value: 'OTHERS', label: 'OTHERS' },
              { value: 'WORKING', label: 'WORKING' },
            ]}/>
        </Form.Item>
        <SharedFilterPeriod label={'common.field.created_on'} format={'DD-MM-YYYY HH:mm'} valueDate={valueDateCreated}
                            name={'createdDate'}
                            setValueDate={setValueDateCreated} hiddenRadio={true} showTime={true} />
        <SharedFilterPeriod label={'common.field.start_time'} format={'DD-MM-YYYY HH:mm'} valueDate={valueDateStart}
                            name={'startTime'}
                            setValueDate={setValueDateStart} hiddenRadio={true} showTime={true} />
        <SharedFilterPeriod label={'common.field.end_time'} format={'DD-MM-YYYY HH:mm'} valueDate={valueDateEnd}
                            name={'endTime'}
                            setValueDate={setValueDateEnd} hiddenRadio={true} showTime={true} />
      </Form>

    </Card>
  )
}
export default MeetingFilter
