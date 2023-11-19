export interface CheckInDto {
  purpose: string;
  ticketStatus: string;
  startTime?: string;
  customerInfo:{
    visitorName: string;
  }
  endTime?: string;
  createBy?: string;
  roomName?: string;
  visitorName?: string;
  openid?: string;
  roles?: string[];
  role?: string;
  ticketName: string;
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



