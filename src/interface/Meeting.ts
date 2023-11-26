import { CustomerDto } from '~/interface/Customer.ts'
import { StatusTicket } from '~/interface/common.ts'

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
  status?: string;
  username?: string;
  roomId: string;
  roomName?: string;
  templateId?: string;
  bookmark?: boolean;
  draft: boolean;
  customers: CustomerDto[]
}

export interface MeetingQRDto {
  ticketId: string;
  checkInCode: string
  ticketCode: string;
  ticketName?: string;
  purpose?: string;
  ticketStatus: StatusTicket;
  ticketCustomerStatus: StatusTicket;
  startTime?: string;
  endTime?: string;
  siteId: string;
  roomId?: string;
  roomName?: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  isSecurity?: boolean;
  customerInfo: CustomerDto;
}




