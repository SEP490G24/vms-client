import { MeetingCountDownWrapper } from './styles.ts'
import { Card, CountdownProps, Space } from 'antd'
import Countdown from 'antd/es/statistic/Countdown'


function MeetingCountDown() {

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Dayjs is also OK

  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!')
  }
  return (
    <MeetingCountDownWrapper className={'w-full'} classNames={{ item: 'flex-1' }}>
      <Card title={'Upcoming Meetings'} bordered={false}>
        <Space size={8} direction={'horizontal'} wrap={true}>
          <Card className={'bg-body'}>
            <Countdown title='Họp đồ án' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
        </Space>
      </Card>
      <Card title={'Current Taking Meetings'} bordered={false}>
        <Space size={8} direction={'horizontal'} wrap={true}>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={deadline} onFinish={onFinish} />
          </Card>
        </Space>
      </Card>
      <Card title={'Ended Meetings'} bordered={false}>
        <Space size={8} direction={'horizontal'} wrap={true}>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
          <Card className={'bg-body'}>
            <Countdown title='Countdown' value={0} onFinish={onFinish} />
          </Card>
        </Space>
      </Card>
    </MeetingCountDownWrapper>
  )
}

export default MeetingCountDown
