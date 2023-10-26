export interface RoomDto {
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  siteName: string;
  id: string;
  name: string;
  code?: string;
  organizationId?: string;
  enable?: boolean;
  taxCode?: string;
  description?: string;
}


