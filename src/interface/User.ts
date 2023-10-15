export interface UserDto {
  departmentId: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  username: string;
  openid?: string;
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
  id?: string;
  countryCode?: string
}



