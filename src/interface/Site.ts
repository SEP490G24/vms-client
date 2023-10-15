export interface SiteDto {
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  id: string;
  name: string;
  code?: string;
  organizationId?: string;
  phoneNumber?: string;
  enable?: boolean;
  templateSiteMaps?: any;
  pricePackageSiteMaps?: any;
  district?: string;
  province?: string;
  ward?: string;
  address?: string;
  taxCode?: string;
  description?: string;
}

export interface SiteFilterPayload {
  pageNumber?: number;
  names?: string[];
  usernames?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?:string
  enable?:string
  keyword?:string
}
