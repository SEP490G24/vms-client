export interface SettingDto {
  createdBy?: string;
  createdOn?: string;
  id: number;
  code: string;
  name: string;
  groupId: number;
  defaultValue: string;
  valueList?: string;
  description?: string
  type: SettingType;
}

export interface SettingGroupDto {
  createdBy?: string;
  createdOn?: string;
  id: number;
  name?: string;
}

export interface SettingSiteDto {
  settingGroupId?: number;
  siteId?: string;
  settings?: { [code: string]: string };
}

export enum SettingType {
  INPUT = 'INPUT',
  SWITCH = 'SWITCH',
  SELECT = 'SELECT',
  API = 'API'
}
