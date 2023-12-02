import React from 'react'
import { ConfirmResultsWrapper } from './styles.ts'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { Descriptions, Space } from 'antd'
import { SharedCheckbox } from '~/common'
import { useDispatch, useSelector } from 'react-redux'
import { roomsSelector } from '~/redux/slices/roomSlice.ts'
import { meetingSelector, patchMeetingForm } from '~/redux/slices/meetingSlice.ts'
import moment from 'moment/moment'
import { isNullish } from '~/utils'
import { useTranslation } from 'react-i18next'

interface ConfirmResultsWrapperArgs {
}

const ConfirmResults: React.FC<ConfirmResultsWrapperArgs> = () => {
  const { t } = useTranslation()

  const { rooms } = useSelector(roomsSelector)
  const { meetingSelected, meetingForm } = useSelector(meetingSelector)
  const dispatch = useDispatch()


  return (
    <ConfirmResultsWrapper>
      <Descriptions className={'mb-4'} bordered>
        <DescriptionsItem label={t('common.field.title')} span={3}>{meetingForm['name']}</DescriptionsItem>
        <DescriptionsItem label={t('common.field.duration')} span={3}>
          <Space size={4}>
            <span>{moment(meetingForm.startTime).format('MM Do YYYY, h:mm:ss a')}</span>
            <span>~</span>
            <span>{moment(meetingForm.endTime).format('MM Do YYYY, h:mm:ss a')}</span>
          </Space>
        </DescriptionsItem>
        <DescriptionsItem label={t('common.field.room')}
                          span={3}>{rooms.find(room => room.id === meetingForm['roomId'])?.name}</DescriptionsItem>
        <DescriptionsItem label={t('common.field.description')} span={3}>{meetingForm['description']}</DescriptionsItem>
        <DescriptionsItem label={t('common.field.guest')} span={3}>
          {(!!meetingForm.oldCustomers || !!meetingForm.newCustomers) && <>{(meetingForm.oldCustomers?.length ?? 0) + (meetingForm.newCustomers?.length ?? 0)} people</>}
        </DescriptionsItem>
      </Descriptions>
      {!(!isNullish(meetingSelected) && !meetingForm.draft) &&
        <SharedCheckbox title={t('meeting.popup.confirm')} defaultChecked={meetingForm.draft && !meetingForm.draft}
                        onChange={(e) => {
                          dispatch(patchMeetingForm({ draft: !e.target.checked }))
                        }} />
      }
    </ConfirmResultsWrapper>
  )
}

export default ConfirmResults
