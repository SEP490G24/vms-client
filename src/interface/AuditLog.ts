export interface AuditLogDto {
  id: string;
  name: string;
  code: string;
  enable: string;
  organizationId?: string;
  organizationName: string;
  oldValue?: string;
  newValue?: string;
  createBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
}


