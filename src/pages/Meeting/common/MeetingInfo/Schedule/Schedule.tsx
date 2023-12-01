import React, { useEffect, useState } from 'react'
import { ScheduleWrapper } from './styles.ts'
import { Form, FormInstance, TimeRangePickerProps } from 'antd'
import { SharedInput, SharedSelect } from '~/common'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'
import { Purpose } from '~/constants'
import { useSelector } from 'react-redux'
import { roomsSelector } from '~/redux/slices/roomSlice.ts'
import { RangePicker } from '~/common/SharedDatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { enumToArray } from '~/utils'
import { CreateMeetingInfo } from '~/service'

interface ScheduleWrapperArgs {
  meeting: CreateMeetingInfo
  form: FormInstance
  onFinish: (values: any) => void
}

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

const Schedule: React.FC<ScheduleWrapperArgs> = (props) => {

  const { rooms } = useSelector(roomsSelector)

  const [valueDate, setValueDate] = useState<RangeValue>(null)
  const [dates, setDates] = useState<RangeValue>(null)

  const purpose = Form.useWatch('purpose', props.form)

  const { t } = useTranslation()

  useEffect(() => {
    setValueDate([dayjs(props.meeting.startTime), dayjs(props.meeting.endTime)])
    props.form.setFieldsValue({
      duration: [dayjs(props.meeting.startTime), dayjs(props.meeting.endTime)]
    })
  }, [props.meeting])

  const onFinish = (values: any) => {
    props.onFinish({
      name: values['name'],
      purpose: values['purpose'],
      purposeNote: values['purposeNote'],
      startTime: valueDate?.[0]?.toDate(),
      endTime: valueDate?.[1]?.toDate(),
      roomId: values['roomId'],
      description: values['description']
    })
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'The next 30 minutes', value: [dayjs(), dayjs().add(30, 'minutes')] },
    { label: 'The next 1 hour', value: [dayjs(), dayjs().add(1, 'hour')] },
    { label: 'The next 2 hours', value: [dayjs(), dayjs().add(2, 'hours')] },
    { label: 'The next 4 hours', value: [dayjs(), dayjs().add(4, 'hours')] }
  ]

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false
    }
    const tooLate = current < dayjs().startOf('day') && dates[0] && dates[0] > current
    const tooEarly = current < dayjs().startOf('day') && dates[1] && dates[1] < current
    return !!tooEarly || !!tooLate
  }

  return (
    <ScheduleWrapper>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={props.form}
        initialValues={{ layout: 'horizontal' }}
        style={{ width: '100%' }}
        colon={false}
        onFinish={onFinish}
        labelAlign='left'
      >
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={'Title Meeting'} maxLength={50} showCount />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.purpose')} name='purpose'
                   rules={[{ required: true }]}>
          <SharedSelect
            placeholder={t('common.placeholder.purpose')}
            options={enumToArray(Purpose).map(purpose => {
              return { label: purpose.key, value: purpose.key }
            })}
          ></SharedSelect>
        </Form.Item>
        {purpose == 'OTHERS' &&
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.purposeNote')} name='purposeNote'>
            <SharedInput placeholder={t('common.placeholder.purposeNote')} />
          </Form.Item>
        }
        <Form.Item style={{ display: 'none' }} name='startTime'><SharedInput /></Form.Item>
        <Form.Item style={{ display: 'none' }} name='endTime'><SharedInput /></Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.duration')} name={'duration'}
                   rules={[
                     () => ({
                       validator(_) {
                         if (valueDate?.[0] && valueDate?.[1] && valueDate[1].diff(valueDate[0], 'minutes', true) > 15) {
                           return Promise.resolve()
                         }
                         return Promise.reject(new Error('The meeting duration must > 15 minutes'))
                       }
                     })]}
        >
          <RangePicker
            className={'w-full'}
            presets={[
              {
                label: <span aria-label='Current Time to End of Day'>Now ~ EOD</span>,
                value: () => [dayjs(), dayjs().endOf('day')]
              },
              ...rangePresets
            ]}
            disabledDate={disabledDate}
            showTime
            format='YYYY/MM/DD HH:mm'
            onCalendarChange={setDates}
            onChange={setValueDate}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.room')} name='roomId'>
          <SharedSelect
            placeholder={t('common.placeholder.room')}
            options={rooms.map(room => {
              return { label: room.name, value: room.id }
            })}
          ></SharedSelect>
        </Form.Item>
        <Form.Item className={'mb-3'} label={t('common.field.description')} name='description'>
          <TextArea
            showCount
            maxLength={200}
            className={'h-[200px] resize-none'}
            placeholder={t('common.placeholder.description')}
          />
        </Form.Item>
      </Form>
    </ScheduleWrapper>
  )
}

export default Schedule
