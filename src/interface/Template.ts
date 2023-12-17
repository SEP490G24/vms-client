export interface TemplateDto {
  id: string;
  name: string;
  createdBy?: string;
  createdOn?: string;
  lastUpdatedBy?: string;
  lastUpdatedOn?: string;
  siteId?: string;
  code: string;
  subject?: string;
  body: string;
  type: string;
  description: string;
  enable: boolean;
  siteName?: string
}



