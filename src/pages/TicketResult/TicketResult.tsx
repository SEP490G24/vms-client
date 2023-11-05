import { TicketResultWrapper } from './styles.ts'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useEffect } from 'react'
import { SharedButton } from '~/common'
import { useParams } from 'react-router-dom'
import { Descriptions, Divider, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeetingByQR, meetingSelector } from '~/redux/slices/meetingSlice.ts'
import DescriptionsItem from 'antd/es/descriptions/Item'
import moment from 'moment'


const TicketResult = () => {

  const dispatch = useDispatch()
  const { meetingTicketQR } = useSelector(meetingSelector)

  const { ticketId, customerId } = useParams()

  useEffect(() => {
    ticketId && customerId && dispatch(fetchMeetingByQR({ ticketId, customerId }) as any)
  }, [ticketId, customerId])

  useEffect(() => {
    console.log(meetingTicketQR)
  }, [meetingTicketQR])

  return (
    <TicketResultWrapper status='success'
                         title='Successfully Verify QR Server!'
                         subTitle={'Ticket number: ' + meetingTicketQR.ticketId + '. Cloud server configuration takes 1-5 minutes, please wait.'}
                         extra={<Space className={'w-full'} direction={'vertical'} size={32}>
                           <Divider orientation={'left'}>Ticket Info</Divider>
                           {meetingTicketQR && <Descriptions bordered>
                             <DescriptionsItem label={'Title'}>{meetingTicketQR.ticketName}</DescriptionsItem>
                             <DescriptionsItem label={'Purpose'}>{meetingTicketQR.purpose}</DescriptionsItem>
                             <DescriptionsItem label={'CreateBy'}>{meetingTicketQR.createBy}</DescriptionsItem>
                             <DescriptionsItem label={'Room'}>{meetingTicketQR.roomName}</DescriptionsItem>
                             <DescriptionsItem label={'Duration'} span={2}>
                               <Space size={4}>
                                 <span>{moment(meetingTicketQR.startTime).format('LTS')}</span>
                                 <span>~</span>
                                 <span>{moment(meetingTicketQR.endTime).format('LTS')}</span>
                               </Space>
                             </DescriptionsItem>
                             <DescriptionsItem label={'Customer'}
                                               span={3}>{meetingTicketQR.customerInfo.visitorName}</DescriptionsItem>
                             <DescriptionsItem
                               label={'Identification Number'}>{meetingTicketQR.customerInfo.identificationNumber}</DescriptionsItem>
                             <DescriptionsItem label={'Email'}>{meetingTicketQR.customerInfo.email}</DescriptionsItem>
                             <DescriptionsItem
                               label={'PhoneNumber'}>{meetingTicketQR.customerInfo.phoneNumber}</DescriptionsItem>
                           </Descriptions>}
                           <Space className={'w-full justify-center'} direction={'horizontal'} size={16}>
                             <SharedButton key='console'>Reject</SharedButton>
                             <SharedButton type='primary' key='buy'>Accept</SharedButton>
                           </Space>
                         </Space>} />
  )
}

export default TicketResult
