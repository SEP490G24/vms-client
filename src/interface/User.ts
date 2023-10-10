export interface UserDto {
  createdOn?: string;
  lastUpdatedOn?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  state?: string;
  avatar?: string;
  email?: string;
  phoneNumber?: string;
  lastLoginTime?: string;
  isEnable?: boolean;
  countryCode?:string;
}

export interface UserFilterPayload {
  pageNumber?: number;
  roles?: string[];
  usernames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  state?: string;
  searchOr?:string
}

