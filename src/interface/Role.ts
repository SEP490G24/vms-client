export interface RoleDto {
  name: string;
  attributes: { [key: string]: string[] };
  permissionDtos: RoleDto[];
}

export interface ModuleDto {
  id: string;
  clientId: string;
  name: string;
  permissionDtos: RoleDto[];
}

export interface RoleDto {
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






