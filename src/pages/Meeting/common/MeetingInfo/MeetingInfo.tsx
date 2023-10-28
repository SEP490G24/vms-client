import { Form, message, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { MeetingDto } from '~/interface'
import { ContentWrapper, MeetingInfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { Participants } from './Participants'
import { ScheduleMeeting } from './Schedule'
import { ConfirmResults } from './ConfirmResults'
import { CreateMeetingInfo } from '~/service'
import { SchedulerHelpers } from '@aldabil/react-scheduler/types'

interface MeetingInfoArgs {
  classname?: string
  scheduler?: SchedulerHelpers
  meeting?: MeetingDto
  onSave?: (meeting: CreateMeetingInfo) => void
  onClose?: () => void
}

const MeetingInfo: React.FC<MeetingInfoArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const description = 'This is a description.'
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    console.log(props.scheduler)
  }, [])

  const onFinish = (values: any) => {
    console.log(values)
  }

  const steps = [
    {
      title: 'Schedule',
      content: <ScheduleMeeting form={form} onFinish={onFinish} />,
      description
    },
    {
      title: 'Participants',
      content: <Participants form={form} onFinish={onFinish} />,
      description
    },
    {
      title: 'Confirm',
      content: <ConfirmResults />,
      description
    }
  ]

  const next = () => {
    setCurrentStep(currentStep + 1)
  }

  const prev = () => {
    setCurrentStep(currentStep - 1)
  }


  const onClose = () => {
    props.onClose && props.onClose()
    props.scheduler && props.scheduler.close()
    form.resetFields()
  }


  return (
    <MeetingInfoWrapper
      className={props.classname}
      title={t(!!props.meeting ? 'organization.meeting.popup.title-edit' : 'organization.meeting.popup.title-add')}
      onCancel={onClose}
      onOk={form.submit}
    >
      <Steps current={currentStep} labelPlacement='vertical' items={steps} />
      <ContentWrapper>{steps[currentStep].content}</ContentWrapper>
      <div style={{ marginTop: 24 }}>
        {currentStep < steps.length - 1 && (
          <SharedButton type='primary' onClick={() => next()}>
            Next
          </SharedButton>
        )}
        {currentStep === steps.length - 1 && (
          <SharedButton type='primary' onClick={() => message.success('Processing complete!')}>
            Done
          </SharedButton>
        )}
        {currentStep > 0 && (
          <SharedButton style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </SharedButton>
        )}
      </div>
    </MeetingInfoWrapper>
  )
}

export default MeetingInfo
