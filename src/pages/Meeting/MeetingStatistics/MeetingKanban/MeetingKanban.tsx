import React from 'react'
import { MeetingDto, PageableResponse } from '~/interface'
import { List } from 'antd'
import { MeetingItem } from '~/pages/Meeting/common'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<MeetingDto>
  onEdit: (value: MeetingDto) => void
  onCancelMeeting: (meeting: MeetingDto) => void
}

const MeetingKanban: React.FC<MeetingItemProps> = (props) => {

  // const { t } = useTranslation()

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={props.pageableResponse?.content}
      renderItem={(item) => (
        <List.Item>
          <MeetingItem meeting={item} onCancelMeeting={props.onCancelMeeting} onEdit={props.onEdit} />
        </List.Item>
      )}
    />
  )
}

export default MeetingKanban
