export interface RoleDto {
  code: string;
  attributes: { [key: string]: string[] };
  permissionDtos: PermissionDto[];
  description?: string;
}

export interface ModuleDto {
  id: string;
  clientId: string;
  name: string;
  permissionDtos: PermissionDto[];
}

export interface PermissionDto {
  id: string,
  name: string;
  moduleId: string;
  group: string;
  attributes: { [key: string]: string[] };
  label: { [key: string]: Label };
}

export interface Label {
    feature: string;
    module:  string;
    name:    string;
}






