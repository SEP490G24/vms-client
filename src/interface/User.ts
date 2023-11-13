export interface UserDto {
  siteId: string;
  departmentId: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  userName?: string;
  openid?: string;
  roles?: string[];
  role?: string;
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
  provinceName?: string;
  districtName?: string;
  communeName?: string;
  address?: string;
  id?: string;
  countryCode?: string;
  siteName?: string
  departmentName?: string
}



