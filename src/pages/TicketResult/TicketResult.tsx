import { TicketResultWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useEffect } from 'react'
import { SharedButton } from '~/common'
import { useParams } from 'react-router-dom'
import { Badge, Descriptions, DescriptionsProps, Divider, Space } from 'antd'


const TicketResult = () => {

  // const dispatch = useDispatch()
  // const { meetingTicketQR } = useSelector(meetingSelector)

  const { ticketId, customerId } = useParams()

  useEffect(() => {
    // ticketId && customerId && dispatch(fetchMeetingByQR({ ticketId, customerId }) as any)
  }, [ticketId, customerId])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Product',
      children: 'Cloud Database'
    },
    {
      key: '2',
      label: 'Billing Mode',
      children: 'Prepaid'
    },
    {
      key: '3',
      label: 'Automatic Renewal',
      children: 'YES'
    },
    {
      key: '4',
      label: 'Order time',
      children: '2018-04-24 18:00:00'
    },
    {
      key: '5',
      label: 'Usage Time',
      children: '2019-04-24 18:00:00',
      span: 2
    },
    {
      key: '6',
      label: 'Status',
      children: <Badge status='processing' text='Running' />,
      span: 3
    },
    {
      key: '7',
      label: 'Negotiated Amount',
      children: '$80.00'
    },
    {
      key: '8',
      label: 'Discount',
      children: '$20.00'
    },
    {
      key: '9',
      label: 'Official Receipts',
      children: '$60.00'
    },
    {
      key: '10',
      label: 'Config Info',
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </>
      )
    }
  ]

  return (
    <TicketResultWrapper status='success'
                         title='Successfully Purchased Cloud Server ECS!'
                         subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
                         extra={<Space className={'w-full'} direction={'vertical'} size={32}>
                           <Divider orientation={'left'}>Ticket Info</Divider>
                           <Descriptions bordered items={items} />
                           {/*<Divider />*/}
                           <Space className={'w-full justify-center'} direction={'horizontal'} size={16}>
                             <SharedButton key='console'>Reject</SharedButton>
                             <SharedButton type='primary' key='buy'>Accept</SharedButton>
                           </Space>
                         </Space>} />
  )
}

export default TicketResult
