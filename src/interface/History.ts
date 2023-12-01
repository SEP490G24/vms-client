export interface HistoryDto {
  id: string;
  checkInCode: string;
  name: string;
  code: string;
  enable: string;
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
  checkInTime?: string;
  checkOutTime?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
}


