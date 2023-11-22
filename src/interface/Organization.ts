export interface OrganizationEntity {
  createdBy?: Date;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: Date;
  id: string;
  code?: string;
  name?: string;
  about?: string;
  email?: string;
  website?: string;
  logo?: string;
  industries?: string;
  representativeName?: string;
  representativePhone?: string;
  businessRegistrationNumber?: string;
  businessLicenseFile?: string;
  contactInfo: string;
}

export interface OrganizationDto {
  createdBy?: Date;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: Date;
  id: string;
  code?: string;
  name?: string;
  about?: string;
  email?: string;
  website?: string;
  logo?: string;
  industries?: string;
  representativeName?: string;
  representative?: string;
  representativePhone?: string;
  businessRegistrationNumber?: string;
  businessLicenseFile?: string;
  contactInfo: string;
  enable?: boolean;
}
