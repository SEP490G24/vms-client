import { Form, message, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { ContentWrapper, MeetingInfoWrapper } from './styles.ts'
import { useTranslation } from 'react-i18next'
import { SharedButton } from '~/common'
import { Participants } from './Participants'
import { ScheduleMeeting } from './Schedule'
import { ConfirmResults } from './ConfirmResults'
import { SchedulerHelpers } from '@aldabil/react-scheduler/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMeetingById,
  meetingSelector,
  patchMeetingForm,
  resetMeetingForm,
  resetMeetingSelected
} from '~/redux/slices/meetingSlice.ts'
import { findAllRoom } from '~/redux/slices/roomSlice.ts'
import { findCustomerByOrganizationId } from '~/redux/slices/customerSlice.ts'
import { meetingTicketService } from '~/service'
import { formatDate } from '~/utils'

interface MeetingInfoArgs {
  classname?: string
  scheduler?: SchedulerHelpers
  id?: string
  onClose?: () => void
}

const MeetingInfo: React.FC<MeetingInfoArgs> = (props) => {

  const { t } = useTranslation()
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const { meetingSelected } = useSelector(meetingSelector)
  const { meetingForm } = useSelector(meetingSelector)

  const description = 'This is a description.'
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (props.id) {
      dispatch(fetchMeetingById(props.id) as any)
    } else {
      if (props.scheduler) {
        dispatch(fetchMeetingById(props.scheduler?.state.id.value) as any)
        dispatch(patchMeetingForm({
          startTime: new Date(props.scheduler?.state.start.value),
          endTime: new Date(props.scheduler?.state.end.value)
        }))
      } else {
        dispatch(resetMeetingForm())
      }
    }
  }, [props.id, props.scheduler?.state])

  useEffect(() => {
    form.setFieldsValue({
      name: meetingSelected.name,
      purpose: meetingSelected.purpose,
      roomId: meetingSelected.roomId,
      description: meetingSelected.description,
      oldCustomers: meetingSelected.customers?.map(customer => customer.id) ?? []
    })
  }, [meetingSelected])

  useEffect(() => {
    dispatch(findAllRoom({}) as any)
    dispatch(findCustomerByOrganizationId() as any)
  }, [])

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      startTime: formatDate(meetingForm.startTime),
      endTime: formatDate(meetingForm.endTime),
      draft: meetingForm.draft
    }
    meetingTicketService.insert(payload).then((response) => {
      if (props.scheduler) {
        const event = {
          event_id: Math.random(),
          title: response.data.name,
          start: response.data.startTime,
          end: response.data.endTime,
          description: response.data.description,
          id: response.data.id
        }
        props.scheduler.onConfirm(event, 'create')
      }
      onClose()
    }).catch((error) => {
      message.error(error.data.message)
    })
  }

  const steps = [
    {
      title: 'Schedule',
      content: <ScheduleMeeting meeting={meetingForm} form={form} onFinish={onFinish} />,
      description
    },
    {
      title: 'Participants',
      content: <Participants meeting={meetingForm} form={form} onFinish={onFinish} />,
      description
    },
    {
      title: 'Confirm',
      content: <ConfirmResults meeting={meetingForm} form={form} />,
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
    dispatch(resetMeetingForm())
    dispatch(resetMeetingSelected())
    form.resetFields()
  }

  return (
    <MeetingInfoWrapper
      className={props.classname}
      title={t(!!meetingSelected ? 'meeting.manager.popup.title-edit' : 'meeting.manager.popup.title-add')}
      onCancel={onClose}
      onOk={form.submit}
      labelOk={t('meeting.manager.popup.btn-save' + ((meetingForm.draft === undefined || meetingForm.draft == true) ? '-draft' : ''))}
    >
      <Steps current={currentStep} labelPlacement='vertical' items={steps} />
      {steps.map((step, index) => <ContentWrapper
        key={index}
        className={currentStep === index ? '' : 'hidden'}>{step.content}</ContentWrapper>)}
      <div style={{ marginTop: 24 }}>
        {currentStep > 0 && (
          <SharedButton style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </SharedButton>
        )}
        {currentStep < steps.length - 1 && (
          <SharedButton type='primary' onClick={() => next()}>
            Next
          </SharedButton>
        )}
      </div>
    </MeetingInfoWrapper>
  )
}

export default MeetingInfo
