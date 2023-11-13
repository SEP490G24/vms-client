import { CustomerDto } from '~/interface/Customer.ts'

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
  ticketId?: string;
  ticketCode?: string;
  ticketName?: string;
  purpose?: string;
  startTime?: string;
  endTime?: string;
  createBy?: string;
  roomId?: string;
  siteId: string;
  roomName?: string;
  customerInfo: CustomerDto;
}




