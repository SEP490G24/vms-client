import { CustomerDto } from '~/interface/Customer.ts'
import { StatusTicketCustomer, StatusTicketMeeting } from '~/constants'

export interface MeetingDto {
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  id: string;
  siteId: string;
  code: string;
  name: string;
  purpose: string;
  purposeNote?: string;
  startTime: string;
  endTime: string;
  description?: string;
  status: StatusTicketMeeting;
  username?: string;
  roomId: string;
  roomName?: string;
  templateId?: string;
  isBookmark?: boolean;
  draft: boolean;
  customers?: CustomerDto[]
  customerCount?: number
}

export interface MeetingQRDto {
  ticketId: string;
  checkInCode: string
  ticketCode: string;
  ticketName?: string;
  name?: string;
  purpose?: string;
  ticketStatus: StatusTicketMeeting;
  ticketCustomerStatus: StatusTicketCustomer;
  startTime?: string;
  endTime?: string;
  siteId: string;
  roomId?: string;
  roomName?: string;
  createdBy?: string;
  createBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  security?: boolean;
  customerInfo: CustomerDto;
}




