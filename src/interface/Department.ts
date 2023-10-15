export interface DepartmentDto {
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  description?: string;
  id: string;
  name: string;
  code?: string;
  enable?: boolean;
  siteId?: string;
}

export interface DepartmentFilterPayload {
  pageNumber?: number;
  names?: string[];
  createdOnStart?: Date;
  createdOnEnd?: Date;
  createBy?: string;
  lastUpdatedBy?: string;
  enable?: string;
  keyword?:string
}
