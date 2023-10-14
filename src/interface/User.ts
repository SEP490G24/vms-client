export interface UserDto {
  departmentId: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: null;
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

export interface UserFilterPayload {
  pageNumber?: number;
  roles?: string[];
  usernames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  state?: string;
  keyword?: string
}

