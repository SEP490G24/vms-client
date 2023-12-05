import React, { useState } from 'react'
import { MeetingCountDownSectionWrapper } from './styles.ts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { List, Modal } from 'antd'
import { MeetingDto } from '~/interface'
import { MeetingCountDownItem } from './MeetingCountDownItem'

interface Props {
  title: string
  data: MeetingDto[]
  state: 'current' | 'future' | 'finish'
  onFinish?: (meeting: MeetingDto) => void
}

const MeetingCountDownSection: React.FC<Props> = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const onOpenModal = () => {
    setOpenModal(true)
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
          renderItem={(meeting: MeetingDto) => (
            <List.Item>
              <MeetingCountDownItem onOpenModal={onOpenModal} meeting={meeting} state={props.state} onFinish={onFinish} />
            </List.Item>
          )}
        />
      </PerfectScrollbar>
      <Modal open={openModal}
             closable={false}
             title={null}
             footer={null}
             confirmLoading={true}
             width={1000}
             >
      </Modal>

    </MeetingCountDownSectionWrapper>
  )
}

export default MeetingCountDownSection
