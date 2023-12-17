import { Card, Form, Space } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange } from '~/interface'
import { MeetingFilterPayload } from '~/service'
import { DATE_TIME, DATE_TIME_HOUR, Purpose, StatusTicketMeeting } from '~/constants'
import { checkPermission, enumToArray } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

interface FilterArgs {
  calendar?: boolean
  onFilter: (filterPayload: MeetingFilterPayload) => void
  onFilterBookmark?: () => void
}

const MeetingFilter: React.FC<FilterArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [valueDateStart, setValueDateStart] = useState<DateRadioRange>()
  const [valueDateEnd, setValueDateEnd] = useState<DateRadioRange>()
  const [valueDateCreated, setValueDateCreated] = useState<DateRadioRange>()
  const [isFilterBookmark, setIsFilterBookmark] = useState<boolean>()


  const onFinish = (values: any) => {
    const payload: MeetingFilterPayload = {
      siteId: values['siteId'] ? [values['siteId']] : [],
      keyword: values['keyword'],
      startTimeStart: valueDateStart?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeStart: valueDateEnd?.date?.['0']?.format(DATE_TIME_HOUR.START_DAY),
      startTimeEnd: valueDateStart?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY),
      endTimeEnd: valueDateEnd?.date?.['1']?.format(DATE_TIME_HOUR.START_DAY),
      createdOnStart: valueDateCreated?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDateCreated?.date?.['1']?.format(DATE_TIME.END_DAY),
      status: values['status'],
      purpose: values['purpose'],
      createdBy: values['createdBy'],
      bookmark: isFilterBookmark
    }
    props.onFilter(payload)
  }

  const onFilterBookmark = () => {
    setIsFilterBookmark(true)
    form.submit()
  }
  const onReset = () => {
    setValueDateStart(undefined)
    setValueDateEnd(undefined)
    setIsFilterBookmark(undefined)
    form.resetFields()
    props.onFilter({})
  }

  return (
    <Card
      title={t('meeting.manager.search.title')}
      extra={
        <Space>
          {!props.calendar && <SharedButton onClick={onFilterBookmark}>{t('common.label.bookmark')}</SharedButton>}
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
        {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && <SharedFilterScope />}
        <Form.Item
          className={'mb-3'}
          label={t('meeting.manager.search.counselor')} name='keyword'>
          <SharedInput
            placeholder={t('common.placeholder.meeting')}
          />
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.created_by')} name='createdBy'>
          <SharedInput
            placeholder={t('common.placeholder.createdBy')}
          />
        </Form.Item>
        {!!props.calendar &&
          <>
            <Form.Item
              className={'mb-3'}
              label={t('common.field.purpose')} name='purpose'>
              <SharedSelect
                placeholder={t('common.placeholder.purpose')}
                options={enumToArray(Purpose).map((status) => {
                  return { label: status.key, value: status.key }
                })} />
            </Form.Item>
            <Form.Item
              className={'mb-3'}
              label={t('common.field.status')} name='status'>
              <SharedSelect
                placeholder={t('common.placeholder.status')}
                options={enumToArray(StatusTicketMeeting).filter((status) => status.key != 'CANCEL').map((status) => {
                  return { label: status.key, value: status.value }
                })} />
            </Form.Item>
          </>
        }
        {!props.calendar &&
          <SharedFilterPeriod label={'common.field.created_on'} format={'DD-MM-YYYY'} valueDate={valueDateCreated}
                              name={'createdDate'}
                              setValueDate={setValueDateCreated} hiddenRadio={true} />
        }
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
