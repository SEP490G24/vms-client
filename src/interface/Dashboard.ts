import { MeetingDto } from '~/interface/Meeting.ts'
import { Purpose } from '~/constants'

export interface TotalTicketResponse {
  totalTicket?: number;
  totalTicketWithCondition?: number;
  totalCompletedTicket?: number;
  totalCompletedTicketWithCondition?: number;
  totalCancelTicket?: number;
  totalCancelTicketWithCondition?: number;
}

export interface TotalVisitsResponse {
  totalVisits?: number;
  totalVisitsWithCondition?: number;
  totalAcceptanceVisits?: number;
  totalAcceptanceVisitsWithCondition?: number;
  totalRejectVisits?: number;
  totalRejectVisitsWithCondition?: number;
}

export interface TicketsPeriodResponse {
  upcomingMeetings?: MeetingDto[];
  ongoingMeetings?: MeetingDto[];
  recentlyFinishedMeetings?: MeetingDto[];
}

export interface PurposePieResponse {
  type: Purpose;
  value: number;
}

export interface MultiLineResponse {
  time: string;
  type: string;
  value: number;
}

