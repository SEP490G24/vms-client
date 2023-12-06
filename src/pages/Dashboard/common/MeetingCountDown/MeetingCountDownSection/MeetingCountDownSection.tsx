import React, { useState } from 'react'
import { MeetingCountDownSectionWrapper } from './styles.ts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { List } from 'antd'
import { MeetingDto } from '~/interface'
import { MeetingCountDownItem } from './MeetingCountDownItem'

interface Props {
  title: string
  data: MeetingDto[]
  state: 'current' | 'future' | 'finish'
  onFinish?: (meeting: MeetingDto) => void
}

const MeetingCountDownSection: React.FC<Props> = (props) => {

  const [isOpenModal, setIsOpenModal] = useState(false)
  const onClose = () => {
    setIsOpenModal(false)
  }
  const onOpen = () => {
    setIsOpenModal(true)
  }
  const onFinish = (meeting: MeetingDto) => {
    if (props.onFinish) props.onFinish(meeting)
  }

  return (
    <MeetingCountDownSectionWrapper title={[props.title]}>
      <PerfectScrollbar className={'w-full h-[240px]'} options={{ suppressScrollX: true }}>
        <List
          grid={{ gutter: 12 }}
          dataSource={props.data}
          renderItem={(meeting: any) => (
            <List.Item>
              <MeetingCountDownItem onOpen={onOpen} onClose={onClose} isOpenModal={isOpenModal} meeting={meeting} state={props.state} onFinish={onFinish} meetingDetail={meeting} />
            </List.Item>
          )}
        />
      </PerfectScrollbar>


    </MeetingCountDownSectionWrapper>
  )
}

export default MeetingCountDownSection
