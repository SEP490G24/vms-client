export interface CustomerDto {
  id: string
  visitorName: string,
  identificationNumber: string,
  email: string,
  phoneNumber: string,
  gender: string,
  description: string,
  provinceId: number,
  districtId: number,
  communeId: number,
  provinceName?: string,
  districtName?: string,
  communeName?: string,
  createdOn: string,
  createdBy: string,
  lastUpdatedOn: string,
  lastUpdatedBy: string,
}


