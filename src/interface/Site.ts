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
  // pageNumber?: number;
  // roles?: string[];
  // usernames?: string[];
  // createdOnStart?: Date;
  // createdOnEnd?: Date;
  // state?: string;
  // searchOr?:string
}
