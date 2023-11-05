import React from 'react'
import { ConfirmResultsWrapper } from './styles.ts'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { Descriptions, Form, FormInstance, Space } from 'antd'
import { SharedCheckbox } from '~/common'
import { useDispatch, useSelector } from 'react-redux'
import { roomsSelector } from '~/redux/slices/roomSlice.ts'
import { meetingSelector, patchMeetingForm } from '~/redux/slices/meetingSlice.ts'
import moment from 'moment/moment'
import { CreateMeetingInfo } from '~/service'

interface ConfirmResultsWrapperArgs {
  meeting: CreateMeetingInfo
  form: FormInstance
}

const ConfirmResults: React.FC<ConfirmResultsWrapperArgs> = (props) => {
  // const { t } = useTranslation()

  const { rooms } = useSelector(roomsSelector)
  const { meetingSelected } = useSelector(meetingSelector)
  const dispatch = useDispatch()

  const oldCustomers = Form.useWatch('oldCustomers', props.form)
  const newCustomers = Form.useWatch('newCustomers', props.form)

  return (
    <ConfirmResultsWrapper>
      <Descriptions className={'mb-4'} bordered>
        <DescriptionsItem label={'Title'} span={3}>{props.form.getFieldValue('name')}</DescriptionsItem>
        <DescriptionsItem label={'Duration'} span={3}>
          <Space size={4}>
            <span>{moment(props.meeting.startTime).format('LTS')}</span>
            <span>~</span>
            <span>{moment(props.meeting.endTime).format('LTS')}</span>
          </Space>
        </DescriptionsItem>
        <DescriptionsItem label={'Room'}
                          span={3}>{rooms.find(room => room.id === props.form.getFieldValue('roomId'))?.name}</DescriptionsItem>
        <DescriptionsItem label={'Description'} span={3}>{props.form.getFieldValue('description')}</DescriptionsItem>
        <DescriptionsItem label={'Guest'} span={3}>
          {(!!oldCustomers || !!newCustomers) && <>{(oldCustomers?.length ?? 0) + (newCustomers?.length ?? 0)} people</>}
        </DescriptionsItem>
      </Descriptions>
      {!meetingSelected &&
        <SharedCheckbox title={'Xác nhận'} defaultChecked={props.meeting.draft && !props.meeting.draft}
                        onChange={(e) => {
                          dispatch(patchMeetingForm({ draft: !e.target.checked }))
                        }} />
      }
    </ConfirmResultsWrapper>
  )
}

export default ConfirmResults
