export interface SettingDto {
  createdBy?: string;
  createdOn?: string;
  id?: number;
  code?: string;
  name?: string;
  groupId?: number;
}

export interface SettingGroupDto {
  createdBy?: string;
  createdOn?: string;
  id?: number;
  name?: string;
}

export interface SettingSiteDto {
  settingGroupId?: number;
  siteId?: string;
  settings?: { [code: string]: string };
}
