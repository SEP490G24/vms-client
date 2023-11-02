import React from 'react'
import { ScheduleWrapper } from './styles.ts'
import { Form, FormInstance, TimeRangePickerProps } from 'antd'
import { SharedInput, SharedSelect } from '~/common'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'
import { Purpose } from '~/interface'
import { useDispatch, useSelector } from 'react-redux'
import { roomsSelector } from '~/redux/slices/roomSlice.ts'
import { RangePicker } from '~/common/SharedDatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { enumToArray } from '~/utils'
import { patchMeetingForm } from '~/redux/slices/meetingSlice.ts'
import { CreateMeetingInfo } from '~/service'

interface ScheduleWrapperArgs {
  meeting: CreateMeetingInfo
  form: FormInstance
  onFinish: (values: any) => void
}

export type RangeValue = [Dayjs | null, Dayjs | null] | null;

const Schedule: React.FC<ScheduleWrapperArgs> = (props) => {

  const { rooms } = useSelector(roomsSelector)

  const dispatch = useDispatch()

  const purpose = Form.useWatch('purpose', props.form)

  const { t } = useTranslation()

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'The next 7 Days', value: [dayjs(), dayjs().add(7, 'd')] },
    { label: 'The next 14 Days', value: [dayjs(), dayjs().add(14, 'd')] },
    { label: 'The next 30 Days', value: [dayjs(), dayjs().add(30, 'd')] },
    { label: 'The next 90 Days', value: [dayjs(), dayjs().add(90, 'd')] }
  ]

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates) {
      dispatch(patchMeetingForm({
        startTime: dates[0]?.toDate(),
        endTime: dates[1]?.toDate()
      }))
    } else {
      console.log('Clear')
    }
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
        onFinish={props.onFinish}
        labelAlign='left'
      >
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='name'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={'Title Meeting'} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.purpose')} name='purpose'
                   rules={[{ required: true }]}>
          <SharedSelect
            placeholder={t('common.placeholder.purpose')}
            options={enumToArray(Purpose).map(purpose => {
              return { label: purpose.key, value: purpose.value as string }
            })}
          ></SharedSelect>
        </Form.Item>
        {purpose == 'OTHERS' &&
          <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.purposeNote')} name='purposeNote'>
            <SharedInput placeholder={t('common.placeholder.purposeNote')} />
          </Form.Item>
        }
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.duration')}>
          <RangePicker
            className={'w-full'}
            presets={[
              {
                label: <span aria-label='Current Time to End of Day'>Now ~ EOD</span>,
                value: () => [dayjs(), dayjs().endOf('day')]
              },
              ...rangePresets
            ]}
            showTime
            value={[dayjs(props.meeting.startTime), dayjs(props.meeting.endTime)]}
            format='YYYY/MM/DD HH:mm'
            onChange={onRangeChange}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.room')} name='roomId'
                   rules={[{ required: true }]}>
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
