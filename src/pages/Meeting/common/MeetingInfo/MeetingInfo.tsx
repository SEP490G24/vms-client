import { Form, message, Spin, Steps } from 'antd'
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
import { formatDate, isNullish } from '~/utils'
import { CreateMeetingInfo, meetingTicketService, UpdateMeetingInfo } from '~/service'
import { useForceUpdate } from '~/hook'
import { StatusTicketMeeting, TICKET_STATUS_COLOR_MAP } from '~/constants'

interface MeetingInfoArgs {
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
  classname?: string
  scheduler?: SchedulerHelpers
  id?: string
  onClose?: () => void
  onSave?: () => void
}

const MeetingInfo: React.FC<MeetingInfoArgs> = (props) => {

  const { t } = useTranslation()
  const [scheduleForm] = Form.useForm()
  const [participantsForm] = Form.useForm()

  const dispatch = useDispatch()
  const { meetingSelected, meetingForm, loading } = useSelector(meetingSelector)
  const [isUpdate, setIsUpdate] = useState(false)

  const [currentStep, setCurrentStep] = useState(0)
  const forceUpdated = useForceUpdate()

  useEffect(() => {
    if (props.id) {
      dispatch(fetchMeetingById(props.id) as any)
    } else {
      if (props.scheduler) {
        if (props.scheduler.state.id.value) {
          dispatch(fetchMeetingById(props.scheduler.state.id.value) as any)
        } else {
          scheduleForm.setFieldsValue({
            roomId: props.scheduler.roomId
          })
          dispatch(patchMeetingForm({
            startTime: new Date(props.scheduler.state.start.value),
            endTime: new Date(props.scheduler.state.end.value)
          }))
        }
      } else {
        dispatch(resetMeetingForm())
      }
    }
  }, [props.id, props.scheduler])

  useEffect(() => {
    if (!isNullish(meetingSelected)) {
      scheduleForm.setFieldsValue({
        name: meetingSelected.name,
        purpose: meetingSelected.purpose,
        purposeNote: meetingSelected.purposeNote,
        siteId: meetingSelected.siteId,
        roomId: meetingSelected.roomId,
        description: meetingSelected.description
      })
      participantsForm.setFieldsValue({
        oldCustomers: meetingSelected.customers?.map(customer => customer.id) ?? []
      })
      setIsUpdate(true)
      forceUpdated()
    } else {
      setIsUpdate(false)
    }
  }, [meetingSelected])

  const onFinishSchedule = (values: any) => {
    dispatch(patchMeetingForm(getDataSchedule(values)))
  }

  const getDataSchedule = (values: any) => {
    return {
      name: values['name'],
      purpose: values['purpose'],
      purposeNote: values['purposeNote'],
      startTime: formatDate(values['duration']?.[0].toDate()),
      endTime: formatDate(values['duration']?.[1].toDate()),
      siteId: values['siteId'],
      roomId: values['roomId'],
      description: values['description']
    }
  }

  const onFinishParticipants = (values: any) => {
    dispatch(patchMeetingForm(getDataParticipants(values)))
  }

  const getDataParticipants = (values: any) => {
    return {
      oldCustomers: values['oldCustomers'],
      newCustomers: values['newCustomers']
    }
  }

  const getOverrideData = (): any => {
    switch (currentStep) {
      case 0: {
        return getDataSchedule(steps[currentStep].form?.getFieldsValue())
      }
      case 1: {
        return getDataParticipants(steps[currentStep].form?.getFieldsValue())
      }
      default:
        return {}
    }
  }

  const onFinish = () => {
    let overrideData = getOverrideData()
    const payload = {
      ...meetingForm,
      ...overrideData,
      id: isUpdate ? meetingSelected.id : undefined
    } as CreateMeetingInfo | UpdateMeetingInfo
    const request = isUpdate ? meetingTicketService.update(payload) : meetingTicketService.insert(payload)
    request
      .then((response) => {
        if (props.scheduler) {
          const meeting = response.data
          const event = {
            event_id: props.scheduler.edited?.event_id ?? Math.random(),
            title: `[${meeting.status}] ${meeting.name}`,
            start: new Date(meeting.startTime),
            end: new Date(meeting.endTime),
            description: meeting.description,
            id: meeting.id,
            color: TICKET_STATUS_COLOR_MAP[meeting.status as StatusTicketMeeting]
          }
          props.scheduler.onConfirm(event, isUpdate ? 'edit' : 'create')
        }
        props.onSave && props.onSave()
        onClose()
        message.success(t('common.message.success.save')).then()
      }).catch((error) => {
      message.error(error.data.message).then()
    })
  }

  const steps = [
    {
      title: t('meeting.popup.tabs.schedule.title'),
      description: t('meeting.popup.tabs.schedule.description'),
      content: <ScheduleMeeting meeting={meetingForm} form={scheduleForm} onFinish={onFinishSchedule} />,
      form: scheduleForm,
      onFinish: async () => {
        scheduleForm.submit()
        let validate = false
        await scheduleForm.validateFields({ validateOnly: true }).then(
          () => {
            validate = true
            scheduleForm.submit()
          },
          () => {
            validate = false
          }
        )
        return validate
      }
    },
    {
      title: t('meeting.popup.tabs.participants.title'),
      description: t('meeting.popup.tabs.participants.description'),
      content: <Participants meeting={meetingForm} form={participantsForm} onFinish={onFinishParticipants} />,
      form: participantsForm,
      onFinish: async () => {
        participantsForm.submit()
        let validate = false
        await participantsForm.validateFields({ validateOnly: true }).then(
          () => {
            validate = true
            participantsForm.submit()
          },
          () => {
            validate = false
          }
        )
        return validate
      }
    },
    {
      title: t('meeting.popup.tabs.confirm.title'),
      description: t('meeting.popup.tabs.confirm.description'),
      content: <ConfirmResults />
    }
  ]

  const next = (callback?: () => Promise<boolean>) => {
    if (callback) {
      callback().then((validate) => {
        if (validate) {
          setCurrentStep(currentStep + 1)
        } else {
          setCurrentStep(currentStep)
        }
      })
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const prev = (callback?: () => Promise<boolean>) => {
    if (callback) {
      callback().then((validate) => {
        if (validate) {
          setCurrentStep(currentStep - 1)
        } else {
          setCurrentStep(currentStep)
        }
      })
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const onClose = () => {
    props.onClose && props.onClose()
    props.scheduler && props.scheduler.close()
    setCurrentStep(0)
    scheduleForm.resetFields()
    participantsForm.resetFields()
    dispatch(resetMeetingForm())
    dispatch(resetMeetingSelected())
  }

  return (
    <Spin spinning={loading}>
      <MeetingInfoWrapper
        open={props.open}
        confirmLoading={props.confirmLoading}
        width={props.width}
        footer={null}
        closable={false}
        className={props.classname}
        disableOk={isUpdate && currentStep !== steps.length - 1}
        title={t(!!meetingSelected ? 'meeting.popup.title-edit' : 'meeting.popup.title-add')}
        onCancel={onClose}
        onOk={onFinish}
        labelOk={t('meeting.popup.btn-save' + ((meetingForm.draft === undefined || meetingForm.draft == true) ? '-draft' : ''))}
      >
        {props.open &&
          <>
            <Steps current={currentStep} labelPlacement='vertical' items={steps} />
            {steps.map((step, index) => <ContentWrapper
              key={index}
              className={currentStep === index ? '' : 'hidden'}>{step.content}</ContentWrapper>)}
          </>
        }
        <div style={{ marginTop: 24 }}>
          {currentStep > 0 && (
            <SharedButton style={{ margin: '0 8px' }} onClick={() => prev(steps[currentStep].onFinish)}>
              Previous
            </SharedButton>
          )}
          {currentStep < steps.length - 1 && (
            <SharedButton type='primary' onClick={() => next(steps[currentStep].onFinish)}>
              Next
            </SharedButton>
          )}
        </div>
      </MeetingInfoWrapper>
    </Spin>
  )
}

export default MeetingInfo
