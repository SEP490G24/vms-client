export interface ReasonDto {
  id: string;
  code: string;
  name: string;
  type: ReasonType;
  description?: string;
  enable: boolean;
  siteId: string;
  siteName?: string;
}

export enum ReasonType {
  URGENT_ISSUE = 'URGENT_ISSUE',
  SCHEDULE_CONFLICT = 'SCHEDULE_CONFLICT',
  KEY_PARTICIPANTS_UNAVAILABLE = 'KEY_PARTICIPANTS_UNAVAILABLE',
  NOT_PREPARED = 'NOT_PREPARED',
  BAD_WEATHER = 'BAD_WEATHER',
  OVERCROWDED = 'OVERCROWDED',
  TECHNICAL_ISSUES = 'TECHNICAL_ISSUES'
}
