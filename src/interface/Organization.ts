export interface OrganizationEntity {
  createdBy?: string;
  createdOn?: Date;
  id: string;
  name: string;
  code: string;
  website?: string;
  representative?: string;
  logo?: string;
  contactInfo?: string;
  contactPhoneNumber?: string;
  enable: boolean;
}

export interface OrganizationDto {
  createdBy?: string;
  createdOn?: Date;
  id: string;
  name: string;
  code: string;
  website?: string;
  representative?: string;
  logo?: string;
  contactInfo?: string;
  contactPhoneNumber?: string;
  enable: boolean;
}
