export interface UserDto {
  departmentId: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  userName?: string;
  openid?: string;
  roles?: string[];
  firstName: string;
  lastName: string;
  avatar?: null;
  email?: string;
  phoneNumber?: string;
  enable?: boolean;
  gender?: null;
  dateOfBirth?: null;
  lastLoginTime?: null;
  departmentUserMaps?: any;
  provinceId: number;
  communeId: number;
  districtId: number;
  siteId?: string;
  provinceName?: string;
  districtName?: string;
  communeName?: string;
  address?: string;
  id?: string;
  countryCode?: string
}



