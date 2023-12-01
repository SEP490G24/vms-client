export const CHECK_IN_EVENT = 'CHECK_IN_EVENT'
export const BASE_STORAGE = 'https://vmspersonalstorage.blob.core.windows.net/vms-storage/'

export const SIDE_BAR_COLLAPSE = {
  MEETING: 'MEETING',
  CUSTOMER: 'CUSTOMER',
  ORGANIZATION: 'ORGANIZATION',
  CONFIGURATION: 'CONFIGURATION',
}

export const Status = {
  ENABLE: true,
  DISABLE: false,
}

export const durationOption = {
  'TODAY': 'common.durationOption.today',
  '1WEEK': 'common.durationOption.1week',
  '1MONTH': 'common.durationOption.1month',
  '3MONTHS': 'common.durationOption.3months',
}

export const SortDirection = {
  'ascend': 'asc',
  'descend': 'desc',
}

export enum Purpose {
  CONFERENCES, INTERVIEW, MEETING, WORKING, OTHERS
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum MONTHS {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export enum TemplateVariable {
  customerName,
  meetingName,
  dateTime,
  startTime,
  endTime,
  address,
  roomName,
  staffName,
  staffPhone,
  staffEmail,
  checkInCode
}

export enum TemplateType {
  CANCEL_MEETING_EMAIL = 'CANCEL_MEETING_EMAIL',
  CONFIRM_MEETING_EMAIL = 'CONFIRM_MEETING_EMAIL',
  UPCOMING_MEETING_EMAIL = 'UPCOMING_MEETING_EMAIL'
}

export enum StatusTicketMeeting {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CANCEL = 'CANCEL',
  COMPLETE = 'COMPLETE',
}

export enum StatusTicketCustomer {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  REJECT = 'REJECT',
  PENDING = 'PENDING'
}

export enum Reason {
  CANCEL = 'CANCEL',
  REJECT = 'REJECT'
}
