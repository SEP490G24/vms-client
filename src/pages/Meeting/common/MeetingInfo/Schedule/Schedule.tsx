import React from 'react'
import { ScheduleWrapper } from './styles.ts'
import { Form, FormInstance } from 'antd'
import { SharedInput, SharedSelect } from '~/common'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'
import { SharedDateRange } from '~/common/SharedDateRange'

interface ScheduleWrapperArgs {
  form: FormInstance
  onFinish: (values: any) => void
}

const Schedule: React.FC<ScheduleWrapperArgs> = (props) => {
  const { t } = useTranslation()

  const onChangeDateRange = (rangeValue: [string, string]) => {
    console.log(rangeValue)
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
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='title'
                   rules={[{ required: true }]}>
          <SharedInput placeholder={'Title Meeting'} />
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.name')} name='duration'>
          <SharedDateRange theme={'outline'} onChange={onChangeDateRange}></SharedDateRange>
        </Form.Item>
        <Form.Item style={{ marginBottom: '12px' }} label={t('common.field.code')} name='endTime'
                   rules={[{ required: true }]}>
          <SharedSelect
                        options={[{ label: 'Room 1', value: 'R01' }, { label: 'Room 2', value: 'R02' }]}></SharedSelect>
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
