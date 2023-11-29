export interface DeviceDto {
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  id: string;
  name: string;
  code?: string;
  enable?: boolean;
  siteId?: string;
  siteName?: string;
  description?: string;
  macIp?: string
  deviceType?: string
}


