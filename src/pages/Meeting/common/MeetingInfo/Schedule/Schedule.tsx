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

  const purpose = Form.useWatch('purpose', props.form)

  const { t } = useTranslation()

  useEffect(() => {
    setValueDate([dayjs(props.form.getFieldValue('startTime')), dayjs(props.form.getFieldValue('endTime'))])
  }, [])

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
          <SharedInput placeholder={'Title Meeting'} />
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
            value={valueDate}
            format='YYYY/MM/DD HH:mm'
            onChange={setValueDate}
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
