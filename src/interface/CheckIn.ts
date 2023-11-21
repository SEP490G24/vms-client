export interface CheckInDto {
  purpose: string;
  ticketStatus: string;
  startTime?: string;
  customerInfo:{
    visitorName: string;
  }
  checkInCode?: string
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
  communeName?: string;
  address?: string;
  id?: string;
  countryCode?: string;
  siteName?: string

}



