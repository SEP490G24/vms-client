import { CustomerDto } from '~/interface/Customer.ts'

export interface MeetingDto {
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  id?: string;
  code?: string;
  name?: string;
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


