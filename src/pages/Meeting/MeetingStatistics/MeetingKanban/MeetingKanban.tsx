import React from 'react'
import { MeetingDto, PageableResponse } from '~/interface'
import { Spin } from 'antd'
import { MeetingBookMark } from '~/service'
import { MeetingItem } from '~/pages'

interface MeetingItemProps {
  loading: boolean
  pageableResponse?: PageableResponse<MeetingDto>
  onEdit: (value: MeetingDto) => void
  onCancelMeeting: (meeting: MeetingDto) => void
  onBookmark: (payload: MeetingBookMark) => void
  onUnBookmark: (payload: MeetingBookMark) => void
}

const MeetingKanban: React.FC<MeetingItemProps> = (props) => {

  // const { t } = useTranslation()

  return (
    <Spin spinning={props.loading}>
      <div className={'w-full grid sm:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-4'}>
        {props.pageableResponse?.content?.map(meeting => <MeetingItem meeting={meeting}
                                                                      onCancelMeeting={props.onCancelMeeting}
                                                                      onEdit={props.onEdit}
                                                                      onBookmark={props.onBookmark}
                                                                      onUnBookmark={props.onBookmark} />)}
      </div>
    </Spin>
  )
}

export default MeetingKanban
