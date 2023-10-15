export interface DepartmentDto {
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  id: string;
  name: string;
  code?: string;
  enable?: boolean;
  siteId?: string;
}

export interface DepartmentFilterPayload {
  // pageNumber?: number;
  // roles?: string[];
  // usernames?: string[];
  // createdOnStart?: Date;
  // createdOnEnd?: Date;
  // state?: string;
  // searchOr?:string
}
