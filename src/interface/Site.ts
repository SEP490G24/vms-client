export interface SiteDto {
  id: string;
  name: string;
  code: string;
  enable: boolean;
  organizationId?: string;
  organizationName: string;
  phoneNumber?: string;
  provinceId: number;
  communeId: number;
  districtId: number;
  provinceName?: string;
  districtName?: string;
  communeName?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
}


