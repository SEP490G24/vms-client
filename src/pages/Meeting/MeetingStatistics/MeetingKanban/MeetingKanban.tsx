import React from 'react'
import { MeetingDto, PageableResponse } from '~/interface'
import { List } from 'antd'
import { MeetingItem } from '~/pages/Meeting/common'

interface MeetingItemProps {
  pageableResponse?: PageableResponse<MeetingDto>
  onEdit: (value: MeetingDto) => void
}

const MeetingKanban: React.FC<MeetingItemProps> = (props) => {

  // const { t } = useTranslation()

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={props.pageableResponse?.content}
      renderItem={() => (
        <List.Item>
          <MeetingItem />
        </List.Item>
      )}
    />
  )
}

export default MeetingKanban
