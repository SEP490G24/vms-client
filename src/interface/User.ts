export interface UserDto {
  siteId: string;
  departmentId: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  username?: string;
  openid?: string;
  roles?: string[];
  role?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email?: string;
  phoneNumber?: string;
  enable?: boolean;
  gender?: boolean;
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



